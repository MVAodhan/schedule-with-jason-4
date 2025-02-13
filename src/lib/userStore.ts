import { create } from 'zustand'
import { pb } from './pocketbase'
import { AuthRecord } from 'pocketbase'

type UserStoreState = { user: AuthRecord | null }

type UserStoreActions = {
  getUser: () => void
  signOut: () => void
}

type UserStore = UserStoreState & UserStoreActions
export const useStore = create<UserStore>((set) => ({
  user: null,
  getUser: () =>
    set(() => {
      const pbUser: AuthRecord = pb.authStore.record
      return { user: pbUser }
    }),
  signOut: () =>
    set(() => {
      pb.authStore.clear()
      return { user: null }
    }),
}))
