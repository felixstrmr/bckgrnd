import { create } from 'zustand'

interface State {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useWaitlistModalStore = create<State>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))
