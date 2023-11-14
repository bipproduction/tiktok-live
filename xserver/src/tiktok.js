const { WebcastPushConnection } = require('tiktok-live-connector');
const MODEL_LIVE = require('../models/js/live');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const natural = require('natural')
const token = new natural.WordTokenizer()
const _ = require('lodash')
require('colors')
const { fetch } = require('cross-fetch');
const { execSync } = require('child_process');
const arg = process.argv.splice(2)
const path = require('path')

module.exports = async function tiktok() {
    if (_.isEmpty(arg)) return console.log("masukkan parameter id user")
    let tiktokUsername = arg[0];
    let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

    // Connect to the chat (await can be used as well)
    tiktokLiveConnection.connect().then(state => {
        console.info(`Connected to roomId ${state.roomId}`);
    }).catch(err => {
        console.error('Failed to connect', err);
    })

    tiktokLiveConnection.on('chat', async (data) => {
        try {
            execSync(`node ${path.join(__dirname, './../generate_mp3.js')} "${data.comment}"`, { stdio: "inherit" })
        } catch (error) {
            console.log("error membuat audio")
        }

        /**
         * @type {MODEL_LIVE}
         */
        const live = data

        const prabowo = live.comment.includes("#prabowo")
        const ganjar = live.comment.includes("#ganjar")
        const anis = live.comment.includes("#anis")

        if (prabowo) {
            console.log("ditect prabowo")
            update_poin("prabowo", live)
        }
        if (ganjar) {
            console.log("ditect ganjar")
            update_poin("ganjar", live)
        }
        if (anis) {
            console.log("ditect anis")
            update_poin("anis", live)
        }

    })
}

async function update_poin(candidate, live) {
    await prisma.live.create({
        data: {
            data: live,
            img: live.profilePictureUrl,
            name: live.uniqueId,
            uid: live.nickname,
            text: live.comment
        }
    })
    const poin = await prisma.poin.findUnique({ where: { id: candidate } })

    await prisma.poin.upsert({
        where: {
            id: candidate
        },
        create: {
            id: candidate,
            value: 1,
            name: candidate
        },
        update: {
            value: poin && poin.value ? (poin.value + 1) : 1
        }

    })

    // const user = await prisma.live.findMany({
    //     take: 10,
    //     orderBy: {
    //         createdAt: "desc"
    //     }
    // })

    // const poin_val = await prisma.poin.findMany()
    const kirim = await fetch("https://io.wibudev.com/io", {
        method: "POST",
        body: JSON.stringify({
            id: "live_tiktok",
            path: "/live",
            data: {
                candidate
            }
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (kirim.status === 200) console.log("io success".green)
    console.log(`update poin ${candidate} success`.cyan)
}