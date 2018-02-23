// https://github.com/gree/sf2synth.js/blob/master/src/sf2.js
import invariant              from 'invariant'

import { parseSoundFontFile } from './riff'

export default class SoundFont {
  activeNotes = {}

  /* ---------- Instrument API ---------- */
  play = ({ note, velocity, duration }) => {}

  edit = ({ note, velocity, duration }) => {}

  /* ---------- SoundFont API ---------- */
  /**
   * @param {string} url - url of sf file to load (either url or file must be
   * provided)
   * @param {File|Blob} file - sf file to load obtained via file type input
   * (either url or file must be provided)
   */
  load = async ({ url, file } = {}) => {
    const arrayBuffer = url
      ? await URLTOArrayBuffer(url)
      : await fileToArrayBuffer(file)
    const info = parseSoundFontFile(arrayBuffer)
    console.log(`info`, info)
  }
}

/**
 * URLTOArrayBuffer returns an Uint8Array from the given url.
 *
 * @param {string} url
 * @returns {Uint8Array}
 */
function URLTOArrayBuffer(url) {
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
function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      resolve(new Uint8Array(e.target.result))
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}
