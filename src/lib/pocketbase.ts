import PocketBase from 'pocketbase'

const globalForPB = globalThis as unknown as { pb: PocketBase | undefined }

const pb = globalForPB.pb ?? new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

pb.autoCancellation(false)

if (process.env.NODE_ENV !== 'production') globalForPB.pb = pb

export { pb }
