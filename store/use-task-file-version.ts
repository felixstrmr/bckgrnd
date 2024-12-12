import { TaskFileWithFile } from '@/types/custom'
import { create } from 'zustand'

interface State {
  selectedFile: TaskFileWithFile | null
  setSelectedFile: (file: TaskFileWithFile | null) => void
}

export const useTaskFileVersion = create<State>()((set) => ({
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
}))
