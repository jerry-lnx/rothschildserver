import nodemailer from 'nodemailer'
import { normalizeLocale } from '~/composables/useSiteContent'

interface InquiryBody {
  name?: string
  company?: string
  email?: string
  phone?: string
  product?: string
  message?: string
  locale?: string
}

function formatBeijingTime(date = new Date()) {
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date)

  const valueByType = Object.fromEntries(
    parts
      .filter(part => part.type !== 'literal')
      .map(part => [part.type, part.value])
  ) as Record<string, string>

  return `${valueByType.year}-${valueByType.month}-${valueByType.day} ${valueByType.hour}:${valueByType.minute}:${valueByType.second}`
}

export default defineEventHandler(async (event) => {
  const body = await readBody<InquiryBody>(event)

  const payload = {
    name: body.name?.trim() ?? '',
    company: body.company?.trim() ?? '',
    email: body.email?.trim() ?? '',
    phone: body.phone?.trim() ?? '',
    product: body.product?.trim() ?? '',
    message: body.message?.trim() ?? '',
    locale: normalizeLocale(body.locale)
  }

  if (!payload.name || !payload.phone || !payload.product) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required inquiry fields'
    })
  }

  const runtimeConfig = useRuntimeConfig(event)
  const env = process.env

  const smtpHost = env.NUXT_INQUIRY_SMTP_HOST?.trim() || env.INQUIRY_SMTP_HOST?.trim() || runtimeConfig.inquirySmtpHost?.trim()
  const smtpPort = Number(env.NUXT_INQUIRY_SMTP_PORT || env.INQUIRY_SMTP_PORT || runtimeConfig.inquirySmtpPort || 0)
  const smtpSecure = `${env.NUXT_INQUIRY_SMTP_SECURE || env.INQUIRY_SMTP_SECURE || runtimeConfig.inquirySmtpSecure}` === 'true'
  const smtpUser = env.NUXT_INQUIRY_SMTP_USER?.trim() || env.INQUIRY_SMTP_USER?.trim() || runtimeConfig.inquirySmtpUser?.trim()
  const smtpPass = env.NUXT_INQUIRY_SMTP_PASS?.trim() || env.INQUIRY_SMTP_PASS?.trim() || runtimeConfig.inquirySmtpPass?.trim()
  const fromEmail = env.NUXT_INQUIRY_FROM_EMAIL?.trim() || env.INQUIRY_FROM_EMAIL?.trim() || runtimeConfig.inquiryFromEmail?.trim() || smtpUser
  const fromName = env.NUXT_INQUIRY_FROM_NAME?.trim() || env.INQUIRY_FROM_NAME?.trim() || runtimeConfig.inquiryFromName?.trim() || 'ROTHSCHILDSERVER'
  const webhookUrl = env.NUXT_INQUIRY_WEBHOOK_URL?.trim() || env.INQUIRY_WEBHOOK_URL?.trim() || runtimeConfig.inquiryWebhookUrl?.trim()
  const recipientEmail = env.NUXT_INQUIRY_RECIPIENT_EMAIL?.trim() || env.INQUIRY_RECIPIENT_EMAIL?.trim() || runtimeConfig.inquiryRecipientEmail?.trim()
  const recipientList = recipientEmail
    ? recipientEmail
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)
    : []
  const submittedAt = new Date().toISOString()
  const submittedAtBeijing = formatBeijingTime(new Date())

  const subject = `【官网咨询】产品类别及型号：${payload.product || '未填写'}`
  const messageLines = [
    `客户名：${payload.name}`,
    `客户公司：${payload.company || '未填写'}`,
    `客户手机号：${payload.phone}`,
    `客户邮箱：${payload.email || '未填写'}`,
    `产品类别及型号：${payload.product}`,
    `客户需求说明：${payload.message || '未填写'}`,
    '',
    `提交时间：${submittedAtBeijing}`
  ]

  if (smtpHost && smtpPort && smtpUser && smtpPass && fromEmail && recipientList.length) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure || smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })

    await transporter.sendMail({
      from: fromName ? `"${fromName}" <${fromEmail}>` : fromEmail,
      to: recipientList,
      replyTo: payload.email || undefined,
      subject,
      text: messageLines.join('\n')
    })

    return {
      ok: true,
      forwarded: true,
      channel: 'smtp'
    }
  }

  if (webhookUrl) {
    await $fetch(webhookUrl, {
      method: 'POST',
      body: {
        ...payload,
        source: 'rothschild-official-site',
        submittedAt
      }
    })

    return {
      ok: true,
      forwarded: true,
      channel: 'webhook'
    }
  }

  const mailtoSubject = encodeURIComponent(subject)
  const bodyText = encodeURIComponent(messageLines.join('\n'))

  console.info('[inquiry] Received submission without webhook target.', {
    ...payload,
    submittedAt
  })

  return {
    ok: true,
    forwarded: false,
    mailtoUrl: recipientList.length ? `mailto:${recipientList.join(',')}?subject=${mailtoSubject}&body=${bodyText}` : '',
    recipientEmail
  }
})
