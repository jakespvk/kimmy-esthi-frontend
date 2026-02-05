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
          <h1 id="signature-facials" className="subheading">
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
          <h1 id="facial-packages" className="subheading">
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
          <h1 id="facial-add-ons" className="subheading">
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
