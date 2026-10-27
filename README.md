# PasarMIKRO website

Astro 7 on Cloudflare Workers. Page content is Markdown in [`content/`](content/README.md), written by the team (with AI help) and checked by the build. Forms post to the team's Lark group, protected by Cloudflare Turnstile. Design direction: [DESIGN.md](DESIGN.md).

## Editing content

Read [content/README.md](content/README.md): it explains every content type, the writing rules, images, and a prompt to give your AI assistant. Run `npm run check` before committing; it fails with the file and field when something breaks the rules.

## Local development

Requires Node 24 (`.nvmrc`).

```bash
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

Open http://localhost:4321. With `LARK_WEBHOOK_URL` empty, form submissions are printed in the terminal instead of sent. Restart `npm run dev` after adding a new content type or changing `src/content.config.ts`.

- `npm run check`: type check, content schemas and content writing rules
- `npm test`: unit tests
- `npm run build`: production build; `npx wrangler dev` then serves it locally

## How it is built

- Almost every page is generated at build time from `content/` and `src/`. A content change goes live when it is merged and deployed.
- Server-rendered at request time: the two form endpoints (`/api/contact`, `/api/apply`), the contact page, open role pages (they show the form result) and the EUDR page (its early-joiner offer switches off by itself after 13 November 2026).
- No database and no file storage. Form submissions exist only as Lark messages: if Lark does not accept a message, the visitor sees an error and is asked to email instead.

## Languages

A page has one URL in every language. The reader's choice is kept in a `lang` cookie:

- The header switch swaps the page's text in place with a short fade (`src/scripts/lang-switch.ts`). The URL, scroll position, open menus and half-filled forms stay as they are.
- On every later page, the Worker (`src/worker.ts`, rules in `src/lib/lang-pref.ts`) answers the plain URL in that language.
- Each language is still built under its own prefix (`/id/faq/`). Search engines index those through hreflang and the sitemap, and a visitor who arrives on one sees the plain URL in the address bar.

The site's interface text (menus, buttons, form labels, page copy) lives in one JSON file per language in `src/i18n/`.

To add a language, for example Chinese (`zh`):

1. Copy `src/i18n/en.json` to `src/i18n/zh.json` and translate the values. Keep the keys. Set `langName` (the name in its own language, e.g. `中文`), `intl` (the date and number format, e.g. `zh-CN`) and `ogLocale` (for social previews, e.g. `zh_CN`).
2. Import it in `src/i18n/index.ts` and add it to `dicts`. Its pages are then served under `/zh/`, and it appears in the header switch and the sitemap.
3. Run `npm run check`. The type checker lists every place that still needs the new language: the short `en:`/`id:` fields in `content/`, the EUDR page (`src/components/eudr/`), and a few per-language texts in the pages.
4. Add Markdown content in a `zh/` folder for posts, FAQ, roles and life (see `content/README.md`).

The header switch shows one button per language. Past three or four languages it should become a dropdown.

## Cloudflare setup (once)

1. **Turnstile**: create a widget for `www.pasarmikro.id`, put its site key in `TURNSTILE_SITE_KEY` in `wrangler.jsonc`, then `npx wrangler secret put TURNSTILE_SECRET`.
2. **Lark**: in the Lark group, add a custom bot with an incoming webhook. `npx wrangler secret put LARK_WEBHOOK_URL` with its URL. If you turn on signature verification for the bot, also `npx wrangler secret put LARK_WEBHOOK_SECRET`.
3. **Deploy**: `npm run deploy`, then attach `www.pasarmikro.id` to the Worker.
