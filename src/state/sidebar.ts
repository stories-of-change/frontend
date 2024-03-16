import { create } from "zustand";

// what does the redux devtool thingy do? should look into it

// what does this store do?
// keep track of dataset name, emission and timeline (format this better based on data maybe?)
// functions include: change name, change emission level, change timeline

interface SidebarState {
  active: boolean;
  currentTab: string;

  setSidebarActive: () => void;
  toggleSidebar: () => void;
  changeSidebarTab: (tab: string) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  active: false,
  currentTab: "stories",

  setSidebarActive: () =>
    set(() => ({
      active: true,
    })),

  toggleSidebar: () =>
    set((state) => ({
      active: !state.active,
    })),

  changeSidebarTab: (tab: string) =>
    set(() => ({
      currentTab: tab,
    })),
}));
