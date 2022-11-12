const set = require('lodash/set')

export default async (context, locale) => {
  // https://docs.google.com/spreadsheets/d/1kPMMdpqMIufb1rQRoX3-RHM8gofN5_1ZsciAbcowR_Y/edit?usp=sharing
  const sheetId = '1kPMMdpqMIufb1rQRoX3-RHM8gofN5_1ZsciAbcowR_Y'
  const sheetName = 'dictionary'
  const dictionary = {}

  const response = await context.$gsparser.parse(sheetId, sheetName)
  if (response.length) {
    response.forEach(item => set(dictionary, item.key, item[locale]))
  } else {
    const { default: fallbackDictionary } = require(`./${locale}/fallback.json`)
    Object.assign(dictionary, fallbackDictionary)
  }

  return Promise.resolve(dictionary)
}
