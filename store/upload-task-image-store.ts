import { create } from 'zustand'

interface State {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

export const useUploadTaskImageStore = create<State>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
}))
