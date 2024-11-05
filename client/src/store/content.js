import { create } from "zustand";

export const useContentStore = create((set)=>({
    contentType : "movie",
    isFetchContent : false,
    setContentLoadingUpdate : (value) => set({ isFetchContent : value}),
    setContentType : (type) => set({contentType : type}),
}))