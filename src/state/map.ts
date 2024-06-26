import { create } from "zustand";

// what does the redux devtool thingy do? should look into it

// what does this store do?
// keep track of dataset name, emission and timeline (format this better based on data maybe?)
// functions include: change name, change emission level, change timeline

interface MapState {
  districtId: string | null;
  dataset: string;
  emission: string;
  timeline: string;

  changeDistrictId: (districtId: string) => void;
  changeDataset: (name: string) => void;
  changeEmission: (emission: string) => void;
  changeTimeline: (timeline: string) => void;
}

export const useMapStore = create<MapState>()((set) => ({
  districtId: null,
  dataset: "tasmax",
  emission: "ssp245",
  timeline: "1995-2014",

  changeDistrictId: (districtId: string) =>
    set(() => ({
      districtId: districtId,
    })),

  changeDataset: (dataset: string) =>
    set(() => ({
      dataset: dataset,
    })),

  changeEmission: (emission: string) =>
    set(() => ({
      emission: emission,
    })),

  changeTimeline: (timeline: string) =>
    set(() => ({
      timeline: timeline,
    })),
}));
