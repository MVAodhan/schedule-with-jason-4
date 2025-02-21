'use client'

import React, { useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DatePicker } from './date-picker'

import { DateTime } from 'luxon'

import { pb } from '@/lib/pocketbase'
import { returnPSTString, slugify } from '@/lib/utils'

const NewEpisode = () => {
  const titleRef = useRef<HTMLInputElement | null>(null)

  // const [tags, setTags] = useState<string[]>([])
  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState<string>('')

  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const guestNameRef = useRef<HTMLInputElement | null>(null)
  const guestTwitterRef = useRef<HTMLInputElement | null>(null)
  const tagsRef = useRef<HTMLInputElement | null>(null)
  const createNewEpisode = async () => {
    if (!time) {
      alert('Please select a time')
      return
    }
    const utc = createUTCString(date, time)
    const slug = slugify(titleRef.current!.value)
    await pb.collection('episodes').create({
      title: titleRef.current?.value,
      slug: slug,
      date: utc,
      description: descriptionRef.current?.value,
      guest_name: guestNameRef.current?.value,
    })
  }

  const createUTCString = (date: Date, time: string) => {
    // Takes Date from the DatePick and Makes it into a PST Date
    const dateObj = DateTime.fromFormat(
      `${date.toLocaleDateString().replaceAll('/', '-')} ${time}`,
      'dd-MM-yyyy H:mm',
      {
        zone: 'America/Los_Angeles',
      },
    ).toJSDate()

    // Converts PST date to UTC string
    const ustDate = dateObj.toISOString()
    return ustDate
  }

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
            <div>
              <div className="space-y-2 flex flex-col ">
                <Label htmlFor="date" className="text-md font-bold">
                  Date
                </Label>
                <DatePicker setDate={setDate} date={date!} />
              </div>
              <div className="space-y-2 mt-2 flex flex-col ">
                <Label className="text-md font-bold">Time</Label>
                <Select
                  onValueChange={(e) => {
                    setTime(e)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Time (PST)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00</SelectItem>
                    <SelectItem value="9:30">9:30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

          <Input
            ref={tagsRef}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                // setTags((prev: string[]) => {
                //   return [...prev, tagsRef.current?.value]
                // })
                tagsRef.current!.value = ''
              }
            }}
          />

          <Button type="submit" className="w-full" onClick={() => createNewEpisode()}>
            Create New Episode
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewEpisode
