'use client'

import EditEpisodeForm from '@/components/edit-episode-form'
import { pb } from '@/lib/pocketbase'
import { Episode } from '@/types'
import { RecordModel } from 'pocketbase'
import { useEffect, useState } from 'react'

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [slug, setSlug] = useState<string>('')
  const [user, setUser] = useState<RecordModel | null>(null)
  const [episode, setEpisode] = useState<Episode | null>(null)
  const getSlug = async () => {
    const slug = (await params).slug
    setSlug(slug)
  }

  useEffect(() => {
    getSlug()
  }, [])

  useEffect(() => {
    if (pb.authStore.isValid) {
      setUser(pb.authStore.record)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getEpisodes = async () => {
    if (!slug) return
    const episode = (await pb
      .collection('episodes')
      .getFirstListItem(`slug="${slug}"`)) as unknown as Episode

    setEpisode(episode)
  }

  console.log(user)
  console.log(episode)

  useEffect(() => {
    if (!slug) return
    getEpisodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])
  return (
    <main className="h-full w-screen flex justify-center items-center">
      {episode && <EditEpisodeForm episode={episode} />}
    </main>
  )
}

export default Page
