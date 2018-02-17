import { postMessage } from 'utils/worker'
import IntervalWorker  from 'worker-loader!./IntervalWorker.js'

const worker = new IntervalWorker()

export async function setInterval(cb, ms) {
  const id = await postMessage(worker, { type: 'setInterval', arg: { ms } })
  worker.onmessage = ({ data }) => {
    if (data === 'tick') {
      cb()
    }
  }
  return () => postMessage(worker, { type: 'clearInterval', arg: { id } })
}
