import { asc } from "drizzle-orm"
import { db } from "../../../../drizzle/db"
import episodes from "@/components/episodes"

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export async function GET(){
    const data = await db.query.episodes.findMany({
        orderBy: (episodes, {asc}) => [asc(episodes.id)]
    })
    return Response.json(data)
}