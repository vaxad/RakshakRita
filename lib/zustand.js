import { create } from "zustand";

const store = create((set) => ({
    language: "en",
    setLanguage: (item) => set((state) => ({ language: item })),
    engArr : [],
    setEngArr: (item) => set((state) => ({ engArr: item }))
}))

export default store