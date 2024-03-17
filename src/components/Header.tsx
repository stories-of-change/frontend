import logo from "../assets/logo.svg";
import support from "../assets/support.svg";
import guide from "../assets/guide.svg";
import share from "../assets/share.svg";

function HeaderButton({ text, icon }: { text: string; icon: string }) {
  return (
    <button className="pointer flex gap-2 rounded-3xl border border-[#babfc3] px-4 py-3 text-base font-medium ">
      <img src={icon} alt={`header button for ${text}`} />
      <span>{text}</span>
    </button>
  );
}

export default function Header() {
  return (
    <div className="font-urbanist flex h-[70px] items-center justify-between bg-white p-6 shadow">
      <span className="flex gap-4">
        <div className="h-[30px]">
          <img src={logo} alt="stories of change logo" />
        </div>
        <div>Climate Atlas BETA</div>
      </span>

      <span className="flex gap-4">
        <div>search bar</div>
        <div>menu btn</div>
      </span>

      <span className="flex gap-4">
        <div>
          <HeaderButton text="Support" icon={support} />
        </div>
        <div>
          <HeaderButton text="Guide" icon={guide} />
        </div>
        <div>
          <HeaderButton text="Share" icon={share} />
        </div>
      </span>
    </div>
  );
}
