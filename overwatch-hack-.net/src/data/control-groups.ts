import {
  Crosshair,
  Eye,
  Flame,
  Keyboard,
  MousePointerClick,
  Radar,
  Sparkles,
  Target,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { blogPath } from './blog-paths'

/** Destiny 2 Hack control groups for the Destiny2 Cheats page overview. */
export type ControlGroup = {
  name: string
  icon: LucideIcon
  summary: string
  controls: number
  href: string
}

export const DESTINY_CONTROL_GROUPS: ControlGroup[] = [
  {
    name: 'Aimbot',
    icon: Crosshair,
    summary: 'Enable, aim key, silent aim, smoothing, bones, prediction…',
    controls: 16,
    href: blogPath('aimbot-settings'),
  },
  {
    name: 'Targeting',
    icon: Target,
    summary: 'FOV, dynamic FOV, distance, priority, lock mode, roles…',
    controls: 12,
    href: blogPath('aimbot-settings'),
  },
  {
    name: 'Triggerbot',
    icon: MousePointerClick,
    summary: 'Hotkey, delay, accuracy scale and fire assist when on target…',
    controls: 8,
    href: blogPath('aimbot-settings'),
  },
  {
    name: 'ESP / Wallhack',
    icon: Eye,
    summary: 'Guardian boxes, skeleton, distance, health, name labels…',
    controls: 14,
    href: blogPath('esp-wallhack-guide'),
  },
  {
    name: 'Super & ability ESP',
    icon: Flame,
    summary: 'Super charge, ability markers and cooldown readouts…',
    controls: 10,
    href: blogPath('esp-wallhack-guide'),
  },
  {
    name: 'Radar',
    icon: Radar,
    summary: '2D radar, flanks, off-screen guardians, range and size…',
    controls: 8,
    href: blogPath('radar-hack-guide'),
  },
  {
    name: 'Stream-proof',
    icon: Video,
    summary: 'Keep supported overlays out of OBS and common capture tools…',
    controls: 4,
    href: blogPath('stream-proof-setup'),
  },
  {
    name: 'Hotkeys & misc',
    icon: Keyboard,
    summary: 'Menu key, panic bind, configs, FOV helpers and toggles…',
    controls: 12,
    href: blogPath('hotkeys'),
  },
]

/** Destiny 2 / destiny2hack.org compatibility checklist under Included controls. */
export type CompatibilityItem = {
  label: string
  detail: string
  icon: LucideIcon
}

export const DESTINY_COMPATIBILITY: CompatibilityItem[] = [
  {
    label: 'Destiny 2 (PC)',
    detail: 'Official Destiny 2 client on Windows — Steam and Bungie launcher.',
    icon: Sparkles,
  },
  {
    label: 'Windows 10 & 11',
    detail: 'Intel and AMD CPUs. Admin load with Defender exclusions ready.',
    icon: Target,
  },
  {
    label: 'BattlEye status',
    detail: 'Clear-to-load or Updating published live on destiny2hack.org after patches.',
    icon: Eye,
  },
  {
    label: 'Crucible modes',
    detail: 'Control, Survival and Trials of Osiris when the build allows it.',
    icon: Crosshair,
  },
]
