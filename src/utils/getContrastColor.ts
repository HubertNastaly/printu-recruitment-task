const COLOR_BASE = 16
const BRIGHTNESS_THRESHOLD = 180

export function getContrastColor(color: string) {
  const r = parseInt(color.slice(1, 3), COLOR_BASE)
  const g = parseInt(color.slice(3, 5), COLOR_BASE)
  const b = parseInt(color.slice(5, 7), COLOR_BASE)

  const brightness = 0.299 * r + 0.578 * g + 0.114 * b

  return brightness > BRIGHTNESS_THRESHOLD ? 'black' : 'white'
}
