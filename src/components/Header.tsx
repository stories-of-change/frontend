import logo from "../assets/logo.svg";
import support from "../assets/support.svg";
import guide from "../assets/guide.svg";
import share from "../assets/share.svg";

import { useHelpStore } from "../state/help";

function HeaderButton({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="pointer flex gap-2 rounded-3xl border border-[#babfc3] px-4 py-3 text-base font-medium "
    >
      <img src={icon} alt={`header button for ${text}`} />
      <span>{text}</span>
    </button>
  );
}

export default function Header() {
  const { toggleHelpModal } = useHelpStore();

  return (
    <div className="z-20 flex h-[70px] items-center justify-between bg-white p-6 font-urbanist shadow">
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

      <span className="hidden gap-4 lg:flex">
        <div>
          <HeaderButton text="Support" icon={support} />
        </div>
        <div>
          <HeaderButton text="Guide" icon={guide} onClick={toggleHelpModal} />
        </div>
        <div>
          <HeaderButton text="Share" icon={share} />
        </div>
      </span>
    </div>
  );
}
