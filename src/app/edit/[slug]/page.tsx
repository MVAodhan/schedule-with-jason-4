'use client'

import Edit from '@/components/edit-episode'
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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Caldendar from '@/components/caldendar'
import Buffer from '@/components/buffer'
import Website from '@/components/website'
import CopyText from '@/components/copy-text'
import Discord from '@/components/discord'
import Title from '@/components/title'
import { useRouter } from 'next/navigation'

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

  const router = useRouter()

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
    console.log(episode?.id)
    await pb.collection('episodes').update(episode!.id, { links: JSON.stringify(links) })
    router.push('/')
  }
  const saveChapters = async () => {
    setChapters(chaptersRef.current!.value)
    await pb.collection('episodes').update(episode!.id, { chapters: chaptersRef.current?.value })

    router.push('/')
  }

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
    if (!episode || episode?.links === null) return
    setLinks(episode.links!)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode])

  return (
    <main className="h-full w-screen flex justify-center py-10">
      {episode && (
        <Tabs defaultValue="edit" className="w-[600px] ">
          <TabsList className="flex bg-transparent">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="buffer">Buffer</TabsTrigger>
            <TabsTrigger value="discord">Discord</TabsTrigger>
            <TabsTrigger value="links">Links & Chapters</TabsTrigger>
            <TabsTrigger value="copy-btns">Copy Text</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Edit episode={episode} />
          </TabsContent>
          <TabsContent value="website">
            <Website episode={episode} />
          </TabsContent>
          <TabsContent value="calendar">
            <Caldendar episode={episode} />
          </TabsContent>
          <TabsContent value="buffer">
            <Buffer episode={episode} />
          </TabsContent>
          <TabsContent value="links">
            <Card>
              <CardHeader>
                <Title episode={episode} />
                <Label>Chapters</Label>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <Textarea ref={chaptersRef} defaultValue={episode.chapters} />
                <Button onClick={() => saveChapters()}>Save Chapters</Button>
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
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="copy-btns">
            <CopyText episode={episode} links={episode.links} />
          </TabsContent>

          <TabsContent value="discord">
            <Discord episode={episode} />
          </TabsContent>
        </Tabs>
      )}
    </main>
  )
}

export default Page
