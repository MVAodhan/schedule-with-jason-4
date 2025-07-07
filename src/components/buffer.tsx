"use client";

import { Episode } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Clipboard } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  liveTweet,
  ninetyMinuteTweet,
  returnPSTDate,
  twoWeekTweet,
} from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { pb } from "@/lib/pocketbase";
import Title from "./title";
import { Label } from "./ui/label";

const Buffer = ({ episode }: { episode: Episode }) => {
  const bufferDescRef = useRef<HTMLTextAreaElement>(null);

  const [twTweet, setTwTweet] = useState(episode.scheduled_tweet);
  const [nmTweet, setNmTweet] = useState(episode.ninety_minute_tweet);
  const [lTweet, setLTweet] = useState(episode.live_tweet);
  const [twSkeet, setTwSkeet] = useState(episode.scheduled_tweet_bs);
  const [nmSkeet, setNmSkeet] = useState(episode.ninety_minute_tweet_bs);
  const [lSkeet, setLSkeet] = useState(episode.live_tweet_bs);

  const updateStatuses = async () => {
    await pb.collection("episodes").update(episode!.id, {
      scheduled_tweet: twTweet,
      ninety_minute_tweet: nmTweet,
      live_tweet: lTweet,
      scheduled_tweet_bs: twSkeet,
      ninety_minute_tweet_bs: nmSkeet,
      live_tweet_bs: lSkeet,
    });
  };
  return (
    <Card>
      <CardHeader>
        <Title episode={episode} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col py-2 gap-2">
          <div>Buffer Description</div>
          {episode.guest_twitter && (
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(episode.guest_twitter!)
              }
            >
              <Clipboard />
              Guest Twitter Handel
            </Button>
          )}
          <div className="flex items-center">
            <Textarea defaultValue={episode.description} ref={bufferDescRef} />
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  bufferDescRef.current?.value as string
                )
              }
            >
              <Clipboard />
            </Button>
          </div>

          {episode.youtube_link && (
            <div>
              <Label>Bluesky Skeets</Label>
              <div className="grid grid-cols-3 gap-5 py-5">
                <div className="flex flex-col justify-center gap-2">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        twoWeekTweet(episode.description, episode.youtube_link)
                      );
                      toast({
                        title: "Copied Two Week Tweet",
                      });
                    }}
                  >
                    <Clipboard />
                    Two Weeks
                  </Button>
                  <div className="flex justify-center">
                    {returnPSTDate(episode.date, "two weeks")}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        ninetyMinuteTweet(
                          episode.description,
                          episode.youtube_link
                        )
                      );
                      toast({
                        title: "Copied Ninety Minute Tweet",
                      });
                    }}
                  >
                    <Clipboard />
                    Ninety Munutes
                  </Button>
                  <div className="flex justify-center">
                    {returnPSTDate(episode.date, "ninety minutes")}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        liveTweet(episode.description)
                      );
                      toast({
                        title: "Copied Live Tweet",
                      });
                    }}
                  >
                    <Clipboard />
                    Live
                  </Button>
                  <div className="flex justify-center">
                    {returnPSTDate(episode.date)}
                  </div>
                </div>
                <div className="flex justify-around">
                  <div>Two Weeks</div>
                  <Checkbox
                    defaultChecked={twTweet}
                    onCheckedChange={() => setTwTweet((prev) => !prev)}
                  />
                </div>
                <div className="flex justify-around">
                  <div>Ninety Minutes</div>
                  <Checkbox
                    defaultChecked={nmTweet}
                    onCheckedChange={() => setNmTweet((prev) => !prev)}
                  />
                </div>
                <div className="flex justify-around">
                  <div>Live</div>
                  <Checkbox
                    defaultChecked={lTweet}
                    onCheckedChange={() => setLTweet((prev) => !prev)}
                  />
                </div>
              </div>
              <Label>Bluesky Skeets</Label>
              <div className="grid grid-cols-3 gap-5 py-5">
                <div className="flex justify-around">
                  <div>Two Weeks </div>
                  <Checkbox
                    defaultChecked={twSkeet}
                    onCheckedChange={() => setTwSkeet((prev) => !prev)}
                  />
                </div>
                <div className="flex justify-around">
                  <div>Ninety Minutes </div>
                  <Checkbox
                    defaultChecked={nmSkeet}
                    onCheckedChange={() => setNmSkeet((prev) => !prev)}
                  />
                </div>
                <div className="flex justify-around">
                  <div>Live </div>
                  <Checkbox
                    defaultChecked={lSkeet}
                    onCheckedChange={() => setLSkeet((prev) => !prev)}
                  />
                </div>
                <Button className="w-full col-span-3" onClick={updateStatuses}>
                  Update Bluesky & Twitter Status
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Buffer;
