export const colorStr2arr = str => {
  let arr = ['', '', '']
  if (str.startsWith('#')) {
    str
      .replace('#', '')
      .split('')
      .forEach((x, i) => {
        if ([0, 1].includes(i)) {
          arr[0] += x
        }
        if ([2, 3].includes(i)) {
          arr[1] += x
        }
        if ([4, 5].includes(i)) {
          arr[2] += x
        }
      })
    arr = arr.map(x => parseInt(x, 16))
  } else {
    arr = str.replace(/[rgb() ]/g, '').split(',')
  }
  return [...arr, 1]
}

export const genHub = (r, g, b, min, max) => {
  const diff = 60 / (max - min)
  if (max === min) {
    return 0
  } else if (max === r && g >= b) {
    return diff * (g - b) + 0
  } else if (max === r && g < b) {
    return diff * (g - b) + 360
  } else if (max === g) {
    return diff * (b - r) + 120
  } else if (max === b) {
    return diff * (r - g) + 240
  }
}

export const rgb2hsl = rgba => {
  const [r0, g0, b0, a] = rgba
  const [r, g, b] = [r0, g0, b0].map(x => x / 255)
  const min = Math.min(...[r, g, b])
  const max = Math.max(...[r, g, b])
  const l = (min + max) / 2
  const h = genHub(r, g, b, min, max)
  const genSaturation = (l, min, max) => {
    if (l === 0 || min === max) {
      return 0
    } else if (0 < l && l <= 0.5) {
      return (max - min) / (2 * l)
    } else if (l > 0.5) {
      return (max - min) / (2 - 2 * l)
    }
  }
  const s = genSaturation(l, min, max)
  return [h, s, l, a]
}
export const hsl2rgb = hsla => {
  const [h, s, l, a] = hsla
  const C = (1 - Math.abs(2 * l - 1)) * s
  const H_ = h / 60
  const X = C * (1 - Math.abs((H_ % 2) - 1))
  let rgb_ = []
  if (!H_) {
    rgb_ = [0, 0, 0]
  } else if (0 < H_ && H_ <= 1) {
    rgb_ = [C, X, 0]
  } else if (1 < H_ && H_ <= 2) {
    rgb_ = [X, C, 0]
  } else if (2 < H_ && H_ <= 3) {
    rgb_ = [0, C, X]
  } else if (3 < H_ && H_ <= 4) {
    rgb_ = [0, X, C]
  } else if (4 < H_ && H_ <= 5) {
    rgb_ = [X, 0, C]
  } else if (5 < H_ && H_ <= 6) {
    rgb_ = [C, 0, X]
  }
  const m = l - C / 2
  return [...rgb_.map(x => Math.round((x + m) * 255)), a]
}

export const hsl2hex = arr =>
  '#' +
  hsl2rgb(arr)
    .slice(0, 3)
    .map(x => x.toString(16).padStart(2, 0))
    .join('')

export const rgb2hex = rgb =>
  '#' +
  rgb
    .replace(/[rgba()]/g, '')
    .split(',')
    .map(x => parseInt(x).toString(16))
    .join('')
    .substring(0, 6)
