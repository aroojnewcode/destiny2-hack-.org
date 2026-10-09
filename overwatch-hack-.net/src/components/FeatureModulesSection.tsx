import { Crosshair, Eye, Zap } from 'lucide-react'
import { HOME_FEATURE_MODULES, type FeatureModule } from '../data/feature-modules'

const ICONS = {
  crosshair: Crosshair,
  eye: Eye,
} as const

function ModuleBlock({ module }: { module: FeatureModule }) {
  const Icon = ICONS[module.icon]
  const hasAccent = Boolean(module.titleAccent)

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-z-accent/25 text-z-soft">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2rem]">
          {hasAccent ? (
            <>
              <span className="text-white">{module.titleBefore} </span>
              <span className="text-z-accent">{module.titleAccent}</span>
            </>
          ) : (
            <span className="text-white">{module.titleBefore}</span>
          )}
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
          {module.intro}
        </p>

        <ul className="mt-6 space-y-4">
          {module.highlights.map((item) => (
            <li key={item.title} className="flex gap-3">
              <Zap
                className="mt-0.5 h-4 w-4 shrink-0 text-z-accent"
                strokeWidth={1.75}
                fill="currentColor"
              />
              <p className="text-sm leading-relaxed text-white/60 sm:text-[0.95rem]">
                <span className="font-semibold text-white">{item.title}</span>
                <span className="text-white/45"> — </span>
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <a
          href={module.allControlsHref}
          className="mt-7 inline-flex text-sm font-semibold text-white transition-colors hover:text-z-soft"
        >
          {module.allControlsLabel}
        </a>
      </div>

      <aside className="rounded-2xl border border-white/10 bg-z-card/80 p-5 sm:p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
          {module.moduleLabel}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {module.controls.map((control) => (
            <div
              key={control}
              className="rounded-lg border border-white/12 bg-white/[0.03] px-3 py-2.5 text-center text-xs font-medium text-white/85 sm:text-sm"
            >
              {control}
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

/** Home-only Aimbot + World visuals modules (below feature preview). */
export function FeatureModulesSection() {
  return (
    <section
      className="page-x border-t border-white/10 py-16 sm:py-20"
      aria-label="Destiny 2 Hack feature modules"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-20 sm:gap-24">
        {HOME_FEATURE_MODULES.map((module) => (
          <ModuleBlock key={module.id} module={module} />
        ))}
      </div>
    </section>
  )
}
