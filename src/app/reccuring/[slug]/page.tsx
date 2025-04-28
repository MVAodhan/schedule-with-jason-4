"use client";

import Edit from "@/components/edit-episode-reccuring";
import { pb } from "@/lib/pocketbase";
import { Episode } from "@/types";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useLinkStore } from "@/lib/zustand-stores";

import Caldendar from "@/components/caldendar-recurring";
import Buffer from "@/components/buffer-recurring";

import CopyText from "@/components/copy-text-recurring";
import Discord from "@/components/discord-recurring";

import Streamyard from "@/components/streamyard-recurring";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [slug, setSlug] = useState<string>("");
  const [episode, setEpisode] = useState<Episode | null>(null);

  const setLinks = useLinkStore((state) => state.setLinks);

  const getSlug = async () => {
    const slug = (await params).slug;
    setSlug(slug);
  };

  const getEpisode = async () => {
    if (!slug) return;
    const episode = (await pb
      .collection("reccuring")
      .getFirstListItem(`slug="${slug}"`)) as unknown as Episode;
    setEpisode(episode);
  };

  useEffect(() => {
    getSlug();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!slug) return;
    getEpisode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (!episode || episode?.links === null) return;
    setLinks(episode.links!);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode]);

  return (
    <main className="h-full w-screen flex justify-center py-10">
      {episode && (
        <Tabs defaultValue="edit" className="w-[600px] ">
          <TabsList className="flex bg-transparent">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="streamyard">Streamyard</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="buffer">Buffer</TabsTrigger>
            <TabsTrigger value="discord">Discord</TabsTrigger>
            <TabsTrigger value="copy-btns">Copy Text</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Edit episode={episode} />
          </TabsContent>
          <TabsContent value="streamyard">
            <Streamyard episode={episode} />
          </TabsContent>
          <TabsContent value="calendar">
            <Caldendar episode={episode} />
          </TabsContent>
          <TabsContent value="buffer">
            <Buffer episode={episode} />
          </TabsContent>
          <TabsContent value="copy-btns">
            <CopyText episode={episode} links={episode.links} />
          </TabsContent>

          <TabsContent value="discord">
            <Discord episode={episode} />
          </TabsContent>
        </Tabs>
      )}
    </main>
  );
};

export default Page;
