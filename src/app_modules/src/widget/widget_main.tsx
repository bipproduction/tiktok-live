'use client'
import { useShallowEffect } from "@mantine/hooks"
import { get_live } from "../../fun_server/get_live"
import { useState } from "react"
import { COMMENT } from "../../../../xserver/models/ts/COMMENT"
import { Avatar, Box, Button, Center, Dialog, Flex, Image, ScrollArea, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { COMMENT2 } from "../../../../xserver/models/ts/COMMENT2"
import { useAtom } from "jotai"
import { _val_list_live } from "@/app_modules/val/val_live"
import { _val_poin } from "@/app_modules/val/val_poin"
import { Inter, Anton, Oswald } from 'next/font/google'
import confetti from 'canvas-confetti';
import { Animation, Typer } from 'react-easy-animations'
import _ from 'lodash'
import { Poin } from "@prisma/client"
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';

const anton = Oswald({
    weight: "400",
    display: "auto",
    style: "normal",
    subsets: ["latin"]
})


export default function WidgetMain() {
    const [list_live] = useAtom(_val_list_live)
    const [list_poin, setList_poin] = useAtom<Poin[]>(_val_poin)
    const [audio, set_audio] = useState<HTMLAudioElement | null>(null);

    const [up_prabowo, set_up_prabowo] = useState<number | null>(1)
    const [up_ganjar, set_up_ganjar] = useState<number | null>(1)
    const [up_anis, set_up_anis] = useState<number | null>(1)

    const is_client = useState(false)

    useShallowEffect(() => {
        if (window) {
            set_audio(new Audio())

            // const audio = new Audio('/assets/mp3/suara.mp3');
            // audio.muted = true
            // audio.autoplay = true
            // const body = document.querySelector('body')
            // if (body) {
            //     body.addEventListener("mousedown", () => {
            //         audio.muted = false
            //         audio.play()
            //     })
            // }

        }
        return audio?.pause()
    }, [])

    async function play() {
        if (audio) {
            audio.src = '/assets/mp3/suara.mp3'
            audio.load()
            audio.play()
        }
    }


    useShallowEffect(() => {

        if (!list_poin) return null
        const local_poin: Poin[] = JSON.parse(localStorage.getItem('local_point') ?? "[]")

        // console.log(local_poin)

        if (list_poin && !_.isEmpty(list_poin)) {
            // console.log("update poin")
            if (local_poin && !_.isEmpty(local_poin)) {

                const lip_prabowo = list_poin.find((v) => v.id === "prabowo")
                const lip_ganajar = list_poin.find((v) => v.id === "ganjar")
                const lip_anies = list_poin.find((v) => v.id === "anis")

                const lop_prabowo = local_poin.find((v) => v.id === "prabowo")
                const lop_ganjar = local_poin.find((v) => v.id === "ganjar")
                const lop_anis = local_poin.find((v) => v.id === "anis")

                if (lip_prabowo && lop_prabowo && lip_prabowo.value > lop_prabowo.value) {
                    // update prabowo
                    set_up_prabowo(null)
                    setTimeout(() => set_up_prabowo(1), 1)
                }

                if (lip_ganajar && lop_ganjar && lip_ganajar.value > lop_ganjar.value) {
                    // update ganjar
                    set_up_ganjar(null)
                    setTimeout(() => set_up_ganjar(1), 1)
                }

                if (lip_anies && lop_anis && lip_anies.value > lop_anis.value) {
                    // update anis
                    set_up_anis(null)
                    setTimeout(() => set_up_anis(1), 1)
                }

                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                play()

            }

            localStorage.setItem("local_point", JSON.stringify(list_poin))
        }



    }, [list_poin])

    if (!is_client[0]) return <Center pos={"fixed"} bg={"gray"} w={"100%"} h={"100%"}>
        <Button onClick={() => {
            is_client[1](true)
            play()
        }}>
            PLAY
        </Button>
    </Center>

    return <>

        <Stack align="center" className={anton.className} pos={"fixed"} h={"100%"} bg={"url(/assets/img/bg_bendera.png)"} w={"100%"}>
            <Title c={"yellow"}>POLING CEPAT</Title>
            <Stack maw={720} bg={"url(/assets/img/bg_blue.png)"} h={"100%"} >
                <Flex p={"lg"} c={"white"} wrap={"wrap"} justify={"center"}>
                    {!up_prabowo ? <Box w={200}></Box> : <Animation
                        type="zoomIn"
                        duration="1000ms"
                        delay="0s"
                        direction="normal"
                        timing="ease"
                        iteration="1"
                        hidden={!up_prabowo}>
                        <Stack align="center" w={"200"} gap={0} bg={"yellow"}>
                            <Image src={'/assets/img/prabowo.png'} alt="" />
                            <Text>Ketik #PRABOWO</Text>
                            <Title size={32}>{list_poin.find((v) => v.name === "prabowo") ? list_poin.find((v) => v.name === "prabowo")?.value : 0}</Title>
                        </Stack>
                    </Animation>}

                    {!up_ganjar ? <Box w={200} ></Box> : <Animation
                        type="zoomIn"
                        duration="1000ms"
                        delay="0s"
                        direction="normal"
                        timing="ease"
                        iteration="1"
                        hidden={!up_ganjar}
                    >
                        <Stack align="center" w={"200"} gap={0} bg={"red"}>
                            <Image src={'/assets/img/ganjar.png'} alt="" />
                            <Text>Ketik #GANJAR</Text>
                            <Title size={32}>{list_poin.find((v) => v.name === "ganjar") ? list_poin.find((v) => v.name === "ganjar")?.value : 0}</Title>
                        </Stack>
                    </Animation>}

                    {!up_anis ? <Box w={200}></Box> : <Animation
                        type="zoomIn"
                        duration="1000ms"
                        delay="0s"
                        direction="normal"
                        timing="ease"
                        iteration="1"
                        hidden={!up_anis}>
                        <Stack align="center" w={"200"} gap={0} bg={"blue.9"}>
                            <Image src={'/assets/img/anis.png'} alt="" />
                            <Text>Ketik #ANIS</Text>
                            <Title size={32}>{list_poin.find((v) => v.name === "anis") ? list_poin.find((v) => v.name === "anis")?.value : 0}</Title>
                        </Stack>
                    </Animation>}
                </Flex>
                <Flex gap={"lg"} align={"center"} justify={"center"} c={"white"} py={"lg"} bg={"url(/assets/img/bg_radial_blue.png)"}>
                    <SimpleGrid cols={3}>
                        {list_live.map((v, k) => <Stack key={k}>
                            <Flex align={"start"} gap={"md"}>
                                <Avatar src={v.img} radius={100} />
                                <Stack gap={0}>
                                    <Text style={{
                                        fontWeight: "bold"
                                    }}>{v.name}</Text>
                                    <Text style={{
                                        fontStyle: "italic",
                                        fontSize: 12
                                    }}>{v.text}</Text>
                                </Stack>
                            </Flex>

                        </Stack>)}
                    </SimpleGrid>
                </Flex>
            </Stack>
        </Stack>
    </>
}