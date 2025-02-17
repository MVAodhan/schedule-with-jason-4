'use client'

import EditEpisodeForm from '@/components/edit-episode'
import { pb } from '@/lib/pocketbase'
import { Episode } from '@/types'
import { useEffect, useRef, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LinkList from '@/components/link-list'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useChapterStore, useLinkStore } from '@/lib/zustand-stores'
import { generateYoutubeDescription } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [slug, setSlug] = useState<string>('')
  const [episode, setEpisode] = useState<Episode | null>(null)

  const addLink = useLinkStore((state) => state.addLink)
  const links = useLinkStore((state) => state.links)
  const setLinks = useLinkStore((state) => state.setLinks)
  const setChapters = useChapterStore((state) => state.setChapters)

  const chaptersRef = useRef<HTMLTextAreaElement | null>(null)
  const labelRef = useRef<HTMLInputElement | null>(null)
  const valueRef = useRef<HTMLInputElement | null>(null)

  const getSlug = async () => {
    const slug = (await params).slug
    setSlug(slug)
  }

  const getEpisode = async () => {
    if (!slug) return
    const episode = (await pb
      .collection('episodes')
      .getFirstListItem(`slug="${slug}"`)) as unknown as Episode
    setEpisode(episode)
  }

  const saveLinks = async () => {
    await pb.collection('episodes').update(episode!.id, { links: JSON.stringify(links) })
  }

  // const updateDate = async () => {
  //   const date = new Date(2025, 2, 8, 6, 30, 0, 0)
  //   await pb.collection('episodes').update(episode!.id, { date: date })
  // }
  useEffect(() => {
    getSlug()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!slug) return
    getEpisode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  useEffect(() => {
    if (!episode) return
    setLinks(episode.links!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode])

  return (
    <main className="h-full w-screen flex justify-center pt-10">
      {episode && (
        <Tabs defaultValue="edit" className="w-[600px] ">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="links">Links & Chapters</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <EditEpisodeForm episode={episode} />
          </TabsContent>
          <TabsContent value="links">
            <Card>
              <CardHeader>
                <Label>Chapters</Label>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <Textarea ref={chaptersRef} />
                <Button onClick={() => setChapters(chaptersRef.current!.value)}>
                  Save Chapters
                </Button>
              </CardContent>
            </Card>
            <div className="w-full grid grid-cols-2">
              <LinkList />
              <Card>
                <CardContent>
                  <div className="flex flex-col gap-2 pt-2">
                    <Input placeholder="label" ref={labelRef} />
                    <Input placeholder="value" ref={valueRef} />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col gap-2 w-full">
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => {
                        addLink(labelRef.current!.value, valueRef.current!.value)
                        labelRef.current!.value = ''
                        valueRef.current!.value = ''
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                    <Button onClick={saveLinks}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Links
                    </Button>
                    {/* <Button
                      onClick={() => {
                        const date = new Date(episode.date)
                        const utc = date.toLocaleString('en-US', {
                          timeZone: 'UTC',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        })
                        const pstDate = date.toLocaleString('en-US', {
                          timeZone: 'America/Los_Angeles',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        })
                        const nzst = date.toLocaleString('en-US', {
                          timeZone: 'Pacific/Auckland',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        })

                        console.log(utc)
                        console.log(pstDate)
                        console.log(nzst)
                      }}
                    >
                      Log Date
                    </Button> */}
                  </div>
                </CardFooter>
                <Button
                  className="w-full"
                  onClick={() =>
                    navigator.clipboard.writeText(generateYoutubeDescription(episode, links))
                  }
                >
                  Copy Youtube Description
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </main>
  )
}

export default Page
