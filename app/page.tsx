import ServicesCards from '@/components/ui/services_cards'
import { glassAntiqua } from './fonts'
import About from './about/about';
import { fetchServicesSearch } from './api';
import { ServiceType } from './types';
import RatingsPage from './ratings/page';

export default async function Home() {
  "use cache";
  const facials = await fetchServicesSearch(ServiceType.Facial);
  const packages = await fetchServicesSearch(ServiceType.Package);
  const addOns = await fetchServicesSearch(ServiceType.AddOn);
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
          {facials.map((service, index) => (
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
          {packages.map((service, index) => (
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
          {addOns.map((service, index) => (
            <ServicesCards key={index} {...service} />
          ))}
        </div>
      </div>

      <About />

      <RatingsPage />

      <div className="pb-5"></div>
    </>
  )
}
