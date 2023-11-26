import { create } from "zustand";

const store = create((set) => ({
    language: "en",
    setLanguage: (item) => set((state) => ({ language: item })),
    prevLanguage: "en",
    setPrevLanguage: (item) => set((state) => ({ prevLanguage: item })),
    engArr : [],
    setEngArr: (item) => set((state) => ({ engArr: item }))
}))

export default store