function pow(a, b) {
  if(b === 0) return '1'

  const remain = b % 2
  const tmp = pow(a, ~~(b / 2))
  if(remain === 1) {
    return multi('' + a, multi(tmp, tmp))
  }else {
    return multi(tmp, tmp)
  }  
}

function multi(s1, s2) {
  const len1 = s1.length
  const len2 = s2.length
  const len = len1 + len2
  const arr = Array(len1 + len2).fill(0)

  for(let i = len2 - 1; i >= 0; i--) {
    const startIdx = len - 1 - (len2 - 1 - i)
    const ch = s2[i]
    const val = single(s1, ch)

    let inc = 0
    for(let n = val.length, i = n - 1; i >= 0; i--) {
      let idx = startIdx - (n - 1 - i)

      let nv = arr[idx] + (+val[i])
      nv += inc
      if(nv > 9) {
        inc = 1
        nv = nv % 10
      }else {
        inc = 0
      }
      
      arr[idx] = nv
      if(i === 0 && inc) {
        while(inc) {
          const nextIdx = --idx
          console.log(nextIdx)
          let pv = arr[nextIdx] + inc
          if(pv > 9) {
            inc = 1
            arr[nextIdx] = pv % 10
          } else {
            arr[nextIdx] = pv
            inc = 0
          }
        }
      }
    } 
  }
  let firstNonZeroIdx = 0
  for(let i = 0; i < len; i++) {
    if(arr[i] !== 0) {
      firstNonZeroIdx = i
      break
    }
  }
  return arr.slice(firstNonZeroIdx).join('')
}


function single(str1, ch) {
  let inc = 0
  let res = ''
  ch = +ch

  for(let i = str1.length - 1; i >= 0; i--) {
    const cur = +str1[i]
    let val = cur * ch
    val += inc

    if(val > 9) {
        inc = ~~(val / 10)
        val = val % 10
    }else {
        inc = 0
    }
    res = val + res
  }

  if(inc) res = `${inc}` + res

  return res
}

// console.log(single('12', '5'))
// console.log(single('22', '9'))
// console.log(single('22', '2'))
// console.log(single('55', '8'))
// console.log(multi('11', '11'))
// console.log(multi('22', '22'))
// console.log(multi('55', '88'))

// console.log(pow(22, 11))
