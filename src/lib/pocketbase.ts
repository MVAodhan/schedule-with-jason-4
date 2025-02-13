import PocketBase from 'pocketbase'

const globalForPB = globalThis as unknown as { pb: PocketBase | undefined }

const pb = globalForPB.pb ?? new PocketBase('http://127.0.0.1:8090')

pb.autoCancellation(false)

if (process.env.NODE_ENV !== 'production') globalForPB.pb = pb

export { pb }
