import { ArrowUpRight, Check } from 'lucide-react'
import {
  DESTINY_COMPATIBILITY,
  DESTINY_CONTROL_GROUPS,
} from '../data/control-groups'
import { blogPath } from '../data/blog-paths'
import { SITE_HOST } from '../data/site'

/** Destiny 2 feature-group cards + compatibility — Destiny2 Cheats page only. */
export function IncludedControlsSection() {
  return (
    <section className="page-x py-14 sm:py-16" aria-labelledby="included-controls-heading">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="included-controls-heading"
              className="text-lg font-semibold tracking-tight text-white sm:text-xl"
            >
              Included controls
            </h2>
            <p className="mt-1 text-sm text-white/45">
              {DESTINY_CONTROL_GROUPS.length} feature groups for Destiny 2 Hack on {SITE_HOST}.
              Open a group for the full control list — this page stays a checkout overview.
            </p>
          </div>
          <a
            href={blogPath('features-list')}
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            All features →
          </a>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {DESTINY_CONTROL_GROUPS.map((group) => {
            const Icon = group.icon
            return (
              <a
                key={group.name}
                href={group.href}
                className="page-card group flex flex-col rounded-2xl p-4 transition-colors sm:p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-z-accent/20 text-z-soft">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-white/35 transition-colors group-hover:text-white/70"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{group.name}</p>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-white/50">
                  {group.summary}
                </p>
                <p className="mt-3 text-xs text-white/40">{group.controls} controls</p>
              </a>
            )
          })}
        </div>

        <div className="mt-10" aria-labelledby="compatibility-heading">
          <h3
            id="compatibility-heading"
            className="text-lg font-semibold tracking-tight text-white sm:text-xl"
          >
            Compatibility
          </h3>
          <p className="mt-1 text-sm text-white/45">
            What Destiny 2 Hack on {SITE_HOST} is built for — check live status before you load.
          </p>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {DESTINY_COMPATIBILITY.map((item) => {
              const Icon = item.icon
              return (
                <li
                  key={item.label}
                  className="page-card flex gap-3 rounded-2xl p-4 sm:p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-z-accent/20 text-z-soft">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Check className="h-3.5 w-3.5 shrink-0 text-z-soft" strokeWidth={2.5} />
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/50">{item.detail}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
