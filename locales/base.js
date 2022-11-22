const set = require('lodash/set')

export default async (context, locale) => {
  if (process.env.NODE_ENV === 'development') {
    // https://docs.google.com/spreadsheets/d/1SHdSfnQsP1RMNW1emxeexZKSJ3AXppQhH71MnHf42rw/edit?usp=sharing
    const sheetId = '1SHdSfnQsP1RMNW1emxeexZKSJ3AXppQhH71MnHf42rw'
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
  } else {
    const { default: fallbackDictionary } = require(`./${locale}/fallback.json`)
    return Promise.resolve(fallbackDictionary)
  }
}
