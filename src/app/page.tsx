"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pb } from "@/lib/pocketbase";
import { returnNZSTString, returnPSTString } from "@/lib/utils";
import { useStore } from "@/lib/zustand-stores";
import { Episode } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskCompletionTicks } from "@/components/checks";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";

export default function Home() {
  const getUser = useStore((state) => state.getUser);
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [reccuring, setReccuring] = useState<Episode | null>(null);

  const router = useRouter();

  const getEpisodes = async () => {
    const episodes = (await pb
      .collection("episodes")
      .getFullList({ sort: "date" })) as unknown as Episode[];

    setEpisodes(episodes);
  };

  const getReccuring = async () => {
    const reccuring = (await pb
      .collection("reccuring")
      .getFullList()) as unknown as Episode[];

    setReccuring(reccuring[0]);
  };

  useEffect(() => {
    getUser();
    getEpisodes();
    getReccuring();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteEpisode = async (id: string) => {
    await pb.collection("episodes").delete(id);
  };

  const createUTCString = (date: string) => {
    // Takes Date from the DatePick and Makes it into a PST Date
    const dateObj = DateTime.fromFormat(date, "dd-MM-yyyy H:mm", {
      zone: "America/Los_Angeles",
    }).toJSDate();

    // Converts PST date to UTC string
    const ustDate = dateObj.toISOString();
    return ustDate;
  };

  const resetEpisode = async () => {
    await pb.collection("reccuring").update(reccuring!.id, {
      calendar: false,
      scheduled_tweet: false,
      ninety_minute_tweet: false,
      live_tweet: false,
      discord: false,
      date: createUTCString("01-01-2025 9:00"),
    });

    router.refresh();
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="mt-10 w-4/5 grid grid-cols-1 lg:w-3/6 gap-5">
        <div className="mb-10">
          {reccuring && (
            <Card>
              <CardHeader className="text-xl font-bold">
                <span className="flex justify-between">
                  {reccuring.title}
                  <div className="flex gap-5">
                    <Link href={`/reccuring/${reccuring.slug}`}>
                      <Button className="bg-transparent text-black hover:bg-transparent">
                        <Pencil />
                      </Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger>
                        <Trash2 className="h-[18px] w-[18px] text-red-600 shadow" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            <div className="flex flex-col gap-2">
                              <span className="text-red-400">Delete</span>
                              <span>{reccuring.title}</span>
                            </div>
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete {reccuring.title}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                          <Button
                            type="button"
                            variant="secondary"
                            className="bg-red-300 hover:bg-red-200 text-black"
                            onClick={() => deleteEpisode(reccuring.id)}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-700" // Tailwind classes applied directly
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            <div className="flex flex-col gap-2">
                              <span className="text-orange-500">Reset</span>
                            </div>
                          </DialogTitle>
                          <DialogDescription>
                            This will reset {reccuring.title}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                          <Button
                            type="button"
                            variant="secondary"
                            className="bg-orange-500 hover:bg-orange-200 text-black"
                            onClick={() => resetEpisode()}
                          >
                            Reset
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </span>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  Guest Name: {reccuring.guest_name}
                  <div className="flex flex-col gap-2">
                    <span>
                      US Date:{" "}
                      {reccuring ? returnPSTString(reccuring!.date) : ""}
                    </span>
                    <span>
                      NZ Date:{" "}
                      {reccuring ? returnNZSTString(reccuring.date) : ""}
                    </span>
                  </div>
                </div>
                {reccuring && <TaskCompletionTicks episode={reccuring} />}
              </CardContent>
            </Card>
          )}
        </div>

        {episodes?.map((episode) => (
          <Card key={episode.id}>
            <CardHeader className="text-xl font-bold">
              <span className="flex justify-between">
                {episode.title}
                <div className="flex gap-5">
                  <Link href={`/edit/${episode.slug}`}>
                    <Button className="bg-transparent text-black hover:bg-transparent">
                      <Pencil />
                    </Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger>
                      <Trash2 className="h-[18px] w-[18px] text-red-600 shadow" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          <div className="flex flex-col gap-2">
                            <span className="text-red-400">Delete</span>
                            <span>{episode.title}</span>
                          </div>
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete {episode.title}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <Button
                          type="button"
                          variant="secondary"
                          className="bg-red-300 hover:bg-red-200 text-black"
                          onClick={() => deleteEpisode(episode.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                Guest Name: {episode.guest_name}
                <div className="flex flex-col gap-2">
                  <span>
                    US Date: {episode ? returnPSTString(episode!.date) : ""}
                  </span>
                  <span>
                    NZ Date: {episode ? returnNZSTString(episode.date) : ""}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
