const fs = require('node:fs')
const lodash = require('lodash')
const PublicGoogleSheetsParser = require('public-google-sheets-parser')

const { color } = require('../functions/console')

// https://docs.google.com/spreadsheets/d/1kPMMdpqMIufb1rQRoX3-RHM8gofN5_1ZsciAbcowR_Y/edit?usp=sharing
const parser = new PublicGoogleSheetsParser()
const sheetId = '1kPMMdpqMIufb1rQRoX3-RHM8gofN5_1ZsciAbcowR_Y'
const sheetName = 'dictionary'

const targetLanguages = ['ko', 'en', 'ja', 'vi']

console.log(`${color('green', '[Dictionary] ')} Starting building dictionary file...`)

console.log(`${color('green', '[Dictionary] ')} Starting fetching google sheets...`)

parser.parse(sheetId, sheetName).then(rows => {
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

    fs.writeFileSync(`${__dirname}/${lang}/fallback.json`, JSON.stringify(dictionary[lang]))

    console.log(`${color('green', '[Dictionary] ')} Created ${lang} dictionary file.`)
  })

  console.log(`${color('green', '[Dictionary] ')} ${targetLanguages.length} files created.`)
})

console.log(`${color('green', '[Dictionary] ')} The dictionary file build is complete..`)
