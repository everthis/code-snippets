// class Node {
//   value: number
//   left: null | Node
//   right: null | Node
//   constructor(val) {
//     this.value = val
//     this.left = null
//     this.right = null
//   }
// }

/**
 * @param {Node} root
 * @return {string}
 */
function serialize(root) {
  if(root == null) return '_'
  return `${root.val},${serialize(root.left)},${serialize(root.right)}`
}

/**
 * @param {string} str
 * @return {Node}
 */
function deserialize(str) {
  const arr = str.split(',')
  return dfs()
  
  function dfs() {
    const e = arr.shift()
    if(e === '_') return null
    const res = new Node(e)
    res.left = dfs()
    res.right = dfs()
    return res
  }
}
