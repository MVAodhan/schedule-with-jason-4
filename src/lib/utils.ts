import { Episode, ListLink } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const liveLink = "https://lwj.dev/live";

interface Sponsor {
  name: string;
  slug: string;
}
export const sponsors: Sponsor[] = [
  {
    name: "Tuple",
    slug: "tuple",
  },
];

export const generateYoutubeDescription = (
  episode: Episode,
  links: ListLink[]
) => {
  const youtubeDescription = `
${episode.description}

Upcoming episodes:
https://lwj.dev/schedule

Links & Resources:

${formatLinks(links)}

${getCredits()}

${episode.chapters ?? `Chapters: ${episode.chapters}`}`;

  return youtubeDescription;
};

export const formatLinks = (JSONLinks: ListLink[]) => {
  const linkSet: Set<ListLink> = new Set();
  const linkValues = JSONLinks.map((link) => link);

  for (const value of linkValues) {
    linkSet.add(value);
  }

  let linkSetStrings: string[] = [];
  linkSet.forEach((link) => {
    const linkString = `- ${link!.label!}: ${link.value}`;
    linkSetStrings = [...linkSetStrings, linkString];
  });

  const unique = linkSetStrings.join("\n");
  return unique;
};

export const getSponsors = (sponsors: { name: string; slug: string }[]) => {
  let sponsorLines: string[] = [];
  for (const sponsor of sponsors) {
    const sponsorLine = `- ${sponsor.name}: https://lwj.dev/${sponsor.slug}`;
    sponsorLines = [...sponsorLines, sponsorLine];
  }

  const formattedSponsors = sponsorLines.join("\n");

  return formattedSponsors;
};

export const getCredits = () => {
  return `Watch future episodes live at ${liveLink}

This episode was sponsored by:
${getSponsors(sponsors)}

Live transcription by White Coat Captioning (https://whitecoatcaptioning.com/)
`;
};

export function slugify(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

export const returnPSTString = (date: string) => {
  const JSDate = new Date(date);
  const pstDate = JSDate.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return pstDate;
};
export const returnPSTDate = (date: string, offset?: string) => {
  const offsetZone = DateTime.fromFormat(
    `${date.split(" ")[0]} ${date.split(" ")[1].split(".")[0]}`,
    "yyyy-MM-dd H:mm:ss",
    {
      zone: "America/Los_Angeles",
    }
  ).toFormat("Z")[1];
  if (offset === "two weeks") {
    const dateObj = DateTime.fromFormat(
      `${date.split(" ")[0]} ${date.split(" ")[1].split(".")[0]}`,
      "yyyy-MM-dd H:mm:ss",
      {
        zone: "America/Los_Angeles",
      }
    )
      .minus({ weeks: 2, hours: Number(offsetZone) })
      .toFormat("dd MMM HH:mm")
      .toString();
    return dateObj;
  } else if (offset == "ninety minutes") {
    const dateObj = DateTime.fromFormat(
      `${date.split(" ")[0]} ${date.split(" ")[1].split(".")[0]}`,
      "yyyy-MM-dd H:mm:ss",
      {
        zone: "America/Los_Angeles",
      }
    )
      .minus({ hours: Number(offsetZone), minutes: 90 })
      .toFormat("dd MMM HH:mm")
      .toString();

    return dateObj;
  } else {
    const dateObj = DateTime.fromFormat(
      `${date.split(" ")[0]} ${date.split(" ")[1].split(".")[0]}`,
      "yyyy-MM-dd H:mm:ss",
      {
        zone: "America/Los_Angeles",
      }
    )
      .minus({ hours: Number(offsetZone) })
      .toFormat("dd MMM HH:mm")
      .toString();

    return dateObj;
  }
};

export const returnNZSTString = (date: string) => {
  const JSDate = new Date(date);
  const nzstDate = JSDate.toLocaleString("en-US", {
    timeZone: "Pacific/Auckland",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return nzstDate;
};

export const twoWeekTweet = (description: string, link: string) => {
  const tweet = `📣 Just Scheduled

${description}

Details: ${link}
`;
  return tweet;
};
export const ninetyMinuteTweet = (description: string, link: string) => {
  const tweet = `⚠️ In 90 Minutes

${description}

Details: ${link}
`;
  return tweet;
};
export const liveTweet = (description: string) => {
  const tweet = `🔴 Live

${description}

Watch Live: ${liveLink}
`;
  return tweet;
};

export const captionsBlurb = `*Captions provided by White Coat Captioning (https://whitecoatcaptioning.com/). 
Communication Access Realtime Translation (CART) is provided in order to facilitate
communication accessibility and may not be a totally verbatim record of the proceedings.*`;

export const getHighlightText = (
  tech: string,
  slug: string,
  twitter?: string,
  name?: string
) => {
  if (twitter) {
    return `Did you miss @${twitter} teaching us about ${tech} live on LWJ?
      No worries! Watch highlights from the episode here, then check out the full episode replay https://codetv.dev/series/learn-with-jason/s8/${slug}`;
  }
  return `Did you miss ${name} teaching us about ${tech} live on LWJ?
No worries! Watch highlights from the episode here, then check out the full episode replay https://codetv.dev/series/learn-with-jason/s8/${slug}`;
};
