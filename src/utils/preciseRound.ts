/** @reference https://github.com/alvarocastro/round/blob/master/index.js */
const preciseRound = function (num: number, decimals: number = 2) {
  const p = 10 ** decimals
  const fpFix = Number.EPSILON * (num < 0 ? -1 : 1)

  return Math.round((num + fpFix) * p) / p
}

export { preciseRound }
