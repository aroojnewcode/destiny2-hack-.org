import { Navbar } from '../components/Navbar'
import { VideoBg } from '../components/VideoBg'
import { CheckoutLink } from '../components/CheckoutLink'
import { guidePath } from '../data/games'
import { HOME_HEADINGS, SITE_HOST } from '../data/site'
import { DESTINY_HERO_VIDEO } from '../data/media'

/** Above-the-fold home hero — hydrated early for nav + checkout. */
export function HomeHero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-x-clip">
      <VideoBg
        image={DESTINY_HERO_VIDEO.poster}
        imageAlt="Destiny 2 first-person gameplay highlight on the homepage hero"
        video={DESTINY_HERO_VIDEO.src}
      />

      <div className="relative z-20 flex min-h-screen flex-col">
        <Navbar onVideo />

        <main className="page-x mt-auto pb-6 sm:pb-8 lg:pb-10">
          <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="relative z-30 max-w-md lg:max-w-lg">
              <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-z-soft/80 sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
                Destiny 2 · Worldwide · {SITE_HOST}
              </p>
              <h1 className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                {HOME_HEADINGS.h1}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:mt-3.5 sm:text-[0.95rem]">
                Destiny 2 cheats for Windows 10 and 11 — silent aim Aimbot, player ESP,
                wallhack, radar and a clear cheat menu. Live anti-cheat status on Control,
                Survival and Trials of Osiris.
              </p>

              <div className="relative z-50 mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                  Buy Destiny 2 Hack
                </CheckoutLink>
                <a
                  href={guidePath('destiny-2')}
                  className="inline-flex items-center justify-center rounded-full border border-z-soft/35 bg-[rgba(28,22,48,0.88)] px-5 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-[background-color,border-color] hover:border-z-soft/50 hover:bg-[rgba(36,28,58,0.95)]"
                >
                  Product details
                </a>
              </div>
            </div>

            <div className="relative z-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:w-[30rem] lg:shrink-0">
              <div className="glass flex h-full min-h-[140px] flex-col justify-between rounded-2xl p-4 sm:min-h-[160px] sm:p-5">
                <p
                  className="status-pill text-2xl font-normal tracking-tight sm:text-3xl"
                  style={{ fontFamily: "'Silkscreen', cursive" }}
                >
                  UD
                </p>
                <p className="mt-2.5 text-xs leading-relaxed text-white/70 sm:mt-3 sm:text-sm">
                  Live anti-cheat status for Destiny 2. Updated after patches —
                  not random Discord screenshots.
                </p>
              </div>

              <div className="glass flex h-full min-h-[140px] flex-col rounded-2xl p-4 sm:min-h-[160px] sm:p-5">
                <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-z-accent/30 text-[10px] font-bold text-z-soft sm:h-6 sm:w-6 sm:text-xs">
                    D2
                  </div>
                  <span className="text-sm font-semibold text-white">Destiny 2</span>
                </div>
                <p className="flex-1 text-xs leading-relaxed text-white/80 sm:text-sm">
                  “Bought it for ESP and mild silent aim. Status stayed honest after the last
                  anti-cheat rebuild — finally an honest status shop.”
                </p>
                <div className="mt-3 flex items-center gap-2.5 sm:mt-4 sm:gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-z-accent/25 text-xs font-semibold text-z-ink sm:h-9 sm:w-9 sm:text-sm">
                    JK
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">jayk</p>
                    <p className="text-xs text-white/60">Destiny 2 player</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
