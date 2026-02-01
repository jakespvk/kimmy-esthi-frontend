"use client";

import ServicesCards from '@/components/ui/services_cards'
import { glassAntiqua } from './fonts'
import { ServicesContext } from '@/context/ServicesContext'
import { useContext } from 'react';
import About from './about/about';

export default function Home() {
  const services = useContext(ServicesContext);
  return (
    <>
      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={glassAntiqua.className}>
          <h1 id="signature-facials" className="scroll-mt-18 text-3xl md:text-5xl p-5 md:p-10 bg-linear-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Signature Facials
          </h1>
        </div>

      </div>

      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          {services.signatureFacials.map((service, index) => (
            <ServicesCards key={index} {...service} />
          ))}
        </div>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={glassAntiqua.className}>
          <h1 id="facial-packages" className="scroll-mt-18 text-3xl md:text-5xl p-5 md:p-10 bg-linear-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Facial Packages
          </h1>
        </div>

      </div>

      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          {services.facialPackages.map((service, index) => (
            <ServicesCards key={index} {...service} />
          ))}
        </div>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={glassAntiqua.className}>
          <h1 id="facial-add-ons" className="scroll-mt-18 text-2xl md:text-5xl p-5 md:p-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Facial Add-Ons
          </h1>
        </div>

      </div>
      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          {services.serviceAddOns.map((service, index) => (
            <ServicesCards key={index} {...service} />
          ))}
        </div>
      </div>

      {/*<div className="flex justify-center">
        <h1 className={`headline ${glassAntiqua.className}`}>About SunsetKimcare</h1>
      </div>*/}

      <About />

      <div className="pb-5"></div>
    </>
  )
}
