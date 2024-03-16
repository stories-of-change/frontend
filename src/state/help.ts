import { create } from "zustand";
import { devtools } from "zustand/middleware";

// what does the redux devtool thingy do? should look into it

// what does this store do?
// keep track of dataset name, emission and timeline (format this better based on data maybe?)
// functions include: change name, change emission level, change timeline

interface HelpState {
  active: boolean;
  helpText: string;
  helpTitle: string;

  setHelpModalActive: () => void;
  toggleHelpModal: () => void;
  changeHelpText: (text: string) => void;
  changeHelpTitle: (title: string) => void;
}

export const useHelpStore = create<HelpState>()(
  devtools(
    (set) => ({
      active: false,
      helpText: "",
      helpTitle: "",

      setHelpModalActive: () =>
        set(() => ({
          active: true,
        })),

      toggleHelpModal: () =>
        set((state) => ({
          active: !state.active,
        })),

      changeHelpText: (text: string) =>
        set(() => ({
          helpText: text,
        })),

      changeHelpTitle: (title: string) =>
        set(() => ({
          helpTitle: title,
        })),
    }),
    { enabled: true }
  )
);
