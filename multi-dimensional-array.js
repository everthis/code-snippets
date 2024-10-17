function MultiDimensionalArray(defaultValue, ...args) {
  if (args.length === 1) {
    return Array(args[0]).fill(defaultValue)
  }
  const res = []

  for (let i = 0, n = args[0]; i < n; i++) {
    res.push(MultiDimensionalArray(defaultValue, ...args.slice(1)))
  }

  return res
}
