const fs = require('node:fs')
const path = require('node:path')

const lodash = require('lodash')
const PublicGoogleSheetsParser = require('public-google-sheets-parser')
const { color } = require('../util_old/console')

try {
  // https://docs.google.com/spreadsheets/d/1SHdSfnQsP1RMNW1emxeexZKSJ3AXppQhH71MnHf42rw/edit?usp=sharing
  const parser = new PublicGoogleSheetsParser()
  const sheetId = '1SHdSfnQsP1RMNW1emxeexZKSJ3AXppQhH71MnHf42rw'
  const sheetName = 'dictionary'

  const targetLanguages = ['ko', 'en', 'ja', 'vi']

  console.log(`${color('green', '[Dictionary] ')} Starting building dictionary file...`)

  console.log(`${color('green', '[Dictionary] ')} Starting fetching google sheets...`)

  parser
    .parse(sheetId, sheetName)
    .then(rows => {
      const dictionary = {}

      rows.forEach(row => {
        console.log(`${color('green', '[Dictionary] ')} Fetching ${row.key}...`)

        targetLanguages.forEach(lang => {
          console.log(`${color('green', '[Dictionary] ')} Fetching ${row.key} for ${lang} language...`)

          lodash.set(dictionary, `${lang}.${row.key}`, row[lang])

          console.log(`${color('green', '[Dictionary] ')} Fetched ${row.key} for ${lang} language.`)
        })

        console.log(`${color('green', '[Dictionary] ')} Fetched ${row.key}...`)
      })

      targetLanguages.forEach(lang => {
        console.log(`${color('green', '[Dictionary] ')} Creating ${lang} dictionary file...`)

        fs.existsSync(path.join(__dirname, lang)) || fs.mkdirSync(path.join(__dirname, lang))
        fs.writeFileSync(path.join(__dirname, lang, 'translation.json'), JSON.stringify(dictionary[lang]))

        console.log(`${color('green', '[Dictionary] ')} Created ${lang} dictionary file.`)
      })

      console.log(`${color('green', '[Dictionary] ')} ${targetLanguages.length} files created.`)
      console.log(`${color('green', '[Dictionary] ')} The dictionary file build is complete..`)
    })
    .catch(error => {
      console.error(`${color('red', '[Dictionary] ')} ${error}`)
    })
} catch (error) {
  console.error(`${color('red', '[Dictionary] ')} ${error}`)
}
