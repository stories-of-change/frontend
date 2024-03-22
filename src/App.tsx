import Header from "./components/Header";
import Modal from "./components/Modal";
import Controllers from "./components/Controllers";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

import { useSidebarStore } from "./state/sidebar";

function App() {
  const { active } = useSidebarStore();

  return (
    <div className="flex h-screen flex-col font-urbanist">
      <Header />
      <div className="relative h-full max-h-[calc(100%-70px)] w-full">
        <div className="relative z-10 flex h-full flex-grow border-blue-400">
          <div className="relative h-full flex-grow bg-white">
            <Modal />
            <Controllers />
            <Map />
          </div>
          <div className="hidden h-full w-[400px] lg:flex">
            <Sidebar />
          </div>
        </div>
        <div
          className={`fixed z-20 flex h-full w-full duration-300 ease-in-out lg:hidden 
            ${active ? "mt-[75px] -translate-y-full" : ""}`}
        >
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
