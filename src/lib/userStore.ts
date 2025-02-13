import { create } from 'zustand'
import { pb } from './pocketbase'

export const useStore = create((set) => ({
  user: null,
  getUser: () =>
    set((state) => {
      if (pb.authStore.isValid) return { user: pb.authStore.record }
    }),
}))
