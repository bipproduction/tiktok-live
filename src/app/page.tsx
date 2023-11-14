import WidgetIo from '@/app_modules/src/widget/widget_io'
import WidgetMain from '@/app_modules/src/widget/widget_main'
import { Stack } from '@mantine/core'
import Image from 'next/image'

export default function Home() {
  return (
    <Stack>
      <WidgetIo />
      <WidgetMain />
    </Stack>
  )
}
