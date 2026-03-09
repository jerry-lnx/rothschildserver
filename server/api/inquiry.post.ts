interface InquiryBody {
  name?: string
  contact?: string
  product?: string
  message?: string
  locale?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<InquiryBody>(event)

  const payload = {
    name: body.name?.trim() ?? '',
    contact: body.contact?.trim() ?? '',
    product: body.product?.trim() ?? '',
    message: body.message?.trim() ?? '',
    locale: normalizeLocale(body.locale)
  }

  if (!payload.name || !payload.contact || !payload.product || !payload.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required inquiry fields'
    })
  }

  const runtimeConfig = useRuntimeConfig(event)
  const webhookUrl = runtimeConfig.inquiryWebhookUrl?.trim()
  const recipientEmail = runtimeConfig.public.inquiryRecipientEmail?.trim()

  if (webhookUrl) {
    await $fetch(webhookUrl, {
      method: 'POST',
      body: {
        ...payload,
        source: 'luoschai-official-site',
        submittedAt: new Date().toISOString()
      }
    })

    return {
      ok: true,
      forwarded: true
    }
  }

  const subject = encodeURIComponent(`[${payload.locale.toUpperCase()}] Luoschai Inquiry - ${payload.product}`)
  const bodyText = encodeURIComponent(
    [
      `Name / Company: ${payload.name}`,
      `Contact: ${payload.contact}`,
      `Product / Model: ${payload.product}`,
      '',
      'Message:',
      payload.message
    ].join('\n')
  )

  console.info('[inquiry] Received submission without webhook target.', {
    ...payload,
    submittedAt: new Date().toISOString()
  })

  return {
    ok: true,
    forwarded: false,
    mailtoUrl: recipientEmail ? `mailto:${recipientEmail}?subject=${subject}&body=${bodyText}` : '',
    recipientEmail
  }
})
