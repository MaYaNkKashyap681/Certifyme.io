import {create} from 'zustand'

interface FileStore {
  file: string | null;
  setFile: (file: string | null) => void;
}

const useFile = create<FileStore>((set) => ({
  file: null,
  setFile: (file: string | null) => set({ file }),
}));

export { useFile };