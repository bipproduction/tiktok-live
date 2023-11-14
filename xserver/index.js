const tiktok = require("./src/tiktok");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function main() {
    tiktok()
}

main()

