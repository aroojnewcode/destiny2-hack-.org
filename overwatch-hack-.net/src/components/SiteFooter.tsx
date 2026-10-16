import { LogoMark } from './LogoMark'
import { SITE_GUIDE_LINKS, SITE_PAGE_LINKS } from '../data/links'
import { SITE_NAME } from '../data/site'

type SiteFooterProps = {
  currentPath?: string
}

const LEGAL_LINKS = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/refunds', label: 'Refunds' },
] as const

function normalizePath(path?: string) {
  if (!path) return ''
  return path.replace(/\/+$/, '') || '/'
}

function isCurrent(to: string, currentPath?: string) {
  const path = normalizePath(currentPath)
  if (!path) return false
  const target = normalizePath(to)
  if (target === '/') return path === '/'
  return path === target || path.startsWith(`${target}/`)
}

/**
 * Site footer with page / guide / legal links.
 * XML sitemap remains at /sitemap.xml — not shown as an on-page “sitemap” section.
 */
export function SiteFooter({ currentPath }: SiteFooterProps) {
  const path = normalizePath(currentPath || '/')

  return (
    <footer className="page-x border-t border-z-soft/15 bg-z-band py-12 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-12">
          <div className="max-w-sm shrink-0">
            <div className="flex items-center gap-2">
              <LogoMark className="text-z-soft" />
              <span className="font-semibold text-z-ink">{SITE_NAME}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Destiny 2 hack for PC — silent aim Aimbot, player ESP, wallhack, radar and live anti-cheat status
              for Destiny 2 players worldwide.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Pages
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/65">
                {SITE_PAGE_LINKS.filter(
                  (l) => !['/privacy', '/terms', '/refunds'].includes(l.to),
                ).map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      aria-current={isCurrent(l.to, path) ? 'page' : undefined}
                      className={
                        isCurrent(l.to, path)
                          ? 'font-medium text-white'
                          : 'transition-colors hover:text-white'
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Guides
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/65">
                {SITE_GUIDE_LINKS.map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      aria-current={isCurrent(l.to, path) ? 'page' : undefined}
                      className={
                        isCurrent(l.to, path)
                          ? 'font-medium text-white'
                          : 'transition-colors hover:text-white'
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/blogs"
                    className="font-medium text-white/80 transition-colors hover:text-white"
                  >
                    All blogs →
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Legal
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/65">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      aria-current={isCurrent(l.to, path) ? 'page' : undefined}
                      className={
                        isCurrent(l.to, path)
                          ? 'font-medium text-white'
                          : 'transition-colors hover:text-white'
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  )
}
