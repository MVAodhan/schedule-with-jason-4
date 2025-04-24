"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Episode } from "@/types";

import { returnNZSTString, returnPSTString } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { DateTime } from "luxon";
import { pb } from "@/lib/pocketbase";
import { redirect } from "next/navigation";

const Edit = ({ episode }: { episode: Episode }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const guestNameRef = useRef<HTMLInputElement | null>(null);
  const guestTwitterRef = useRef<HTMLInputElement | null>(null);

  const [date, setDate] = useState<Date | unknown>(
    DateTime.fromISO(
      `${episode.date.split(" ")[0]}T${episode.date.split(" ")[1]}`
    )
  );
  const [time, setTime] = useState<string>("");
  const [editDate, setEditDate] = useState<boolean>(false);

  const createUTCString = (date: Date, time: string) => {
    // Takes Date from the DatePick and Makes it into a PST Date
    const dateObj = DateTime.fromFormat(
      `${date.toLocaleDateString().replaceAll("/", "-")} ${time}`,
      "dd-MM-yyyy H:mm",
      {
        zone: "America/Los_Angeles",
      }
    ).toJSDate();

    // Converts PST date to UTC string
    const ustDate = dateObj.toISOString();
    return ustDate;
  };

  const updateEpisode = async (date: string) => {
    await pb.collection("reccuring").update(episode.id, {
      date: date,
    });
    redirect("/");
  };

  useEffect(() => {
    titleRef.current!.value = episode.title;

    descriptionRef.current!.value = episode.description;
    guestNameRef.current!.value = episode.guest_name;
    if (episode.guest_twitter) {
      guestTwitterRef.current!.value = episode.guest_twitter;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Input
                id="title"
                ref={titleRef}
                placeholder="Episode title"
                className="w-full"
              />
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
            <div className="space-y-2 ">
              <Label className="text-md font-bold">Date (PST)</Label>
              <div>{returnPSTString(episode.date)}</div>
              {/* <DatePicker date={date!} setDate={setDate} /> */}
            </div>
            <div>
              <Label className="text-md font-bold">Date (NZST)</Label>
              <div>{returnNZSTString(episode.date)}</div>
            </div>
            <div className="col-start-1">
              <div>
                <Switch
                  id="date-edit"
                  checked={editDate}
                  onCheckedChange={() => {
                    setEditDate((prev) => !prev);
                  }}
                />
                <div className="flex flex-col gap-2 pt-2">
                  <Label htmlFor="date-edit"> Edit Date</Label>
                  <span className="text-xs italic">Enter as PST Time</span>
                </div>
              </div>
            </div>
            {editDate && (
              <div className="col-start-1 w-full flex gap-2">
                <div className="flex flex-col">
                  <Label className="text-md font-bold">Date</Label>
                  <DatePicker
                    date={date as unknown as Date}
                    setDate={setDate}
                  />
                </div>
                <div>
                  <Label className="text-md font-bold">Time</Label>
                  <Select
                    onValueChange={(e) => {
                      setTime(e);
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
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-md font-bold">
              Description
            </Label>
            <Textarea
              id="description"
              ref={descriptionRef}
              placeholder="Episode description"
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              const utc = createUTCString(date as Date, time);
              updateEpisode(utc);
              // const date = DateTime.fromISO();
            }}
          >
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Edit;
