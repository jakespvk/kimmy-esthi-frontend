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

const fraunces = Glass_Antiqua({ weight: '400', subsets: ['latin'] })

const Headline = ({ text }: { text: string }) => {

  return (
    <>

      <div className="block m-2 mb-5 md:mb-10">
        <div className="w-full flex relative">
          <div className="ml-2 md:mx-auto flex justify-center">
            <div className={fraunces.className + " border-b"}>
              <Link href="/">
                <h1 id="mainTitle" className="text-3xl md:text-7xl text-transparent bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 hover:bg-gradient-to-l inline-block bg-clip-text">
                  {text}
                </h1>
              </Link>
            </div>
          </div>

          <NavigationMenu className="md:absolute md:top-2 md:right-2 ml-auto flex-none justify-end">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="p-5 m-0" />
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
      </div>

    </>
  )
}

export default Headline
