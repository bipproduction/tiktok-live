'use server'
import prisma from "@/util/prisma";

export async function get_live() {
    const data = await prisma.live.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 20,
        select: {
            id: true,
            img: true,
            name: true,
            text: true,
            uid: true
        }
    })

    return data
}