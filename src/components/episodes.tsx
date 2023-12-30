import { Suspense } from "react";
import MyCard from "./MyCard";
import SuspenseCard from "./SuspenseCard";

const episodes = async () => {
  const res = await fetch("http://localhost:3000/api/episodes", {
    cache: "no-store",
  });
  const episodes = await res.json();

  return (
    <div className="min-h-screen w-4/5 flex flex-col gap-2">
      {episodes.map((episode: any) => (
        <Suspense fallback={<SuspenseCard />} key={episode.id}>
          <MyCard
            title={episode.title}
            description={episode.description}
            id={episode.id}
          />
        </Suspense>
      ))}
    </div>
  );
};

export default episodes;
