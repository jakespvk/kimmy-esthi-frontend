"use client";
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
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react";

const fraunces = Glass_Antiqua({ weight: '400', subsets: ['latin'] })

const Headline = ({ text }: { text: string }) => {
  const router = useRouter();
  return (
    <>

      <div className="block m-2 mb-5 lg:mb-10">
        <div className="w-full flex relative">
          <div className="ml-2 lg:mx-auto flex justify-center">
            <div className={fraunces.className + " border-b"}>
              <Button className="appearance-none p-0 bg-transparent border-0 shadow-none h-fit w-fit" onClick={() => router.back()}>
                <ChevronLeftIcon />
                <h1 id="mainTitle" className="text-3xl lg:text-7xl text-transparent bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 hover:bg-gradient-to-l inline-block bg-clip-text">
                  {text}
                </h1>
              </Button>
            </div>
          </div>

          <NavigationMenu className="lg:absolute lg:top-2 lg:right-2 ml-auto">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="pr-5 m-0" />
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
                  <Link href="/faq">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>FAQ</NavigationMenuLink>
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
