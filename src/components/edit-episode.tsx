'use client'

import React, { useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Episode } from '@/types'

import { returnNZSTString, returnPSTDate, returnPSTString } from '@/lib/utils'

const Edit = ({ episode }: { episode: Episode }) => {
  const titleRef = useRef<HTMLInputElement | null>(null)

  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const guestNameRef = useRef<HTMLInputElement | null>(null)
  const guestTwitterRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    titleRef.current!.value = episode.title

    descriptionRef.current!.value = episode.description
    guestNameRef.current!.value = episode.guest_name
    if (episode.guest_twitter) {
      guestTwitterRef.current!.value = episode.guest_twitter
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Episode Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-md font-bold">
                Title
              </Label>
              <Input id="title" ref={titleRef} placeholder="Episode title" className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest_name" className="text-md font-bold">
                Guest Name
              </Label>
              <Input
                id="guest_name"
                ref={guestNameRef}
                placeholder="Guest name"
                className="w-full"
              />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="date" className="text-md font-bold">
                Date (PST)
              </Label>

              <div>{returnPSTString(episode.date)}</div>
              {/* <DatePicker date={date!} setDate={setDate} /> */}
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="date" className="text-md font-bold">
                Date (NZST)
              </Label>

              <div>{returnNZSTString(episode.date)}</div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col gap-1">
                <Label className="text-md font-bold" htmlFor="guest_twitter">
                  Guest Twitter
                </Label>
                <span className="text-xs italic">no @ symbol</span>
              </div>
              <Input
                id="guest_twitter"
                ref={guestTwitterRef}
                placeholder="eg. jlengstorf"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-md font-bold">
              Description
            </Label>
            <Input
              id="description"
              ref={descriptionRef}
              placeholder="Episode description"
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full">
            Update
          </Button>
          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              console.log(returnPSTDate(episode.date))
            }}
          >
            Log
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Edit
