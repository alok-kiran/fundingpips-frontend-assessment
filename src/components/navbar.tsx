import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center md:px-32">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button variant={'secondary'}>
            <Link href="/stocks">
              About
            </Link>
          </Button>
          <Button >
            <Link href="https://fundingpips.com/" target='_blank'>
              Community
            </Link>
          </Button>
        </div>
        
      </div>
    </div>
  );
};