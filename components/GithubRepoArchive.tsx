"use client";

import { useId, useMemo, useState } from "react";
import { ArrowUpRight, Code2, ExternalLink, Search } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { repositories, siteConfig } from "@/data/portfolio";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4f5d95",
  Python: "#3572a5",
  Dart: "#00b4ab",
  "C#": "#178600",
  HTML: "#e34c26",
};

export default function GithubRepoArchive() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputId = useId();

  const languages = useMemo(() => {
    const set = new Set<string>();
    for (const repo of repositories) {
      if (repo.language) {
        set.add(repo.language);
      }
    }
    return ["All", ...Array.from(set)];
  }, []);

  const filteredRepos = useMemo(() => {
    return repositories.filter((repo) => {
      const matchesLang =
        selectedLanguage === "All" || repo.language === selectedLanguage;
      const matchesSearch =
        !searchQuery.trim() ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLang && matchesSearch;
    });
  }, [selectedLanguage, searchQuery]);

  return (
    <div className="mt-20 border-t border-tarmac-gray/40 pt-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9.26px] tracking-[0.2em] uppercase text-signal-lime">
              OPEN SOURCE // REPOSITORIES ARCHIVE
            </span>
            <span className="inline-flex items-center rounded border border-signal-lime/30 bg-signal-lime/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-signal-lime">
              {repositories.length} Repos
            </span>
          </div>
          <h3 className="mt-2 font-sans text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-chalk-cream">
            All Public Repositories
          </h3>
          <p className="mt-2 font-sans text-sm text-stone-gray max-w-xl">
            Directly from{" "}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal-lime underline underline-offset-4 hover:brightness-110"
            >
              @MArsalanwarsi
            </a>
            . Full-stack MERN apps, CLI tools, REST APIs, Flutter apps, and UI modules.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <label htmlFor={searchInputId} className="sr-only">
            Search repositories
          </label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-gray" aria-hidden="true" />
          <input
            id={searchInputId}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search repositories..."
            className="w-full rounded-[6px] border border-tarmac-gray/50 bg-visor-black/90 pl-9 pr-4 py-2 font-sans text-xs text-chalk-cream placeholder:text-stone-gray focus:border-signal-lime focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Language Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8" role="tablist" aria-label="Filter by programming language">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang;
          return (
            <button
              key={lang}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedLanguage(lang)}
              className={`inline-flex items-center gap-1.5 rounded-[4px] border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                isSelected
                  ? "border-signal-lime bg-signal-lime text-paddock-olive font-bold"
                  : "border-tarmac-gray/40 bg-visor-black/60 text-stone-gray hover:text-chalk-cream hover:border-tarmac-gray"
              }`}
            >
              {lang !== "All" && (
                <span
                  className="size-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: isSelected ? "#0e100f" : LANGUAGE_COLORS[lang] || "#888",
                  }}
                  aria-hidden="true"
                />
              )}
              {lang}
            </button>
          );
        })}
      </div>

      {/* Repositories Grid */}
      {filteredRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.map((repo) => (
            <article
              key={repo.name}
              className="group flex flex-col justify-between rounded-[8px] border border-tarmac-gray/40 bg-visor-black/80 p-5 transition-colors hover:border-signal-lime/50"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Code2 className="size-4 shrink-0 text-signal-lime" aria-hidden="true" />
                    <h4 className="font-mono text-sm font-bold text-chalk-cream truncate group-hover:text-signal-lime transition-colors">
                      {repo.name}
                    </h4>
                  </div>
                  {repo.language && (
                    <span className="inline-flex items-center gap-1 shrink-0 rounded border border-tarmac-gray/50 bg-paddock-olive/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sage-fog">
                      <span
                        className="size-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || "#888" }}
                        aria-hidden="true"
                      />
                      {repo.language}
                    </span>
                  )}
                </div>

                <p className="mt-3 font-sans text-xs leading-relaxed text-stone-gray line-clamp-3 break-words">
                  {repo.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-tarmac-gray/30 pt-3">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-chalk-cream hover:text-signal-lime transition-colors"
                >
                  <GithubIcon className="size-3.5" />
                  <span>Repository</span>
                  <ArrowUpRight className="size-3 text-signal-lime" aria-hidden="true" />
                </a>

                {repo.live ? (
                  <a
                    href={repo.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-signal-lime hover:underline underline-offset-2 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[8px] border border-tarmac-gray/40 bg-visor-black/40 p-8 text-center">
          <p className="font-sans text-sm text-stone-gray">
            No repositories matched your filter &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedLanguage("All");
              setSearchQuery("");
            }}
            className="mt-3 font-mono text-xs text-signal-lime underline underline-offset-4"
          >
            Reset filter
          </button>
        </div>
      )}

      {/* GitHub Profile Callout */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[8px] border border-tarmac-gray/30 bg-visor-black/40 px-6 py-4">
        <div className="flex items-center gap-3">
          <GithubIcon className="size-5 text-signal-lime" />
          <span className="font-mono text-xs text-stone-gray">
            Looking for all repositories, forks, and contributions?
          </span>
        </div>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[6px] border border-signal-lime/50 bg-signal-lime/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-signal-lime hover:bg-signal-lime hover:text-paddock-olive transition-colors"
        >
          <span>Visit GitHub Profile</span>
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
