import { postMessage } from 'utils/worker'
import IntervalWorker  from 'worker-loader!./IntervalWorker.js'

const worker = new IntervalWorker()

/**
 * Uses web workers to trigger intervals. Useful for more intervals that need to
 * happen when user is not focused on the current tab.
 *
 * ex:
 * const cancelInterval = await setInterval(() => {}, 100)
 * cancelInterval()
 */
export async function setInterval(cb, ms) {
  const id = await postMessage(worker, { type: 'setInterval', arg: { ms } })
  worker.onmessage = ({ data }) => {
    if (data === 'tick') {
      cb()
    }
  }
  return () => postMessage(worker, { type: 'clearInterval', arg: { id } })
}
