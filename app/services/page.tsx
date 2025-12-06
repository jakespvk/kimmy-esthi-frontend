import ServicesCards from './services_cards'
import Headline from '../about/headline'
import { glassAntiqua } from '../fonts'
import { signatureFacials, facialPackages, serviceAddOns } from './services'

export default function ServicesPage() {
  return (
    <>
      <Headline text="SunsetKimcare Services" />
      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={glassAntiqua.className}>
          <h1 id="mainTitle" className="text-2xl md:text-5xl md:pt-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Signature Facials
          </h1>
          <h3 className="text-xl md:text-3xl md:mb-6">Select a facial:</h3>
        </div>

      </div>

      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          {signatureFacials.map((service, index) => (
            <ServicesCards key={index} {...service} />
          ))}
        </div>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={glassAntiqua.className}>
          <h1 id="mainTitle" className="text-2xl md:text-5xl p-5 md:p-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Facial Packages
          </h1>
        </div>

      </div>

      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          {facialPackages.map((service, index) => (
            <ServicesCards key={index} {...service} />
          ))}
        </div>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={glassAntiqua.className}>
          <h1 id="mainTitle" className="text-2xl md:text-5xl p-5 md:p-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Facial Add-Ons
          </h1>
        </div>

      </div>
      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          {serviceAddOns.map((service, index) => (
            <ServicesCards key={index} {...service} />
          ))}
        </div>
      </div>

      <div className="pb-5"></div>
    </>
  )
}

