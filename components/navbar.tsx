"use client";

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { glassAntiqua, msMadi } from "../app/fonts";
import {
  useEffect,
  useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [largeScreen, setLargeScreen] = useState(false);

  function handleScroll() {
    setScrolled(window.scrollY === 0 ? false : true);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setLargeScreen(window.matchMedia('(min-width: 1024px)').matches);
  }, []);


  return (
    <div className={`sticky top-0 z-100 bg-popover py-4 px-8 flex justify-between items-start w-full ${scrolled && "shadow-md border-b border-b-muted"}`}>
      <div className={glassAntiqua.className + ' flex flex-wrap items-center justify-start'}>
        <h1 className="text-2xl lg:text-3xl headline-gradient p-0 m-0 mr-3">SunsetKimcare</h1>
        <p className={`${msMadi.className} text-lg lg:text-2xl p-0 m-0 text-muted-foreground`}>
          Let me make something clear... your skin
        </p>
      </div>
      <div className="flex items-center justify-end">
        {largeScreen ? <DesktopNavMenu /> : <MobileNavMenu />}
      </div>
    </div>
  )
}

function MobileNavMenu() {
  const [open, setOpen] = useState(false);

  function scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger><Menu /></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96 max-w-[75vw]">
              <NavigationMenuItem>
                <Collapsible open={open} onOpenChange={setOpen}>
                  <CollapsibleTrigger className={navigationMenuTriggerStyle()}>
                    Services
                    <ChevronDown className="ml-1 transition duration-300 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180" size={12} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="pl-4">
                      <ListItem href="/#signature-facials" title="Signature Facials">
                        Our curated selection of facial treatments.
                      </ListItem>
                      <ListItem href="/#facial-packages" title="Facial Packages">
                        Tailored package deals for the most bang for your buck.
                      </ListItem>
                      <ListItem href="/#facial-add-ons" title="Add-ons">
                        Add-ons to enhance and customize your treatment experience.
                      </ListItem>
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </NavigationMenuItem>
              <ListItem href="/#about" title="About">
              </ListItem>
              <ListItem href="/#socials" title="Socials">
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu >
  )
}

function DesktopNavMenu() {

  function scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/#signature-facials" title="Signature Facials">
                Our curated selection of facial treatments.
              </ListItem>
              <ListItem href="/#facial-packages" title="Facial Packages">
                Tailored package deals for the most bang for your buck.
              </ListItem>
              <ListItem href="/#facial-add-ons" title="Add-ons">
                Add-ons to enhance and customize your treatment experience.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/#about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/#socials">Socials</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
