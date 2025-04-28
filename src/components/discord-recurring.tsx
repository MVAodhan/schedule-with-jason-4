import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { liveLink, returnNZSTString } from "@/lib/utils";
import { Clipboard } from "lucide-react";
import { Episode } from "@/types";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { pb } from "@/lib/pocketbase";
import { useToast } from "@/hooks/use-toast";

const Discord = ({ episode }: { episode: Episode }) => {
  const { toast } = useToast();
  const [discordChecked, setDiscordChecked] = useState(false);

  const updateDiscordStatus = async () => {
    await pb.collection("reccuring").update(episode!.id, {
      discord: discordChecked,
    });
    toast({
      title: "Updated Discord Status",
    });
  };

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center ">
            <div className="">{`${episode.title}`}</div>
            <Button variant="ghost">
              <Clipboard
                onClick={() => {
                  navigator.clipboard.writeText(episode.title);
                  toast({
                    title: "Copied Title",
                  });
                }}
              />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="">Location</div>
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(liveLink);
                toast({
                  title: "Copied location",
                });
              }}
            >
              <Clipboard />
            </Button>
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="date" className="text-md ">
              Date (NZST)
            </Label>

            <div>{returnNZSTString(episode.date)}</div>
            {/* <DatePicker date={date!} setDate={setDate} /> */}
          </div>

          <div className="space-y-2">
            <Textarea value={episode.description} className="w-full" readOnly />
          </div>
          <div>
            <div>Scheduled</div>
            <Checkbox
              defaultChecked={discordChecked}
              onCheckedChange={() => setDiscordChecked((prev) => !prev)}
            />
          </div>
          <Button onClick={updateDiscordStatus}>Update Discord Status</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Discord;
