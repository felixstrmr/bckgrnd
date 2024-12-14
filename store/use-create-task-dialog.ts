import { create } from 'zustand'

interface State {
  open: boolean
  setOpen: (open: boolean) => void
  statusId: string | null
  setStatusId: (statusId: string | null) => void
}

export const useCreateTaskDialog = create<State>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  statusId: null,
  setStatusId: (statusId) => set({ statusId }),
}))
