import { RecordModel } from "pocketbase";

export interface Episode extends RecordModel {
  title: string;
  slug: string;
  date: string;
  description: string;
  guest_name: string;
  guest_twitter?: string;
  website?: boolean;
  calendar?: boolean;
  scheduled_tweet?: boolean;
  ninety_minute_tweet?: boolean;
  discord?: boolean;
  live_tweet?: boolean;
  scheduled_tweet_bs?: boolean;
  ninety_minute_tweet_bs?: boolean;
  live_tweet_bs?: boolean;
  youtube_link: string;
  links?: [];
  tags?: [];
}

export interface ListLink {
  id: string;
  label: string;
  value: string;
}
