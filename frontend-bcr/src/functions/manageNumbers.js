export function toFixedIfNecessary(value, dp) {
  return +parseFloat(value).toFixed(dp);
}
