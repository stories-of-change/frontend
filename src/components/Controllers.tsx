import { useMapStore } from "../state/map";
import arrow from "../assets/arrow.svg";
import info from "../assets/info.svg";

function DatasetSelector() {
  return (
    <div>
      <div className="absolute m-0 rounded-lg bg-white shadow-sm sm:m-4 sm:my-6">
        <div className="flex h-[58px] w-screen gap-[0.6rem] pl-2 pr-4 pr-4 pt-2 sm:w-[238px]">
          <button>
            <img src={arrow} alt="arrow" />
          </button>
          <div className="flex flex-col">
            <div className="flex text-[10px]">
              <p className="mr-1.5">DATASET</p>
              <p className="font-bold">Temperature</p>
            </div>
            <p className="text-base font-normal">Surface Air Maximum</p>
          </div>
          <button>
            <img src={info} alt="info" />
          </button>
        </div>
      </div>
      {/* <div className="absolute top-[90px] ml-4 flex h-[281px] w-[536px] justify-between bg-white">
        <div>
          <div>HOT WEATHER</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
        </div>
        <div>
          <div>TEMPERATURE</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
        </div>
        <div>
          <div>PRECIPITATION</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
          <div>Cooling Degree Days</div>
        </div>
      </div> */}
    </div>
  );
}

export default function Controllers() {
  // const { dataset, changeDataset } = useMapStore();

  return (
    <div className="absolute z-20 h-full">
      <DatasetSelector />

      <div className="absolute bottom-0 m-4 hidden w-[calc(100vw-50px)] flex-col gap-2 sm:flex lg:w-[calc(100vw-450px)]">
        <div className="flex h-[112px] w-[288px] flex-col self-end bg-white p-[16px] sm:self-start">
          <div className="flex flex-row">
            <div>
              <p className="text-[10px] text-[#fc714a]">GHG EMISSION</p>
              <p className="text-base">Climate Change</p>
            </div>
            <div className="self-end px-3">
              <button>
                <img src={info} alt="info" />
              </button>
            </div>
          </div>
          <div className="mt-2 flex w-full">
            <button className="flex-grow bg-[#fc714a] px-4 py-1.5 text-white">
              Less
            </button>
            <button className="flex-grow bg-[#f4f4f4] px-4 py-1.5">More</button>
          </div>
        </div>
        <div className="flex h-[92px] w-full items-center self-end bg-white p-6 sm:self-start">
          <div className="flex flex-grow">
            <div>
              <p className="text-[10px] text-[#fc714a]">Temperature</p>
              <p>Time Period</p>
            </div>
            <div className="ml-2 mt-4">
              <button className="h-[16px] w-[16px]">
                <img src={info} alt="info" />
              </button>
            </div>
          </div>
          <div className="flex-grow">
            <button className="h-[75%] w-full bg-[#fc714a] p-4 text-left text-[9px] text-white shadow-md">
              RECENT PAST <span className="block text-base">1995-2014</span>
            </button>
          </div>
          <div className="flex-grow">
            <button className="h-[75%] w-full bg-[#f4f4f4] p-4 text-left text-[9px] shadow-md">
              IMMEDIATE FUTURE{" "}
              <span className="block text-base">2020-2039</span>
            </button>
          </div>
          <div className="flex-grow">
            <button className="h-[75%] w-full bg-[#f4f4f4] p-4 text-left text-[9px] shadow-md">
              NEAR FUTURE <span className="block text-base">2040-2059</span>
            </button>
          </div>
          <div className="flex-grow">
            <button className="h-[75%] w-full bg-[#f4f4f4] p-4 text-left text-[9px] shadow-md">
              MID CENTURY FUTURE{" "}
              <span className="block text-base">2060-2079</span>
            </button>
          </div>
          <div className="flex-grow">
            <button className="h-[75%] w-full bg-[#f4f4f4] p-4 text-left text-[9px] shadow-md">
              LATE CENTURY FUTURE{" "}
              <span className="block text-base">2080-2099</span>
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[100px] right-0 mr-2 flex flex-col sm:hidden">
        <button className="rounded-[131.5px] border bg-white px-4 py-3 text-[12px]">
          GHG EMISSIONS
        </button>
      </div>
      <div className="fixed bottom-[50px] right-0 mr-2 flex flex-col sm:hidden">
        <button className="rounded-[131.5px] border bg-white px-4 py-3 text-[12px]">
          TIME PERIOD
        </button>
      </div>
    </div>
  );
}
