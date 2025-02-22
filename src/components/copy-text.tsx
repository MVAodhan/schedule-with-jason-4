import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { captionsBlurb, generateYoutubeDescription, getHighlightText } from '@/lib/utils'
import { Episode, ListLink } from '@/types'
import { Input } from './ui/input'

const CopyText = ({ episode, links }: { episode: Episode; links?: ListLink[] }) => {
  const formatLinks = (tags: string) => {
    const tagsArr = JSON.parse(tags)
    const formattedTags = tagsArr.join(',')

    return formattedTags
  }

  const techRef = useRef<HTMLInputElement | null>(null)
  const [tech, setTech] = useState<string>('')

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4 pt-2">
          {links && (
            <Button
              onClick={() =>
                navigator.clipboard.writeText(generateYoutubeDescription(episode, links))
              }
            >
              Youtube Description
            </Button>
          )}
          <Button onClick={() => navigator.clipboard.writeText(captionsBlurb)}>
            Captions disclaimer
          </Button>
          {episode.tags && (
            <Button
              onClick={() => {
                const formattedTags = formatLinks(JSON.stringify(episode.tags))
                navigator.clipboard.writeText(formattedTags!)
              }}
            >
              Copy Tags
            </Button>
          )}

          <div className="flex flex-col gap-2">
            <Input ref={techRef}></Input>
            <Button
              onClick={() => {
                setTech(techRef.current!.value)
              }}
            >
              Update Technology
            </Button>
          </div>
          {tech && (
            <Button
              className="my-5"
              onClick={() => {
                const tweet = getHighlightText(
                  tech,
                  episode.slug,
                  episode.guest_twitter,
                  episode.guest_name,
                )
                navigator.clipboard.writeText(tweet)
              }}
            >
              Copy Tweet
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CopyText
