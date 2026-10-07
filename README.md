This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Coffee theme and verification

The restored portfolio uses espresso surfaces, cream text, and caramel accents. `CoffeeCursor` provides a small pouring-cup cursor on fine-pointer devices, with no bright cursor halo. Touch and reduced-motion users retain their native pointer. `CoffeeScrollRail` adds a non-interactive coffee machine and filling cup alongside the native, draggable coffee-coloured scrollbar.

The background dot field is bounded to roughly 1,600 dots, draws at 24fps, pauses in hidden tabs, and becomes static for reduced-motion or data-saving preferences. The project carousel also stops automatic work while offscreen or in a hidden tab. The introductory animation is shortened and respects reduced motion.

Run `npm ci`, `npm run lint`, and `npm run build`. Use Node.js 22 or newer. The contact form needs server-side SMTP environment variables from `.env.example`. Canonical metadata, social previews, Person/WebSite/ProfilePage structured data, robots, and sitemap are configured from the portfolio data. Lighthouse SEO scores measure automated technical checks and do not guarantee search rankings.
