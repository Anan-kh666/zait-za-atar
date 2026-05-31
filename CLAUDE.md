# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Zait & Za'atar** (زيت وزعتر) — a fully bilingual (English + Arabic) marketing landing page for a Levantine restaurant in Dubai. The brand voice is editorial, warm, and premium ("Dubai restaurant" aesthetic). The site is a single long-scroll landing page rendered in two locales with full right-to-left (RTL) support for Arabic.

## Tech stack

- **Next.js 16** (App Router, React Server Components)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `app/globals.css` — there is no `tailwind.config.js`)
- **next/font** (self-hosted Google fonts, zero layout shift)
- **next/image** (local images from `public/`)
- Deployed on **Vercel** (push to `main` = auto-deploy)
- Chat: **Voiceflow** web widget (`widget-next` bundle), loaded conditionally

## Commands

```bash
npm run dev      # local dev server (http://localhost:3000 → redirects to /en or /ar)
npm run build    # production build + type check + lint (run before every push)
npm run start    # serve the production build locally
npm run lint     # ESLint only
```

Always run `npm run build` before committing — the App Router type check only runs at build time and catches route-type errors that `tsc --watch` in the editor may not surface.

## Architecture

### Directory layout

There is **no `src/` directory**. Source files live at the repo root:

```
app/            ← Next.js App Router (globals.css, favicon, [lang]/ route)
components/     ← all UI components
i18n/           ← locale config + dictionary loader
dictionaries/   ← en.json and ar.json copy
middleware.ts   ← locale redirect
```

The `@/*` path alias (in `tsconfig.json`) resolves to the repo root (`"./*"`), so imports look like `@/components/hero`, `@/i18n/config`, etc.

### Routing & locales

Locale is the **first path segment**: `/en/...` and `/ar/...`. There are no un-prefixed routes.

