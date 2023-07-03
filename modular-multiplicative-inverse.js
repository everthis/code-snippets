const mod = 1e9 + 7

function modmul(a, b) {
  const big = BigInt
  return Number(((big(a) % big(mod)) * (big(b) % big(mod))) % big(mod))
}

function binExpo(a, b) {
  if (b === 0) return 1
  let res = binExpo(a, Math.floor(b / 2))
  if (b & 1) {
    return modmul(a, modmul(res, res))
  } else {
    return modmul(res, res)
  }
}

function modmulinv(a) {
  return binExpo(a, mod - 2)
}
