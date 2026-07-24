import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
      <section className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Error 404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">This page could not be found.</h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          The link may be outdated or the page may have moved. Return to the portfolio to explore projects, experience, and contact details.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">Go home</Link>
          <Link href="/#projects" className="rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:bg-muted">View projects</Link>
        </div>
      </section>
    </main>
  );
}
