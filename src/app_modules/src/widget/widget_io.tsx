'use client'
import { get_live } from '@/app_modules/fun_server/get_live'
import { get_poin } from '@/app_modules/fun_server/get_poin'
import { _val_list_live } from '@/app_modules/val/val_live'
import { _val_poin } from '@/app_modules/val/val_poin'
import { useShallowEffect } from '@mantine/hooks'
import { useAtom } from 'jotai'
import { io } from 'socket.io-client'

export default function WidgetIo() {
    const [list_live, set_list_live] = useAtom(_val_list_live)
    const [list_poin, set_list_poin] = useAtom(_val_poin)

    useShallowEffect(() => {
        const socket = io('https://io.wibudev.com', { transports: ["polling"] })
        socket.on('connect', () => {
            console.log('Terhubung ke server socket.io');
        });

        socket.on('live_tiktok', data => {
            console.log("update data")
            get_data()
        })

        get_data()
    }, [])

    async function get_data() {
        get_live().then(set_list_live)
        get_poin().then(set_list_poin)
    }
    return <>

    </>
}