'use client';

import { ServiceType } from '../../app/types';
import { FancyButton } from './fancyButton';

import { useEffect, useState } from 'react';
import { coiny } from '../../app/fonts';

const ServicesCards = ({ serviceName, promotionName, serviceType, cardTitle, cardContent, cardImgSrc, cardOverlayContent, packageItems, tags, notBookable, price }: { serviceName: string, promotionName?: string, serviceType: ServiceType, cardTitle: string, cardContent: string, cardImgSrc: string, cardOverlayContent?: string, packageItems?: string[], tags?: string[], notBookable?: boolean, price?: string }) => {
  const [prefersHover, setPrefersHover] = useState(true);
  const [clicked, setClicked] = useState(false);
  useEffect(() => setPrefersHover(window.matchMedia('(hover: hover)').matches), []);

  function toggleClicked() {
    clicked ? setClicked(false) : setClicked(true);
  }

  return (
    <>
      <div className="relative group" onClick={() => toggleClicked()}>
        <div className="p-5">
          <div className={"card rounded-3xl bg-base-100 shadow-xl " + (serviceType === ServiceType.AddOn ? "w-60" : "w-80 lg:w-96")}>
            <figure>
              <img
                className={"w-full object-cover " + (serviceType === ServiceType.AddOn ? "h-40" : "h-52 lg:h-56")}
                src={cardImgSrc}
                alt="Facial" />
            </figure>
            <div className={"card-body mt-0 pt-0 " + (packageItems && packageItems.length > 0 ? "h-72 lg:h-88" : (serviceType === ServiceType.AddOn ? "h-24 lg:h-28 flex items-center justify-center" : "h-44"))}>
              <h2 id="card_title" className={coiny.className + " card-title tracking-wide text-center " + (serviceType === ServiceType.AddOn ? "text-lg lg:text-xl grow my-[50%]" : "text-2xl my-2")}>{cardTitle}</h2>
              {packageItems && packageItems.length > 0
                &&
                <ul className="mx-4 list-disc lg:text-lg">
                  {packageItems.map((item, idx) => <li key={idx} className="">{item}</li>)}
                </ul>
              }
              <p className="lg:text-lg">{cardContent}</p>
              {((tags) || (price)) &&
                <div className="card-actions justify-end">
                  {(tags) && tags.map((tag: string, idx) =>
                    <div key={idx} className="text-warning">{tag}</div>
                  )}
                  <div>{price}</div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className={((!prefersHover && clicked) && "opacity-100") + " p-5 absolute inset-0 opacity-0 hover:opacity-100 transition ease-[cubic-bezier((0.3,0.8,0.3,2.3))] duration-500 bg-blend-overlay"}>
          <div className={
            "card rounded-3xl h-full bg-radial-[at_50%_35%] from-amber-200 via-amber-400 to-amber-500 text-popover-content shadow-[0_7px_20px_7px_rgb(230,150,23,0.7)] transition duration-200 ease-in-out"
            + (serviceType === ServiceType.AddOn ? "w-60" : "w-full lg:w-96")}
          >
            {cardOverlayContent !== undefined && cardOverlayContent.length > 0 &&
              <p className={"p-5 text-center lg:text-lg " + (serviceType === ServiceType.AddOn ? "my-auto" : "grow")}>{cardOverlayContent}</p>
            }
            <div className="flex flex-col">
              {price && <strong className="text-center my-2">{price}</strong>}
              {!notBookable &&
                // TODO
                <div className={"card-actions justify-center items-end grow " + ((prefersHover) ? "hover:touch-auto pointer-events-auto" : (clicked) ? "touch-auto pointer-events-auto" : "touch-none pointer-events-none")}>
                  <FancyButton cardLinkTo={"/booking"} canHover={prefersHover} appointmentType={serviceName} promotionName={promotionName} />
                </div>
              }
            </div>
          </div>
        </div >
      </div>
    </>
  )
}

export default ServicesCards
