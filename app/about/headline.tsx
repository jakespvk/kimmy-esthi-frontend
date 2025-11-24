import Link from "next/link"
import React from 'react'
import { Glass_Antiqua } from 'next/font/google'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu } from 'lucide-react';

const fraunces = Glass_Antiqua({ weight: '400', subsets: ['latin'] })

const Headline = ({ text }: { text: string }) => {

  return (
    <>

      <div className="w-full flex md:justify-center items-center mt-1 mb-5 mx-2 md:my-10">

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <div className="flex w-full justify-center items-center">
                <div className={fraunces.className + " border-b"}>
                  <Link href="/">
                    <h1 id="mainTitle" className="text-3xl md:text-7xl text-transparent bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 hover:bg-gradient-to-l inline-block bg-clip-text">
                      {text}
                    </h1>
                  </Link>
                </div>
                <div className="ml-auto relative float-right right-0 top-0">
                  <NavigationMenuTrigger className="m-0 p-2" />
                </div>
              </div>
              <NavigationMenuContent>
                <Link href="/about">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About Us</NavigationMenuLink>
                </Link>
                <Link href="/services">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Services</NavigationMenuLink>
                </Link>
                <Link href="/policies">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Policies</NavigationMenuLink>
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

      </div>

    </>
  )
}

export default Headline
