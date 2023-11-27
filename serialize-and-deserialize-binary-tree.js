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

// another

/**
 * @param {Node} root
 * @return {string}
 */
function serialize(root) {
  const q = [root];
  const result = [];
  while(q.length) {
    const node = q.shift();
    if(node) {
      result.push(node.value);
      q.push(node.left, node.right);
    } else {
      result.push('null');
    }
  }
  return result.join(',');
}

/**
 * @param {string} str
 * @return {Node}
 */
function deserialize(str) {
  const arr = str.split(',');
  return buildTree(arr, 0);
}

function buildTree(arr, index) {
  if(arr[index] === 'null') return null;
  if(index >= arr.length) return null;
  const node = new Node(arr[index]);
  node.left = buildTree(arr, index * 2 + 1);
  node.right = buildTree(arr, index * 2 + 2);
  return node;
}
