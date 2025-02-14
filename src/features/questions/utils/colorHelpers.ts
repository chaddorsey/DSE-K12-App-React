const baseColors = [
  '#2563eb', // blue
  '#dc2626', // red
  '#16a34a', // green
  '#d97706', // amber
  '#7c3aed', // violet
  '#ea580c'  // orange
];

/**
 * Returns an array of colors ensuring no adjacent segments share colors
 */
export function generateDistinctColors(count: number): string[] {
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }

  // For more than 6 options, generate additional colors
  const colors = [...baseColors];
  while (colors.length < count) {
    const hue = (colors.length * 137.508) % 360; // Golden angle approximation
    colors.push(`hsl(${hue}, 70%, 45%)`);
  }
  return colors;
} 