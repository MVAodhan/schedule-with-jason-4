import { text, pgTable, serial, json, boolean } from 'drizzle-orm/pg-core';

export const episodes = pgTable('episodes', {
    id: serial('id').primaryKey(),
    sanityId: text('sanityId'),
    title: text('title'),
    name: text('name'),
    date: text('date'),
    description: text('description'),
    guest: json('guest'),
    host: json('host'),
    tags: json('tags'),
    slug    : text('slug'),
    uri     : text('uri'),
    timezone : text('timezone'),
    chapters : text('chapters'),
    links: json('links'),
    tech     : text('tech'),
    demo     : text('demo'),
    repo     : text('repo'),
    twitter_description: text('twitter_description'),
    schedule_tweet:      boolean('schedule_tweet'),
    ninety_minute_tweet: boolean('ninety_minute_tweet'),
    live_tweet :         boolean('live_tweet')
});