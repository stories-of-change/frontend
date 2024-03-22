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
      className="pointer flex gap-1.5 rounded-3xl border border-[#babfc3] px-4 py-[11.2px] text-base font-medium leading-tight"
    >
      <img src={icon} alt={`header button for ${text}`} />
      <span>{text}</span>
    </button>
  );
}

function SearchIcon() {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.40723 10C4.19823 10 2.40723 8.209 2.40723 6C2.40723 3.791 4.19823 2 6.40723 2C8.61623 2 10.4072 3.791 10.4072 6C10.4072 8.209 8.61623 10 6.40723 10ZM16.1142 14.293L11.2942 9.473C11.9922 8.492 12.4072 7.296 12.4072 6C12.4072 2.687 9.72023 0 6.40723 0C3.09423 0 0.407227 2.687 0.407227 6C0.407227 9.313 3.09423 12 6.40723 12C7.70323 12 8.89923 11.585 9.88023 10.887L14.7002 15.707C14.8952 15.902 15.1512 16 15.4072 16C15.6632 16 15.9192 15.902 16.1142 15.707C16.5052 15.316 16.5052 14.684 16.1142 14.293Z"
        fill="#5C5F62"
      />
    </svg>
  );
}

function Hamburger() {
  return (
    <div className="flex cursor-pointer flex-col gap-[0.2rem]">
      <div className="h-[2px] w-[16px] rounded-[20px] bg-[#5c5f62]"></div>
      <div className="h-[2px] w-[16px] rounded-[20px] bg-[#5c5f62]"></div>
      <div className="h-[2px] w-[16px] rounded-[20px] bg-[#5c5f62]"></div>
    </div>
  );
}

export default function Header() {
  const { toggleHelpModal } = useHelpStore();

  return (
    <div className="z-20 flex h-[70px] items-center justify-between gap-10 bg-white p-6 shadow">
      <span className="flex gap-4">
        <div>
          <img src={logo} alt="stories of change logo" className="h-[30px]" />
        </div>
        <div className="text-sm">Climate Atlas BETA</div>
      </span>

      <span className="flex flex-grow justify-center gap-4">
        <div className="relative flex max-w-[600px] flex-grow">
          <div className="absolute left-0 flex h-full items-center justify-start px-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search stories, organizations and more"
            className="w-full max-w-[600px] rounded-[5px] border-none bg-[#e4e5e7] bg-[url(../assets/search.svg)] px-9 outline-none"
          />
        </div>
        <div
          className="flex flex-row items-center gap-[0.6rem] rounded-[5px] border bg-[#e4e5e7] p-[12.8px] text-base font-medium
        leading-none"
        >
          <Hamburger />
          <p>Menu</p>
        </div>
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
