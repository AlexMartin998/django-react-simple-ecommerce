import { create } from 'zustand';

interface SearchStore {
  searchTerm: string;
  isSearching: boolean;

  setSearchTerm: (term: string) => void;
  setIsSearching: (value: boolean) => void;
}

export const useSearchStore = create<SearchStore>(set => ({
  searchTerm: '',
  isSearching: false,

  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setIsSearching: (value: boolean) => set({ isSearching: value }),
}));
