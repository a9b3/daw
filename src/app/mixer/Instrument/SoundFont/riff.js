function arrayBufferToChunkList(arrayBuffer, { index, length } = {}) {
  let ip = index || 0
  const offset = ip
  length = (length || arrayBuffer.length - ip) + offset
  const chunkList = []
  while (ip < length) {
    const type = String.fromCharCode(
      arrayBuffer[ip++],
      arrayBuffer[ip++],
      arrayBuffer[ip++],
      arrayBuffer[ip++],
    )
    const size =
      (arrayBuffer[ip++] |
        (arrayBuffer[ip++] << 8) |
        (arrayBuffer[ip++] << 16) |
        (arrayBuffer[ip++] << 24)) >>>
      0
    chunkList.push({
      type,
      size,
      offset: ip,
    })
    ip += size
  }

  return chunkList
}

export function parseSoundFontFile(arrayBuffer) {
  const chunkList = arrayBufferToChunkList(arrayBuffer)

  return parseRiff(chunkList[0], arrayBuffer)
}

// http://www.pjb.com.au/midi/sfspec21.html#4
// {
//  info,
//  samples,
//  pdta: {
//    presetHeaders,
//    presetIndexList,
//    presetModulatorList,
//    presetGeneratorList,
//    instrumentNamesAndIndices,
//    instrumentIndexList,
//    instrumentModulatorList,
//    instrumentGeneratorList,
//    sampleHeaders,
//  }
// }
function parseRiff({ type, size, offset }, arrayBuffer) {
  invariant(type === 'RIFF', `'type' must be RIFF`)
  const chunkList = arrayBufferToChunkList(arrayBuffer, {
    index: offset + 4,
    length: size - 4,
  })
  invariant(chunkList.length === 3, `invalid sfbk structure`)

  return {
    info: parseInfo(chunkList[0], arrayBuffer),
    samples: parseSdtaList(chunkList[1], arrayBuffer),
    pdta: parsePdtaList(chunkList[2], arrayBuffer),
  }
}

function parseInfo({ type, size, offset }, arrayBuffer) {
  invariant(type === 'LIST', `'type' must be LIST`)

  return arrayBufferToChunkList(arrayBuffer, {
    index: offset + 4,
    length: size - 4,
  })
}

function parseSdtaList({ type, size, offset }, arrayBuffer) {
  invariant(type === 'LIST', `'type' must be LIST`)
  const chunkList = arrayBufferToChunkList(arrayBuffer, {
    index: offset + 4,
    length: size - 4,
  })

  return chunkList[0]
}

function parsePdtaList({ type, size, offset }, arrayBuffer) {
  invariant(type === 'LIST', `'type' must be LIST`)
  const chunkList = arrayBufferToChunkList(arrayBuffer, {
    index: offset + 4,
    length: size - 4,
  })

  return {
    presetHeaders: parsePhdr(chunkList[0], arrayBuffer),
    presetIndexList: parsePbag(chunkList[1], arrayBuffer),
  }
}

/* ------------------- Parsers ------------------- */

// preset headers
function parsePhdr({ type, offset, size }, arrayBuffer) {
  invariant(type === 'phdr', `'type' must be phdr`)
  let ip = offset
  size = offset + size
  const presetHeader = []
  while (ip < size) {
    presetHeader.push({
      presetName: String.fromCharCode(...arrayBuffer.subarray(ip, (ip += 20))),
      preset: arrayBuffer[ip++] | (arrayBuffer[ip++] << 8),
      bank: arrayBuffer[ip++] | (arrayBuffer[ip++] << 8),
      presetBagIndex: arrayBuffer[ip++] | (arrayBuffer[ip++] << 8),
      library:
        (arrayBuffer[ip++] |
          (arrayBuffer[ip++] << 8) |
          (arrayBuffer[ip++] << 16) |
          (arrayBuffer[ip++] << 24)) >>>
        0,
      genre:
        (arrayBuffer[ip++] |
          (arrayBuffer[ip++] << 8) |
          (arrayBuffer[ip++] << 16) |
          (arrayBuffer[ip++] << 24)) >>>
        0,
      morphology:
        (arrayBuffer[ip++] |
          (arrayBuffer[ip++] << 8) |
          (arrayBuffer[ip++] << 16) |
          (arrayBuffer[ip++] << 24)) >>>
        0,
    })
  }

  return presetHeader
}

// preset index list
function parsePbag({ type, offset, size }, arrayBuffer) {
  invariant(type === 'pbag', `'type' must be pbag`)
  let ip = offset
  size = offset + size
  const presetIndexList = []
  while (ip < size) {
    presetIndexList.push({
      presetGeneratorIndex: arrayBuffer[ip++] | (arrayBuffer[ip++] << 8),
      presetModulatorIndex: arrayBuffer[ip++] | (arrayBuffer[ip++] << 8),
    })
  }

  return presetIndexList
}

// preset modulator list
function parsePmod({ type, offset, size }, arrayBuffer) {
  invariant(type === 'pmod', `'type' must be pmod`)
  const ip = offset
  size = offset + size
  const presetIndexList = []
}

// preset generator list
function parsePgen({ type, offset, size }, arrayBuffer) {
  invariant(type === 'pgen', `'type' must be pgen`)
  const ip = offset
  size = offset + size
  const presetIndexList = []
}

// instrument names and indices
function parseInst({ type, offset, size }, arrayBuffer) {
  invariant(type === 'inst', `'type' must be inst`)
  let ip = offset
  size = offset + size
  const instruments = []
  while (ip < size) {
    instruments.push({
      instrumentName: String.fromCharCode(
        ...arrayBuffer.subarray(ip, (ip += 20)),
      ),
      instrumentBagIndex: arrayBuffer[ip++] | (arrayBuffer[ip++] << 8),
    })
  }

  return instruments
}
