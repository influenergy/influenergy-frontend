import { UserNav } from "./UserNav";

export default function Header() {
  return (
    <div className="flex h-16 items-center px-4 border-b bg-white">
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
      </div>
    </div>
  );
}
