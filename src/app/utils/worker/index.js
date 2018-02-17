import uuid from 'uuid/v4'

export function postMessage(worker, arg) {
  return new Promise(resolve => {
    const taskId = uuid()
    worker.postMessage({ ...arg, taskId })
    worker.onmessage = ({ data }) => {
      if (data.taskId === taskId) {
        resolve(data.res)
      }
    }
  })
}
