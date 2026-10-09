import { blogPath } from './blog-paths'

export type FeatureHighlight = {
  title: string
  body: string
}

export type FeatureModule = {
  id: string
  icon: 'crosshair' | 'eye'
  titleBefore: string
  titleAccent: string
  intro: string
  highlights: FeatureHighlight[]
  allControlsHref: string
  allControlsLabel: string
  moduleLabel: string
  controls: string[]
}

/** Home-only control modules (under feature preview). */
export const HOME_FEATURE_MODULES: FeatureModule[] = [
  {
    id: 'aimbot',
    icon: 'crosshair',
    titleBefore: 'Aimbot for',
    titleAccent: 'Destiny 2',
    intro:
      'Aimbot settings cover activation, silent aim, smoothing, bone selection, prediction and on-screen helpers. Each control does only what is listed here.',
    highlights: [
      {
        title: 'Enable',
        body: 'Master toggle for the aimbot. Leave it off until you want aiming behavior active.',
      },
      {
        title: 'Aim Key',
        body: 'The selected key used to activate supported aiming behavior.',
      },
      {
        title: 'Silent Aim',
        body: 'Aiming mode included with the aimbot. This page describes the toggle only. It does not claim accuracy, detection, or safety.',
      },
      {
        title: 'Targeting Preset',
        body: 'Selects the targeting preset used by the aimbot. Range, priority and team options live on the targeting guide.',
      },
    ],
    allControlsHref: blogPath('aimbot-settings'),
    allControlsLabel: 'All aimbot controls →',
    moduleLabel: 'Aimbot module',
    controls: [
      'Enable',
      'Aim Key',
      'Silent Aim',
      'Targeting Preset',
      'Smoothing',
      'Bone Selector',
      'Switch Delay',
      'Humanizer',
      'Prediction',
      'Y Offset',
      'Auto Miss',
      'Gradual Aim',
      'Start Delay',
      'Adaptive Speed',
      'Draw FOV',
      'Snap Line',
    ],
  },
  {
    id: 'world-visuals',
    icon: 'eye',
    titleBefore: 'World visuals',
    titleAccent: '',
    intro:
      'World visuals cover player boxes, skeletons, health, Supers, names, distance and cooldown overlays for Destiny 2 guardians.',
    highlights: [
      {
        title: 'Guardian Names',
        body: 'Shows name labels on displayed guardians.',
      },
      {
        title: 'Distance',
        body: 'Shows distance to the displayed guardian.',
      },
      {
        title: 'Health Bar',
        body: 'Shows a health bar on displayed guardians.',
      },
      {
        title: 'Super Bar',
        body: 'Shows Super charge on displayed guardians when supported.',
      },
    ],
    allControlsHref: blogPath('esp-wallhack-guide'),
    allControlsLabel: 'All world visuals controls →',
    moduleLabel: 'World visuals module',
    controls: [
      'Guardian Names',
      'Distance',
      'Health Bar',
      'Super Bar',
      'Ability Cooldown ESP',
      'ESP Box',
      'Skeleton ESP',
      'Glow',
      'Tracer Lines',
      'Out-of-FOV Arrows',
      'Draw Predicted Position',
      'Enemy Overlay',
    ],
  },
]
