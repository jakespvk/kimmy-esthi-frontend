'use client';

import { ServiceCardType } from './page';
import { FancyButton } from './fancyButton';

import { useEffect, useState } from 'react';
import { coiny } from '../fonts';

const ServicesCards = ({ serviceName, serviceType, cardTitle, cardContent, cardImgSrc, cardLinkTo, cardOverlayContent, packageItems, tags, notBookable, price }: { serviceName: string, serviceType: ServiceCardType, cardTitle: string, cardContent: string, cardImgSrc: string, cardLinkTo: string, cardOverlayContent?: string, packageItems?: string[], tags?: string[], notBookable?: boolean, price?: string }) => {
  const [prefersHover, setPrefersHover] = useState(true);
  const [clicked, setClicked] = useState(false);
  useEffect(() => setPrefersHover(window.matchMedia('(hover: hover)').matches), []);
  // const overlayActive = prefersHover ? hovered : clicked;

  function toggleClicked() {
    clicked ? setClicked(false) : setClicked(true);
  }
  return (
    <>
      <div className="relative group" onClick={() => toggleClicked()}>
        <div className="p-5">
          <div className={"card bg-base-100 shadow-xl " + (serviceType === ServiceCardType.AddOn ? "w-60" : "w-80 lg:w-96")}>
            <figure>
              <img
                className={"w-full object-cover " + (serviceType === ServiceCardType.AddOn ? "h-40" : "h-52 lg:h-56")}
                src={cardImgSrc}
                alt="Facial" />
            </figure>
            <div className={"card-body " + (packageItems !== undefined && packageItems.length > 0 ? "h-72 lg:h-88" : (serviceType === ServiceCardType.AddOn ? "h-24 lg:h-28 py-1 flex items-center justify-center" : "h-44"))}>
              <div className={coiny.className}>
                <h2 id="card_title" className={"card-title tracking-wide text-center pb-3 " + (serviceType === ServiceCardType.AddOn ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl")}>{cardTitle}</h2>
              </div>
              {packageItems !== undefined && packageItems.length > 0
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
            // "card h-full backdrop-blur-xl bg-conic/decreasing from-base-300 via-base-200 via-80% to-base-300 to-100% shadow-[0_7px_20px_7px_rgb(230,150,23,0.7)] transition duration-200 ease-in-out border-1 border-base-200 "
            // "card h-full backdrop-blur-xl bg-gradient-to-tr from-base-300 from-20% to-warning to-100% shadow-[0_7px_20px_7px_rgb(230,150,23,0.7)] transition duration-200 ease-in-out border-1 border-base-200 "
            "card h-full backdrop-blur-xl bg-radial-[at_25%_35%] from-base-200 from-5% via-base-300 via-80% to-base-200 to-100% shadow-[0_7px_20px_7px_rgb(230,150,23,0.7)] transition duration-200 ease-in-out border border-base-200 "
            // "card h-full backdrop-blur-xl bg-base-300/70 bg-blend-overlay shadow-[0_7px_20px_7px_rgb(230,150,23,0.7)] transition duration-200 ease-in-out border-1 border-base-200 "
            + (serviceType === ServiceCardType.AddOn ? "w-60" : "w-full lg:w-96")}
          >
            {cardOverlayContent !== undefined && cardOverlayContent.length > 0 &&
              <p className={"p-5 text-center lg:text-lg " + (serviceType === ServiceCardType.AddOn ? "my-auto" : "grow")}>{cardOverlayContent}</p>
            }
            <div className="flex flex-col">
              {price && <strong className="text-center my-2">{price}</strong>}
              {!notBookable &&
                // TODO
                <div className={"card-actions justify-center items-end grow " + ((prefersHover) ? "hover:touch-auto pointer-events-auto" : (clicked) ? "touch-auto pointer-events-auto" : "touch-none pointer-events-none")}>
                  <FancyButton cardLinkTo={cardLinkTo} canHover={prefersHover} appointmentType={serviceName} />
                </div>
              }
            </div>
          </div>
        </div >
      </div >
    </>
  )
}

export default ServicesCards
