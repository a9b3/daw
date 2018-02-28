/**
 * This file contains logic pertaining to parsing a RIFF formatted file.
 *
 * More information on RIFF formatted files.
 * http://www.pjb.com.au/midi/sfspec21.html
 *
 * Inspired by https://github.com/gree/sf2synth.js/blob/master/src/sf2.js
 */
import invariant      from 'invariant'
import { get }        from 'lodash'

import { GENERATORS } from './constants'

export function parseSoundFontFile(arrayBuffer) {
  const chunkList = arrayBufferToChunkList(arrayBuffer)

  return parseRiff(chunkList[0], arrayBuffer)
}

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

  const info = parseInfo(chunkList[0], arrayBuffer)
  const samples = parseSdtaList(chunkList[1], arrayBuffer)
  const pdta = parsePdtaList(chunkList[2], arrayBuffer, samples.offset)
  return { info, samples, pdta }
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

//    presetHeaders,
//    presetIndexList,
//    presetModulatorList,
//    presetGeneratorList,
//    instrumentNamesAndIndices,
//    instrumentIndexList,
//    instrumentModulatorList,
//    instrumentGeneratorList,
//    sampleHeaders,
function parsePdtaList({ type, size, offset }, arrayBuffer, samplesOffset) {
  invariant(type === 'LIST', `'type' must be LIST`)
  const chunkList = arrayBufferToChunkList(arrayBuffer, {
    index: offset + 4,
    length: size - 4,
  })

  return {
    presetHeaders: parsePhdr(chunkList[0], arrayBuffer),
    presetIndexList: parsePbag(chunkList[1], arrayBuffer),
    presetModulatorList: parsePmod(chunkList[2], arrayBuffer),
    presetGeneratorList: parsePgen(chunkList[3], arrayBuffer),
    instrumentNamesAndIndices: parseInst(chunkList[4], arrayBuffer),
    instrumentIndexList: parseIbag(chunkList[5], arrayBuffer),
    instrumentModulatorList: parseImod(chunkList[6], arrayBuffer),
    instrumentGeneratorList: parseIgen(chunkList[7], arrayBuffer),
    sampleHeaders: parseShdr(chunkList[8], arrayBuffer, samplesOffset),
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

  return parseModulator({ type, offset, size }, arrayBuffer)
}

// preset generator list
function parsePgen({ type, offset, size }, arrayBuffer) {
  invariant(type === 'pgen', `'type' must be pgen`)

  return parseGenerator({ type, offset, size }, arrayBuffer)
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

// instrumentIndexList
function parseIbag({ type, offset, size }, arrayBuffer) {
  invariant(type === 'ibag', `'type' must be ibag`)
  let ip = offset
  size = offset + size
  const instrumentIndexList = []
  while (ip < size) {
    instrumentIndexList.push({
      instrumentGeneratorIndex: arrayBuffer[ip++] | (arrayBuffer[ip++] << 8),
      instrumentModulatorIndex: arrayBuffer[ip++] | (arrayBuffer[ip++] << 8),
    })
  }

  return instrumentIndexList
}

// instrumentModulatorList
function parseImod({ type, offset, size }, arrayBuffer) {
  invariant(type === 'imod', `'type' must be imod`)

  return parseModulator({ type, offset, size }, arrayBuffer)
}

// instrumentGeneratorList
function parseIgen({ type, offset, size }, arrayBuffer) {
  invariant(type === 'igen', `'type' must be igen`)

  return parseGenerator({ type, offset, size }, arrayBuffer)
}

// sampleHeaders
function parseShdr({ type, offset, size }, arrayBuffer, samplesOffset) {
  invariant(type === 'shdr', `'type' must be shdr`)
  let ip = offset
  size = offset + size
  const samples = []
  const sampleHeaders = []
  while (ip < size) {
    const sampleName = String.fromCharCode(
      ...arrayBuffer.subarray(ip, (ip += 20)),
    )
    const start =
      ((arrayBuffer[ip++] << 0) |
        (arrayBuffer[ip++] << 8) |
        (arrayBuffer[ip++] << 16) |
        (arrayBuffer[ip++] << 24)) >>>
      0
    const end =
      ((arrayBuffer[ip++] << 0) |
        (arrayBuffer[ip++] << 8) |
        (arrayBuffer[ip++] << 16) |
        (arrayBuffer[ip++] << 24)) >>>
      0
    let startLoop =
      ((arrayBuffer[ip++] << 0) |
        (arrayBuffer[ip++] << 8) |
        (arrayBuffer[ip++] << 16) |
        (arrayBuffer[ip++] << 24)) >>>
      0
    let endLoop =
      ((arrayBuffer[ip++] << 0) |
        (arrayBuffer[ip++] << 8) |
        (arrayBuffer[ip++] << 16) |
        (arrayBuffer[ip++] << 24)) >>>
      0
    let sampleRate =
      ((arrayBuffer[ip++] << 0) |
        (arrayBuffer[ip++] << 8) |
        (arrayBuffer[ip++] << 16) |
        (arrayBuffer[ip++] << 24)) >>>
      0
    const originalPitch = arrayBuffer[ip++]
    const pitchCorrection = (arrayBuffer[ip++] << 24) >> 24
    const sampleLink = arrayBuffer[ip++] | (arrayBuffer[ip++] << 8)
    const sampleType = arrayBuffer[ip++] | (arrayBuffer[ip++] << 8)
    let sample = new Int16Array(
      new Uint8Array(
        arrayBuffer.subarray(
          samplesOffset + start * 2,
          samplesOffset + end * 2,
        ),
      ).buffer,
    )
    startLoop -= start
    endLoop -= start
    if (sampleRate > 0) {
      const adjust = adjustSampleData(sample, sampleRate)
      sample = adjust.sample
      sampleRate *= adjust.multiply
      startLoop *= adjust.multiply
      endLoop *= adjust.multiply
    }
    samples.push(sample)
    sampleHeaders.push({
      sampleName,
      startLoop,
      endLoop,
      sampleRate,
      originalPitch,
      pitchCorrection,
      sampleLink,
      sampleType,
    })
  }

  return {
    samples,
    sampleHeaders,
  }
}

function adjustSampleData(_sample, _sampleRate) {
  let sampleRate = _sampleRate
  let sample = _sample
  let multiply = 1
  while (sampleRate < 22050) {
    const newSample = new Int16Array(sample.length * 2)
    for (let i = 0, j = 0, il = sample.length; i < il; ++i) {
      newSample[j++] = sample[i]
      newSample[j++] = sample[i]
    }
    sample = newSample
    multiply *= 2
    sampleRate *= 2
  }

  return { sample, multiply }
}

function parseGenerator({ size, offset }, arrayBuffer) {
  let ip = offset
  size = offset + size
  const output = []
  while (ip < size) {
    const code = arrayBuffer[ip++] | (arrayBuffer[ip++] << 8)
    const key = GENERATORS[code]
    if (!key) {
      output.push({
        type: key,
        value: {
          code,
          amount: arrayBuffer[ip] | (((arrayBuffer[ip + 1] << 8) << 16) >> 16),
          lo: arrayBuffer[ip++],
          hi: arrayBuffer[ip++],
        },
      })
      continue
    }
    switch (key) {
      // keynum
      case GENERATORS['46']:
      // keyRange
      case GENERATORS['43']:
      // velRange
      case GENERATORS['44']:
      // velocity
      case GENERATORS['47']:
        output.push({
          type: key,
          value: {
            lo: arrayBuffer[ip++],
            hi: arrayBuffer[ip++],
          },
        })
        break
      default:
        output.push({
          type: key,
          value: {
            amount:
              arrayBuffer[ip++] | (((arrayBuffer[ip++] << 8) << 16) >> 16),
          },
        })
        break
    }
  }

  return output
}

function parseModulator({ size, offset }, arrayBuffer) {
  let ip = offset
  size = offset + size
  const output = []
  while (ip < size) {
    ip += 2
    const code = arrayBuffer[ip++] | (arrayBuffer[ip++] << 8)
    const key = GENERATORS[code]
    if (!key) {
      output.push({
        type: key,
        value: {
          code,
          amount: arrayBuffer[ip] | (((arrayBuffer[ip + 1] << 8) << 16) >> 16),
          lo: arrayBuffer[ip++],
          hi: arrayBuffer[ip++],
        },
      })
      continue
    }
    switch (key) {
      // keynum
      case GENERATORS['46']:
      // keyRange
      case GENERATORS['43']:
      // velRange
      case GENERATORS['44']:
      // velocity
      case GENERATORS['47']:
        output.push({
          value: {
            lo: arrayBuffer[ip++],
            hi: arrayBuffer[ip++],
          },
        })
        break
      default:
        output.push({
          type: key,
          value: {
            amount:
              arrayBuffer[ip++] | (((arrayBuffer[ip++] << 8) << 16) >> 16),
          },
        })
        break
    }
    ip += 2
    ip += 2
  }

  return output
}

/* ------------------- Create Instruments ------------------- */

export function createAllInstruments({
  instrumentGeneratorList,
  instrumentIndexList,
  instrumentModulatorList,
  instrumentNamesAndIndices,
  presetGeneratorList,
  presetHeaders,
  presetIndexList,
  presetModulatorList,
  sampleHeaders,
}) {
  const presets = createPresets({
    presetHeaders,
    presetIndexList,
    presetGeneratorList,
    presetModulatorList,
  })
  const instruments = createInstruments({
    instrumentNamesAndIndices,
    instrumentIndexList,
    instrumentGeneratorList,
    instrumentModulatorList,
  })

  const banks = []
  presets.forEach(preset => {
    const presetNumber = preset.header.preset
    if (typeof preset.instrument !== 'number') {
      return
    }
    const instrument = instruments[preset.instrument]
    if (instrument.name.replace(/\0*$/, '') === 'EOI') {
      return
    }

    banks[preset.header.bank] = banks[preset.header.bank] || []
    banks[preset.header.bank][presetNumber] = []
    // TODO dont use array with key
    banks[preset.header.bank][presetNumber].name = preset.name

    for (let j = 0; j < instrument.info.length; j++) {
      createNoteInfo({
        generator: instrument.info[j].generator,
        preset: banks[preset.header.bank][presetNumber],
        sampleHeaders,
      })
    }
  })
  return banks
}

function createNoteInfo({ sampleHeaders, generator, preset }) {
  if (!generator.keyRange || !generator.sampleID) {
    return
  }
  const tune =
    get(generator, 'coarseTune.amount', 0) +
    get(generator, 'fineTune.amount', 0) / 100
  const scaleTuning = get(generator, 'scaleTuning.amount', 100) / 100
  for (let i = generator.keyRange.lo; i < generator.keyRange.hi; i++) {
    if (preset[i]) {
      continue
    }
    const sampleID = get(generator, 'sampleID.amount')
    const sampleHeader = sampleHeaders.sampleHeaders[sampleID]

    preset[i] = {
      sample: sampleHeaders.samples[sampleID],
      sampleRate: sampleHeader.sampleRate,
      basePlaybackRate: Math.pow(
        Math.pow(2, 1 / 12),
        (i -
          get(
            generator,
            'overridingRootKey.amount',
            sampleHeader.originalPitch,
          ) +
          tune +
          sampleHeader.pitchCorrection / 100) *
          scaleTuning,
      ),
      modEnvToPitch: get(generator, 'modEnvToPitch.amount', 0) / 100,
      start:
        get(generator, 'startAddrsCoarseOffset.amount', 0) * 32768 +
        get(generator, 'startAddrsOffset.amount', 0),
      end:
        get(generator, 'endAddrsCoarseOffset.amount', 0) * 32768 +
        get(generator, 'endAddrsOffset.amount', 0),
      loopStart:
        sampleHeader.startLoop +
        get(generator, 'startloopAddrsCoarseOffset.amount', 0) * 32768 +
        get(generator, 'startloopAddrsOffset.amount', 0),
      loopEnd:
        sampleHeader.endLoop +
        get(generator, 'endloopAddrsCoarseOffset.amount', 0) * 32768 +
        get(generator, 'endloopAddrsOffset.amount', 0),
      volAttack: Math.pow(
        2,
        get(generator, 'attackVolEnv.amount', -12000) / 1200,
      ),
      volDecay: Math.pow(
        2,
        get(generator, 'decayVolEnv.amount', -12000) / 1200,
      ),
      volSustain: get(generator, 'sustainVolEnv.amount', 0) / 1000,
      volRelease: Math.pow(
        2,
        get(generator, 'releaseVolEnv.amount', -12000) / 1200,
      ),
      modAttack: Math.pow(
        2,
        get(generator, 'attackModEnv.amount', -12000) / 1200,
      ),
      modDecay: Math.pow(
        2,
        get(generator, 'decayModEnv.amount', -12000) / 1200,
      ),
      modSustain: get(generator, 'sustainModEnv.amount', 0) / 1000,
      modRelease: Math.pow(
        2,
        get(generator, 'releaseModEnv.amount', -12000) / 1200,
      ),
      initialFilterFc: get(generator, 'initialFilterFc.amount', 13500),
      modEnvToFilterFc: get(generator, 'modEnvToFilterFc.amount', 0),
      initialFilterQ: get(generator, 'initialFilterQ.amount', 0),
      freqVibLFO: get(generator, 'freqVibLFO.amount', 0)
        ? Math.pow(2, get(generator, 'freqVibLFO.amount', 0) / 1200) * 8.176
        : undefined,
      scaleTuning,
    }
  }
}

// use these to create instruments
// instrumentNamesAndIndices, instrumentIndexList
// instrumentZone = instrumentIndexList
// presentZoneGenerator = pgen = presetGeneratorList
/**
 * @returns {array<{ name: string, info: array<{generator, generatorSequence,
 * modulator, modulatorSequence}> }>}
 */
function createInstruments({
  instrumentNamesAndIndices,
  instrumentIndexList,
  instrumentGeneratorList,
  instrumentModulatorList,
}) {
  return instrumentNamesAndIndices.map((instrument, i) => {
    const bagIndex = instrument.instrumentBagIndex
    const bagIndexEnd = instrumentNamesAndIndices[i + 1]
      ? instrumentNamesAndIndices[i + 1].instrumentBagIndex
      : instrumentIndexList.length
    const info = []

    for (let j = bagIndex; j < bagIndexEnd; j++) {
      const instrumentGenerator = createBagModGen(
        instrumentIndexList[j].instrumentGeneratorIndex,
        instrumentIndexList[j + 1]
          ? instrumentIndexList[j + 1].instrumentGeneratorIndex
          : instrumentGeneratorList.length,
        instrumentGeneratorList,
      )
      const instrumentModulator = createBagModGen(
        instrumentIndexList[j].instrumentModulatorIndex,
        instrumentIndexList[j + 1]
          ? instrumentIndexList[j + 1].instrumentModulatorIndex
          : instrumentModulatorList.length,
        instrumentModulatorList,
      )
      info.push({
        generator: instrumentGenerator.modgen,
        generatorSequence: instrumentGenerator.modgenInfo,
        modulator: instrumentModulator.modgen,
        modulatorSequence: instrumentModulator.modgenInfo,
      })
    }

    return { name: instrument.instrumentName, info }
  })
}

function createPresets({
  presetHeaders,
  presetIndexList,
  presetGeneratorList,
  presetModulatorList,
}) {
  return presetHeaders.map((presetHeader, i) => {
    const bagIndex = presetHeader.presetBagIndex
    const bagIndexEnd = presetHeaders[i + 1]
      ? presetHeaders[i + 1].presetBagIndex
      : presetIndexList.length
    const info = []
    let instrument

    for (let j = bagIndex; j < bagIndexEnd; j++) {
      const presetGenerator = createBagModGen(
        presetIndexList[j].presetGeneratorIndex,
        presetIndexList[j + 1]
          ? presetIndexList[j + 1].presetGeneratorIndex
          : presetGeneratorList.length,
        presetGeneratorList,
      )
      const presetModulator = createBagModGen(
        presetIndexList[j].presetModulatorIndex,
        presetIndexList[j + 1]
          ? presetIndexList[j + 1].presetModulatorIndex
          : presetModulatorList.length,
        presetModulatorList,
      )
      info.push({
        generator: presetGenerator.modgen,
        generatorSequence: presetGenerator.modgenInfo,
        modulator: presetModulator.modgen,
        modulatorSequence: presetModulator.modgenInfo,
      })
      instrument =
        presetGenerator.modgen.instrument !== undefined
          ? presetGenerator.modgen.instrument.amount
          : presetModulator.modgen.instrument !== undefined
            ? presetModulator.modgen.instrument.amount
            : null
    }

    return {
      name: presetHeader.presetName,
      header: presetHeader,
      info,
      instrument,
    }
  })
}

function createBagModGen(start, end, zoneModGen) {
  const modgenInfo = []
  const modgen = { unknown: [], keyRange: { hi: 127, lo: 0 } }
  for (let i = start; i < end; i++) {
    const info = zoneModGen[i]
    modgenInfo.push(info)
    if (info.type === 'unknown') {
      modgen.unknown.push(info.value)
    } else {
      modgen[info.type] = info.value
    }
  }

  return { modgen, modgenInfo }
}
