import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center w-full h-24 px-10 shadow-md  z-10">
        <Image src="/images/logo.svg" alt="" width={200} height={200} />
        <div className="flex justify-center items-center gap-3">
          <Link href="/get-started">
            <Button className="bg-primary text-white rounded-xl px-9 py-5">
              Start Free
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
}
