/**
 * URLTOArrayBuffer returns an Uint8Array from the given url.
 *
 * @param {string} url
 * @returns {Uint8Array}
 */
export function URLTOArrayBuffer(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.addEventListener('load', event => {
      const arrayBuffer = new Uint8Array(event.target)
      resolve(arrayBuffer)
    })
    xhr.addEventListener('error', reject)
    xhr.send()
  })
}

/**
 * fileToArrayBuffer returns an Uint8Array from a given File|Blob.
 *
 * @param {File|Blob} file
 * @returns {Uint8Array}
 */
export function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      resolve(new Uint8Array(e.target.result))
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}
