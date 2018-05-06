import uuid from 'uuid/v4'

/**
 * postMessage is a helper function for interfacing with web workers.
 *
 * @param {WebWorker} worker
 * @param {object} arg
 * @returns {any}
 */
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
