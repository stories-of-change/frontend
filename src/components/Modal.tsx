import { useHelpStore } from "../state/help";

export default function Modal() {
  const { active, helpText, helpTitle, toggleHelpModal } = useHelpStore();

  return (
    <div
      className={`z-30 h-full bg-green-500 ${active ? "flex items-center justify-center" : "hidden"}`}
    >
      <div className="h-[400px] w-[300px] bg-red-500">
        modal is here
        <p>{helpText}</p>
        <p>{helpTitle}</p>
        <button onClick={toggleHelpModal}>Close Modal</button>
      </div>
    </div>
  );
}
