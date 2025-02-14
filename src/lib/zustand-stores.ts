import { create } from 'zustand'
import { pb } from './pocketbase'
import { AuthRecord } from 'pocketbase'
import { ListLink } from '@/types'

import { nanoid } from 'nanoid'

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

type LinkStoreState = { links: ListLink[] }

type LinkStoreActions = {
  addLink: (label: string, value: string) => void
  deleteLink: (id: string) => void
  setLinks: (links: ListLink[]) => void
}

type LinkStore = LinkStoreState & LinkStoreActions

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  addLink: (label, value) =>
    set((state: LinkStoreState) => {
      return {
        links: [
          ...state.links,
          {
            id: nanoid(),
            label,
            value,
          },
        ],
      }
    }),
  deleteLink: (id: string) =>
    set((state: LinkStoreState) => {
      const newLinks = state.links.filter((link) => {
        if (link.id != id) return link
      })
      return { links: newLinks }
    }),
  setLinks: (links) => set({ links: links }),
}))
