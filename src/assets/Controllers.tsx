import { useMapStore } from "../state/map";
import arrow from "../assets/arrow.svg";
import info from "../../assets/info.svg";

export default function Controllers() {
  // const { dataset, changeDataset } = useMapStore();

  return (
    <div className="absolute z-20 h-full justify-between font-urbanist ">
      <div className="absolute m-4 rounded-s-lg bg-white shadow-sm">
        <div className="flex h-[58px] w-screen gap-[0.6rem] p-4 sm:w-[238px]">
          <button>
            <img src={arrow} alt="arrow" />
          </button>
          <span className="flex flex-col">
            <span className="flex text-[10px]">
              <p className="mr-1.5">DATASET</p>
              <p className="font-bold">Temperature</p>
            </span>
            <p className="text-base font-normal">Surface Air Maximum</p>
          </span>
          <p>i</p>
        </div>
      </div>
      <div className="w-sceen absolute bottom-0 flex w-screen flex-col sm:w-48">
        <div className="self-end bg-green-400 sm:self-start">
          ghg emmissions
        </div>
        <div className="self-end bg-green-400 sm:self-start">
          timeline selector
        </div>
      </div>
    </div>
  );
}
