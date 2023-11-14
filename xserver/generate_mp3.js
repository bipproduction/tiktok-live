const { config, createAudioFromText } = require('tiktok-tts')
const arg = process.argv.splice(2)
const _ = require('lodash')
const path = require('path')
const replaceSpecialCharacters = require('replace-special-characters')

async function main() {
    if (_.isEmpty(arg)) return console.log("parameter null")
    config('ed9c0f16b57b8a6e4e27a0b0a2904d9e');
    await createAudioFromText(replaceSpecialCharacters(arg[0]), path.join(__dirname, './../public/assets/mp3/suara'), "id_001");
    console.log("success generate mp3")
}

main()