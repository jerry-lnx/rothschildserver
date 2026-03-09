# Luoschai Official Site

Nuxt 3 + Tailwind CSS + three-language official site starter for `罗斯柴智算`.

## Tech Baseline

- Nuxt 3
- Tailwind CSS
- Static-site generation first (`npm run generate`)
- Structured mock content for later CMS or backend integration
- Lightweight locale handling based on route prefixes and browser-language redirect

## Notes

- `/` detects browser language on first visit and redirects to `/zh`, `/en`, or `/ru`
- Current language is remembered in the `preferred_locale` cookie
- Page structure is shared while content is split by locale in `data/content.ts`
- Shared UI labels live in `data/ui.ts`
