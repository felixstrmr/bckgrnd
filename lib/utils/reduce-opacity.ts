export function reduceOpacity(
  hexColor: string,
  opacityPercentage: number,
): string {
  // Remove the '#' if present
  const hex = hexColor.replace(/^#/, '')

  // Parse the hex color
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  // Calculate the opacity value (0-1)
  const opacity = Math.max(0, Math.min(100, opacityPercentage)) / 100

  // Convert to rgba
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
