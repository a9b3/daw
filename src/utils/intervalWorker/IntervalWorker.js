function _setInterval({ ms }) {
  return setInterval(() => {
    postMessage('tick')
  }, ms)
}

function _clearInterval({ id }) {
  clearInterval(id)
}

onmessage = ({ data: { type, taskId, arg } }) => {
  switch (type) {
    case 'setInterval':
      const id = _setInterval(arg)
      postMessage({ taskId, res: id })
      break
    case 'clearInterval':
      _clearInterval(arg)
      postMessage({ taskId })
      break
  }
}