- `middleware.ts` — redirects any locale-less path to a locale (`ar` if the browser's `Accept-Language` starts with `ar`, otherwise the default `en`). Its `matcher` excludes `_next`, `api`, and static files.
- `i18n/config.ts` — the single source of truth for locales: `defaultLocale`, `locales`, and the `Locale` type (`"en" | "ar"`).
- `app/[lang]/layout.tsx` — **this is the root layout** (there is intentionally no `app/layout.tsx`). It renders `<html lang dir>`, loads all fonts, and defines `generateStaticParams` so both locales are statically generated.
- `app/[lang]/page.tsx` — assembles the landing page from section components.

### Content / i18n

All user-facing copy lives in JSON dictionaries — **never hard-code visible strings in components.**

- `dictionaries/en.json` and `dictionaries/ar.json` — must always have an **identical shape**. The `Dictionary` type is derived from `en.json`, so EN is the schema; AR must match it key-for-key.
- `i18n/get-dictionary.ts` — `server-only` loader. `getDictionary(locale)` dynamically imports the right JSON (only the active locale ships to the client). Exports the `Dictionary` type used to type component props (e.g. `Dictionary["hero"]`).

Components receive `dict` (their slice of the dictionary) and, when they need to build locale-aware links or branch on language, `lang: Locale`.

### Components (`components/`)

| File | Role |
|------|------|
| `navbar.tsx` | Floating top nav, anchor links, reserve CTA |
| `hero.tsx` | Full-height hero with eyebrow / title / CTAs |
| `menu-highlights.tsx` | Two-column signature-dish grid with prices |
| `about.tsx` | Story text + dark-olive pull-quote panel |
| `gallery.tsx` | Asymmetric `next/image` photo grid |
| `location.tsx` | Address / hours / phone + Google Maps embed |
| `footer.tsx` | Dark footer with nav + tagline |
| `language-switcher.tsx` | **Client component** — swaps the locale segment of the current path |
| `chat-widget.tsx` | **Client component** — Voiceflow widget OR styled placeholder |

Most components are Server Components. Only `language-switcher.tsx` (uses `usePathname`) and `chat-widget.tsx` (uses `useEffect`/state) are `"use client"`.

### Images

Local files in `public/` referenced via `next/image`. Local public images need no `next.config` `remotePatterns`.

### Chat widget

`chat-widget.tsx` reads `process.env.NEXT_PUBLIC_VOICEFLOW_PROJECT_ID`:
- **Unset** → renders a styled brass placeholder launcher (bottom-`end` corner).
- **Set** → injects the Voiceflow `widget-next` bundle and calls `window.voiceflow.chat.load(...)`, passing the active `lang` as a launch-event payload variable.

Set the env var in **Vercel project settings** for production; use `.env.local` (gitignored) for local testing.

## Design system

Defined entirely in `app/globals.css` via Tailwind v4 `@theme`. Use the token utilities (`bg-olive`, `text-brass`, `text-hero`, etc.) — do not introduce raw hex values in components.

### Palette

| Token | Hex | Use |
|-------|-----|-----|
| `cream` | `#FAF6EF` | page background |
| `ink` | `#20231C` | primary text / dark surfaces |
| `olive` | `#4F5D3F` | primary brand green |
| `olive-deep` | `#3A4630` | darker olive (panels, hovers) |
| `brass` | `#C2974D` | gold accent (eyebrows, rules, primary CTA) |
| `terracotta` | `#A0492E` | warm secondary accent |
| `sand` | `#EFE7D8` | subtle section tint |
| `muted` | `#7C7567` | secondary text |
| `border` | `#E4DCCE` | hairline borders |
| `surface` | `#FFFFFF` | cards |

### Typography

Two font pairs, switched automatically by language:

- **Latin** — display: *Cormorant Garamond*; body: *Inter*
- **Arabic** — display: *Aref Ruqaa*; body: *IBM Plex Sans Arabic*

Mechanism: `next/font` exposes each as a CSS variable on `<html>`. `app/globals.css` resolves `--app-body` / `--app-display` per language (`html[lang="ar"]` overrides), and `@theme inline` maps them to `--font-sans` (default body) and `--font-display` (the `font-display` utility). Use `font-display` for headings; body inherits the sans automatically.

Fluid display sizes: `text-display` and `text-hero` (clamp-based, defined in `@theme`).

## Conventions & rules

These are not optional — they keep the bilingual/RTL behavior correct.

### 1. Logical CSS utilities only (never physical)

The whole layout flips for Arabic via `dir="rtl"` on `<html>`. Always use direction-relative utilities so things flip automatically:

| ❌ Never | ✅ Always |
|---------|----------|
| `text-left` / `text-right` | `text-start` / `text-end` |
| `pl-` / `pr-` | `ps-` / `pe-` |
| `ml-` / `mr-` | `ms-` / `me-` |
| `left-` / `right-` | `start-` / `end-` |
| `border-l` / `border-r` | `border-s` / `border-e` |
| `rounded-l` / `rounded-r` | `rounded-s` / `rounded-e` |

- `flex-row` already reverses visual order in RTL — do **not** add `flex-row-reverse`.
- CSS grid follows reading direction too (first grid item lands on the right in RTL).
- Directional icons (arrows, chevrons) do **not** auto-flip — flip them manually with `rtl:-scale-x-100` or swap the glyph.

### 2. No letter-spacing on Arabic

`app/globals.css` contains a guard: `html[lang="ar"] * { letter-spacing: 0 !important; }`. Latin-style `tracking-*` breaks Arabic's connected letterforms. The guard neutralizes it for Arabic while leaving English intact — keep it. Don't rely on `uppercase` to convey meaning in Arabic either (it's a no-op there).

### 3. Route entry-point param typing

Next.js generates route types where `params` is `{ lang: string }`. A narrower union (`{ lang: "en" | "ar" }`) fails the build's type check. So in `layout.tsx` / `page.tsx` (and any future route file):

```tsx
// in the signature: use string
params: Promise<{ lang: string }>;

// then narrow on the first line:
const { lang: rawLang } = await params;
const lang = rawLang as Locale;
```

Keep the strict `Locale` type **everywhere else** (component props, dictionary helpers). Only the route entry points use `string` + cast. Also remember `params` is a Promise — always `await` it.

### 4. Adding content

- New section copy → add the same key to **both** `en.json` and `ar.json` (matching shape), then type the component prop as `Dictionary["yourKey"]`.
- New section component → create in `components/`, import into `app/[lang]/page.tsx`, give it an `id` and `scroll-mt-24` if it's an anchor target, and add a nav/footer link.
- New locale → extend `i18n/config.ts` locales, add a matching `<locale>.json`, and update the `getDictionary` map and middleware detection.

## Don'ts

- Don't add `app/layout.tsx` — the `[lang]` layout is the root.
- Don't hard-code visible strings; use the dictionaries.
- Don't use physical direction utilities (see rule 1).
- Don't put raw hex colors or arbitrary font-families in components; use the tokens.
- Don't commit `.env.local`.

## Working style (author preference)

Work **one step at a time** and wait for confirmation before moving on. Prefer asking for a screenshot of the result over dumping terminal output. Default to the **simplest implementation** that satisfies the requirement, and push back honestly when something is wrong rather than agreeing by default.
