'use client';

import { ServiceCardType } from './page';
import { FancyButton } from './fancyButton';

import { Coiny } from 'next/font/google'
import { useState } from 'react';
const fraunces = Coiny({ weight: '400', subsets: ['latin'] })

const ServicesCards = ({ serviceName, serviceType, cardTitle, cardContent, cardImgSrc, cardLinkTo, cardOverlayContent, packageItems, tags, notBookable, price }: { serviceName: string, serviceType: ServiceCardType, cardTitle: string, cardContent: string, cardImgSrc: string, cardLinkTo: string, cardOverlayContent?: string, packageItems?: string[], tags?: string[], notBookable?: boolean, price?: string }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div className="relative group" onClick={() => setClicked}>
        <div className="p-5">
          <div className={"card bg-base-100 shadow-xl " + (serviceType === ServiceCardType.AddOn ? "w-60" : "w-full md:w-96")}>
            <figure>
              <img
                className={"w-full object-cover " + (serviceType === ServiceCardType.AddOn ? "h-40" : "h-52 md:h-56")}
                src={cardImgSrc}
                alt="Facial" />
            </figure>
            <div className={"card-body " + (packageItems !== undefined && packageItems.length > 0 ? "h-[22rem]" : (serviceType === ServiceCardType.AddOn ? "h-28 py-1 my-auto" : "h-44"))}>
              <div className={fraunces.className}>
                <h2 id="card_title" className={"card-title tracking-wide text-center pb-3 " + (serviceType === ServiceCardType.AddOn ? "text-xl md:text-2xl" : "text-2xl md:text-3xl")}>{cardTitle}</h2>
              </div>
              {packageItems !== undefined && packageItems.length > 0
                ?
                <ul className="mx-4 list-disc md:text-lg">
                  {packageItems.map((item, idx) => <li key={idx} className="">{item}</li>)}
                </ul>
                :
                null}
              <p className="md:text-lg">{cardContent}</p>
              {(tags) || (price) ?
                <div className="card-actions justify-end">
                  {(tags) ? tags.map((tag: string, idx) =>
                    <div key={idx} className="text-warning">{tag}</div>
                  ) : null}
                  <div>{price}</div>
                </div>
                : null}
            </div>
          </div>
        </div>
        <div className={(clicked ? "opacity-100" : "") + " p-5 absolute inset-0 opacity-0 hover:opacity-100 focus-within:opacity-100 bg-blend-overlay"}>
          <div className={
            "card h-full backdrop-blur-xl bg-base-300/70 bg-blend-overlay shadow-[0_7px_20px_7px_rgb(230,150,23,0.7)] transition duration-200 ease-in-out border-1 border-base-200 "
            + (serviceType === ServiceCardType.AddOn ? "w-60" : "w-full md:w-96")}
          >
            {cardOverlayContent !== undefined && cardOverlayContent.length > 0
              ?
              <p className={"p-5 text-center md:text-lg " + (serviceType === ServiceCardType.AddOn ? "my-auto" : "grow")}>{cardOverlayContent}</p>
              :
              null
            }
            <div className="flex flex-col">
              {price ? <strong className="text-center my-2">{price}</strong> : null}
              {notBookable ? null :
                <div className="card-actions justify-center items-end grow">
                  <FancyButton cardLinkTo={cardLinkTo} appointmentType={serviceName} />
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
