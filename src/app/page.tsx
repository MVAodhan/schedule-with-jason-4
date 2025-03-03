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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function Home() {
  const getUser = useStore((state) => state.getUser)
  const [episodes, setEpisodes] = useState<Episode[] | null>(null)

  const getEpisodes = async () => {
    const episodes = (await pb
      .collection('episodes')
      .getFullList({ sort: 'date' })) as unknown as Episode[]

    setEpisodes(episodes)
  }

  useEffect(() => {
    getUser()
    getEpisodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteEpisode = async (id: string) => {
    await pb.collection('episodes').delete(id)
  }

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
                  <Dialog>
                    <DialogTrigger>
                      <Trash2 className="h-[18px] w-[18px] text-red-600 shadow" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          <div className="flex flex-col gap-2">
                            <span className="text-red-400">Delete</span>
                            <span>{episode.title}</span>
                          </div>
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete {episode.title}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <Button
                          type="button"
                          variant="secondary"
                          className="bg-red-300 hover:bg-red-200 text-black"
                          onClick={() => deleteEpisode(episode.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
