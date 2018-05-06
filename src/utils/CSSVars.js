export function get(value, node = document.documentElement) {
  value = /^--/.test(value) ? value : `--${value}`
  return getComputedStyle(node).getPropertyValue(value)
}

export function set(name, value, node = document.documentElement) {
  name = /^--/.test(name) ? name : `--${name}`
  return node.style.setProperty(name, value)
}
