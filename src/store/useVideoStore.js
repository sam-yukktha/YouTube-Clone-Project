import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useVideoStore = create(
  persist(
    (set) => ({
      videos: [],
      loading: false,
      searchQuery: "",
      category: "All",
      theme: "dark",

      // Auth state
      isLoggedIn: false,
      user: null,
      accessToken: null,

      // App state
      subscriptions: [],
      likedVideos: [],
      watchLater: [],
      history: [],

      setVideos: (data) => set({ videos: data }),
      setLoading: (status) => set({ loading: status }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setCategory: (cat) => set({ category: cat, searchQuery: "" }),

      login: (userData, token) => set({
        isLoggedIn: true,
        user: userData,
        accessToken: token
      }),
      logout: () => set({ isLoggedIn: false, user: null, accessToken: null }),

      toggleSubscription: (channelId) => set((state) => {
        const isSubscribed = state.subscriptions.includes(channelId);
        const newSubs = isSubscribed
          ? state.subscriptions.filter(id => id !== channelId)
          : [...state.subscriptions, channelId];
        return { subscriptions: newSubs };
      }),

      toggleLike: (video) => set((state) => {
        const videoId = video.id.videoId || video.id;
        const isLiked = state.likedVideos.some(v => (v.id.videoId || v.id) === videoId);
        if (isLiked) {
          return { likedVideos: state.likedVideos.filter(v => (v.id.videoId || v.id) !== videoId) };
        } else {
          return { likedVideos: [video, ...state.likedVideos] };
        }
      }),

      toggleWatchLater: (video) => set((state) => {
        const videoId = video.id.videoId || video.id;
        const isAdded = state.watchLater.some(v => (v.id.videoId || v.id) === videoId);
        if (isAdded) {
          return { watchLater: state.watchLater.filter(v => (v.id.videoId || v.id) !== videoId) };
        } else {
          return { watchLater: [video, ...state.watchLater] };
        }
      }),

      addToHistory: (video) => set((state) => {
        const videoId = video.id.videoId || video.id;
        const filteredHistory = state.history.filter(v => (v.id.videoId || v.id) !== videoId);
        return { history: [video, ...filteredHistory].slice(0, 50) };
      }),

      language: "English (US)",
      location: "United States",

      setLanguage: (lang) => set({ language: lang }),
      setLocation: (loc) => set({ location: loc }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'youtube-clone-storage',
      partialize: (state) => ({
        likedVideos: state.likedVideos,
        watchLater: state.watchLater,
        history: state.history,
        subscriptions: state.subscriptions,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        accessToken: state.accessToken,
        theme: state.theme,
        language: state.language,
        location: state.location
      }),
    }
  )
);
