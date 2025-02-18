'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { pb } from '@/lib/pocketbase'
import { returnNZSTString, returnPSTString } from '@/lib/utils'
import { useStore } from '@/lib/zustand-stores'
import { Episode } from '@/types'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const getUser = useStore((state) => state.getUser)
  const [episodes, setEpisodes] = useState<Episode[] | null>(null)

  const getEpisodes = async () => {
    const episodes = (await pb.collection('episodes').getFullList()) as unknown as Episode[]

    setEpisodes(episodes)
  }

  useEffect(() => {
    getUser()
    getEpisodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen flex justify-center">
      <div className="mt-10 w-4/5 grid grid-cols-1 lg:w-3/6 gap-5">
        {episodes?.map((episode) => (
          <Card key={episode.id}>
            <CardHeader className="text-xl font-bold">
              <span className="flex justify-between">
                {episode.title}
                <div className="flex gap-5">
                  <Link href={`/edit/${episode.slug}`}>
                    <Button className="bg-transparent text-black hover:bg-transparent">
                      <Pencil />
                    </Button>
                  </Link>
                  <Button className="bg-red-500 hover:bg-red-500 text-black ">
                    <Trash2 />
                  </Button>
                </div>
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                Guest Name: {episode.guest_name}
                <div className="flex flex-col gap-2">
                  <span>US Date: {episode ? returnPSTString(episode!.date) : ''}</span>

                  <span>NZ Date: {episode ? returnNZSTString(episode.date) : ''}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
