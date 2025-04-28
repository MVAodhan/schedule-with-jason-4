import { Card, CardContent, CardHeader } from "./ui/card";
import { Episode } from "@/types";
import { Textarea } from "./ui/textarea";
import { returnNZSTString, returnPSTString } from "@/lib/utils";

import { Button } from "./ui/button";
import { pb } from "@/lib/pocketbase";
import { useToast } from "@/hooks/use-toast";
import Title from "./title";
import { Clipboard } from "lucide-react";
import { Input } from "./ui/input";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const Streamyard = ({ episode }: { episode: Episode }) => {
  const ytLinkRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const updateYoutubeLink = async () => {
    if (ytLinkRef.current?.value !== null) {
      await pb.collection("recurring").update(episode.id, {
        youtube_link: ytLinkRef.current!.value,
      });

      router.push("/");
    }
  };
  const { toast } = useToast();
  return (
    <Card>
      <CardHeader>
        <Title episode={episode} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Textarea defaultValue={episode.description} />
            <Clipboard
              onClick={() => {
                navigator.clipboard.writeText(episode.description);
                toast({
                  title: "Copied description",
                });
              }}
            />
          </div>
          <div className="flex w-full gap-2  py-5 justify-around">
            <div>
              <div className="font-semibold italic text-md">NZ Date</div>
              <div>{returnNZSTString(episode.date)}</div>
            </div>
            <div>
              <div className="font-semibold italic text-md">US Date</div>
              <div>{returnPSTString(episode.date)}</div>
            </div>
          </div>
          <div className="w-full">
            <div>Youtube Link</div>
            <Input defaultValue={episode.youtube_link} ref={ytLinkRef} />
          </div>
          <Button
            className="w-full"
            onClick={() => {
              updateYoutubeLink();
            }}
          >
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Streamyard;
