'use server'

import prisma from "@/util/prisma"

export async function get_poin() {
    const data = await prisma.poin.findMany({
        select: {
            id: true,
            name: true,
            value: true
        }
    })
    return data
}