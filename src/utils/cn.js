export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter((value) => typeof value === 'string' && value.trim() !== '')
    .join(' ')
}
