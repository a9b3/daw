import audioContext from './audioContext'

/**
 * Wrap call to return promise.
 *
 * @param {String} url - url to get arraybuffer for
 * @returns {Promise.resolve(ArrayBuffer)}
 */
function getBuffer(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    request.addEventListener('load', () => {
      resolve(request.response)
    })
    request.addEventListener('error', reject)
    request.send()
  })
}

/**
 * Wrap decodeAudioData to return promise.
 *
 * @param {ArrayBuffer} arrayBuffer - return from getBuffer
 * @returns {Promise.resolve(AudioBuffer)}
 */
function decodeAudioDataAsync(arrayBuffer) {
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(arrayBuffer, resolve, reject)
  })
}

/**
 * getAudioBuffer returns AudioBuffer given url
 *
 * @param {string} url
 * @param {AudioBuffer}
 */
export async function getAudioBuffer(url) {
  return decodeAudioDataAsync(await getBuffer(url))
}
