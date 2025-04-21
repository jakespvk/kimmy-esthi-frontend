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

      <div className="w-full flex items-center justify-center">
        <div className="my-10">


          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className={fraunces.className}>
                    <Link href={text == "About SunsetKimcare" ? "/" : "/about"}>
                      <h1 id="mainTitle" className="text-7xl p-2 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 hover:bg-gradient-to-l inline-block text-transparent bg-clip-text">
                        {text}
                      </h1>
                    </Link>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Link href="/about">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>About Us / Services</NavigationMenuLink>
                  </Link>
                  <Link href="/social">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Social
                    </NavigationMenuLink>
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
