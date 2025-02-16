import { ChevronDown, UserCircle } from "lucide-react";

export default function Header({ pageName, username }) {
  return (
    <>
      <div className="w-full h-auto grid grid-cols-2 items-center">
        <div className="w-full">
          <h1 className="font-bold">{pageName}</h1>
        </div>
        <div className="w-full h-auto flex items-center justify-end gap-2">
          <UserCircle className="w-6 h-6" />
          <span className="text-sm font-medium">{username}</span>
          <ChevronDown className="w-4" />
        </div>
      </div>
    </>
  );
}
