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

      <div className="w-full flex items-center md:justify-center">
        <div className="mt-1 mb-5 md:my-10">

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className={fraunces.className + " w-fit flex justify-center items-center border-b"}>
                    <Link href="/">
                      <h1 id="mainTitle" className="text-3xl md:text-7xl text-transparent bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 hover:bg-gradient-to-l inline-block bg-clip-text">
                        {text}
                      </h1>
                    </Link>
                  </div>
                </NavigationMenuTrigger>
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
