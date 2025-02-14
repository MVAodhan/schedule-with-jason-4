'use client'

import React, { useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const NewEpisode = () => {
  const titleRef = useRef<HTMLInputElement | null>(null)

  const dateRef = useRef<HTMLInputElement | null>(null)
  const timeRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const guestNameRef = useRef<HTMLInputElement | null>(null)
  const guestTwitterRef = useRef<HTMLInputElement | null>(null)

  const log = () => {
    console.log(dateRef.current?.value)
    console.log(timeRef.current?.value)
  }

  // const addNewEpisode = () => {
  //   const formData = {
  //     title: titleRef.current?.value,
  //     slug: slugRef.current?.value,
  //     date: dateRef.current?.value,
  //     time: timeRef.current?.value,
  //     description: descriptionRef.current?.value,
  //     guest_name: guestNameRef.current?.value,
  //     guest_twitter: guestTwitterRef.current?.value,
  //   }
  // }

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
            <div className="space-y-2">
              <Label htmlFor="date" className="text-md font-bold">
                Date
              </Label>
              <Input id="date" type="date" ref={dateRef} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-md font-bold">
                Time
              </Label>
              <Input id="time" type="time" ref={timeRef} className="w-full" />
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

          <Button type="submit" className="w-full" onClick={log}>
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewEpisode
