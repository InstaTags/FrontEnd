# InstaTags

InstaTags generates Instagram hashtags from an image. Upload a photo, the app sends it to an AI backend, and you get a set of relevant tags you can copy in one click. Dark theme, no account required.

This repository is the **web frontend** (SvelteKit). Two things it talks to live elsewhere:

- The **AI backend** that analyzes images and returns hashtags. The frontend calls it over HTTP; it is not included here.
- The **Chrome extension** referenced on the site (right-click an image while browsing). It is a separate project.

Without a running backend, the upload page loads but tag generation returns "Cannot connect to server API."

## Stack

- [SvelteKit 2](https://svelte.dev/docs/kit) on [Svelte 5](https://svelte.dev/docs/svelte) (runes: `$state`, `$props`, `$effect`, `$derived`)
- TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`, with design tokens defined in `@theme` ([src/routes/layout.css](src/routes/layout.css))
- [Vite 7](https://vite.dev)
- [Siema](https://github.com/pawelgrzybek/siema) for the testimonial and how-to-use carousels
- `@sveltejs/adapter-auto` for deployment

Fonts are self-hosted in [static/fonts/](static/fonts): Poppins (body) and Laurentian Std SemiBold Italic (display).

## Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 7)
- npm
- A reachable InstaTags backend API (for hashtag generation)

## Getting started

```sh
npm install
```

Create a `.env` file in the project root and point it at your backend:

```sh
PUBLIC_API_BASE_URL=https://your-backend.example.com
```

Start the dev server:

```sh
npm run dev

# or open it in a browser automatically
npm run dev -- --open
```

The app runs at `http://localhost:5173` by default.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `PUBLIC_API_BASE_URL` | Yes | Base URL of the backend API. The upload flow calls `${PUBLIC_API_BASE_URL}/api/v1/upload/send`. Exposed to the client via SvelteKit's `$env/static/public`, so it must carry the `PUBLIC_` prefix. |

## Backend API contract

The image uploader ([src/lib/components/ImageUploader.svelte](src/lib/components/ImageUploader.svelte)) expects one endpoint:

`POST {PUBLIC_API_BASE_URL}/api/v1/upload/send`

- **Request:** `multipart/form-data` with a single `image` field (the uploaded file).
- **Success (HTTP 200):** JSON containing `hashtags`, either a space-separated string or an array of strings. A leading `#` on each tag is optional; the frontend strips and re-adds it.
  ```json
  { "hashtags": "sunset beach golden travel" }
  ```
- **Error (non-200):** JSON with an `error` message, surfaced to the user as a toast.
  ```json
  { "error": "Unsupported file type" }
  ```

## Scripts

| Script | Action |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Type-check with `svelte-check` |
| `npm run check:watch` | Type-check in watch mode |

## Project structure

```
src/
  routes/
    +layout.svelte        App shell: Navbar, page content, CTA, Footer
    layout.css            Global styles, design tokens (@theme), fonts, buttons
    +page.svelte          Landing page (hero, features, testimonials, FAQ)
    upload/               Image upload and hashtag results
    how-to-use/           Step-by-step guides (extension and web)
    about-us/             About, vision, mission
    thank-you/            Post-install confirmation
  lib/
    components/
      Navbar.svelte         Fixed nav with mobile drawer
      Footer.svelte
      CTA.svelte            Shared call-to-action above the footer
      ImageUploader.svelte  Drag-and-drop / browse, upload, copy tags
      Toast.svelte          Transient status messages
      Carousel.svelte       Siema wrapper with looping and autoplay
      SectionHeader.svelte
      FeatureCard.svelte
      TestimonialCard.svelte
      FaqContainer.svelte
      HowToUseCard.svelte
static/
  fonts/                  Poppins, Laurentian Std
  features/ hero/ cta/ icons/ how-to-use/   Images and SVGs
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing page |
| `/upload` | Upload an image and generate tags |
| `/how-to-use` | Usage guides for the extension and the web app |
| `/about-us` | About, vision, mission |
| `/thank-you` | Confirmation after installing the extension |

## Build and deploy

```sh
npm run build
npm run preview   # verify the build locally
```

The project uses `@sveltejs/adapter-auto`, which detects supported hosts (Vercel, Netlify, Cloudflare, and others) at build time. For an unsupported target, swap in the matching [SvelteKit adapter](https://svelte.dev/docs/kit/adapters) in [svelte.config.js](svelte.config.js). Set `PUBLIC_API_BASE_URL` in the host's environment settings.

## Status

Private project, version 0.0.1. No license file is included, so default copyright applies and reuse requires the author's permission.
