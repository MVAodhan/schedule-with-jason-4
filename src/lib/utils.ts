import { Episode, ListLink } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const liveLink = 'https://lwj.dev/live'

interface Sponsor {
  name: string
  slug: string
}
export const sponsors: Sponsor[] = [
  {
    name: 'Tuple',
    slug: 'tuple',
  },
]

export const generateYoutubeDescription = (episode: Episode, links: ListLink[]) => {
  const youtubeDescription = `
${episode.description}

Upcoming episodes:
https://lwj.dev/schedule

Links & Resources:

${formatLinks(links)}

${getCredits()}

${episode.chapters ?? `Chapters: ${episode.chapters}`}`

  return youtubeDescription
}

export const formatLinks = (JSONLinks: ListLink[]) => {
  const linkSet = new Set()
  const linkValues = JSONLinks.map((link) => link)

  for (const value of linkValues) {
    linkSet.add(value)
  }

  let linkSetStrings: string[] = []
  linkSet.forEach((link) => {
    const linkString = `- ${link.label}: ${link.value}`
    linkSetStrings = [...linkSetStrings, linkString]
  })

  const unique = linkSetStrings.join('\n')
  return unique
}

export const getSponsors = (sponsors: { name: string; slug: string }[]) => {
  let sponsorLines: string[] = []
  for (const sponsor of sponsors) {
    const sponsorLine = `- ${sponsor.name}: https://lwj.dev/${sponsor.slug}`
    sponsorLines = [...sponsorLines, sponsorLine]
  }

  const formattedSponsors = sponsorLines.join('\n')

  return formattedSponsors
}

export const getCredits = () => {
  return `Watch future episodes live at ${liveLink}

This episode was sponsored by:
${getSponsors(sponsors)}

Live transcription by White Coat Captioning (https://whitecoatcaptioning.com/)
`
}

export function slugify(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and hyphens with a single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}

export const returnPSTString = (date: string) => {
  const JSDate = new Date(date)
  const pstDate = JSDate.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return pstDate
}
export const returnNZSTString = (date: string) => {
  const JSDate = new Date(date)
  const nzstDate = JSDate.toLocaleString('en-US', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return nzstDate
}


export const twoWeekTweet = (description: string, link: string) => {
  const tweet = `📣 Just Scheduled

  ${description}

  Details: ${link}

  `
  return tweet
}
export const ninetyMinuteTweet = (description: string, link: string) => {
  const tweet = `⚠️ In 90 Minutes

  ${description}

  Details: ${link}

  `
  return tweet
}
export const liveTweet = (description: string, link: string) => {
  const tweet = `🔴 Live

  ${description}

  Watch Live: ${link}

  `
  return tweet
}
