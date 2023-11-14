// const natural = require('natural')
// const token = new natural.WordPunctTokenizer()
// const { fetch } = require('cross-fetch')
// const io = require('socket.io-client')
// const socket = io('https://io.wibudev.com')
var player = require('play-sound')
const path = require('path')

const { config, createAudioFromText } = require('tiktok-tts')

player().play(path.join(__dirname, './public/assets/mp3/suara.mp3'))
// process.exit()

// socket.on("connect", data => {
//   console.log("connscted")
// })

// socket.on("live_tiktok", data => {
//   console.log("diatas")
//   console.log(data)
// })


// setTimeout(() => {
//   fetch('https://io.wibudev.com/io', {
//     method: "POST",
//     body: JSON.stringify({
//       id: "live_tiktok"
//     }),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }).then(async (v) => console.log("dikirim"))
// }, 3000)