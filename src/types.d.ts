import { RecordModel } from 'pocketbase'

export interface Episode extends RecordModel {
  title: string
  slug: string
  date: string
  description: string
  guest_name: string
  guest_twitter: string
  website: boolean
  calendar: boolean
  scheduled_tweet: boolean
  ninety_minute_tweet: boolean
  live_tweet: boolean
}
