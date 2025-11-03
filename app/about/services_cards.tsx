'use client';

import React from 'react'
import { ServiceCardType } from './page';
import { FancyButton } from './fancyButton';

import { Coiny } from 'next/font/google'
const fraunces = Coiny({ weight: '400', subsets: ['latin'] })

const ServicesCards = ({ type, cardTitle, cardContent, cardImgSrc, cardLinkTo, cardOverlayContent, packageItems, tags, notBookable, price }: { type: ServiceCardType, cardTitle: string, cardContent: string, cardImgSrc: string, cardLinkTo: string, cardOverlayContent?: string, packageItems?: string[], tags?: string[], notBookable?: boolean, price?: string }) => {
  return (
    <>
      <div className="relative group">
        <div className="p-5">
          <div className={"card bg-base-100 shadow-xl " + (type === ServiceCardType.AddOn ? "w-60" : "w-96")}>
            <figure>
              <img
                className={"w-full object-cover " + (type === ServiceCardType.AddOn ? "h-40" : "h-56")}
                src={cardImgSrc}
                alt="Facial" />
            </figure>
            <div className={"card-body " + (packageItems !== undefined && packageItems.length > 0 ? "h-[22rem]" : (type === ServiceCardType.AddOn ? "h-28 py-1 my-auto" : "h-44"))}>
              <div className={fraunces.className}>
                <h2 id="card_title" className={"card-title tracking-wide text-center pb-3 " + (type === ServiceCardType.AddOn ? "text-2xl" : "text-3xl")}>{cardTitle}</h2>
              </div>
              {packageItems !== undefined && packageItems.length > 0
                ?
                <ul className="mx-4 list-disc text-lg">
                  {packageItems.map((item) => <li className="">{item}</li>)}
                </ul>
                :
                null}
              <p className="text-lg">{cardContent}</p>
              {(tags) || (price) ?
                <div className="card-actions justify-end">
                  {(tags) ? tags.map((tag: string) =>
                    <div className="text-warning">{tag}</div>
                  ) : null}
                  <div>{price}</div>
                </div>
                : null}
            </div>
          </div>
        </div>
        <div className="p-5 absolute inset-0 opacity-0 hover:opacity-100 bg-blend-overlay">
          <div className={
            "card h-full backdrop-blur-xl bg-base-300/70 bg-blend-overlay shadow-[0_7px_20px_7px_rgb(230,150,23,0.7)] transition duration-200 ease-in-out border-1 border-base-200 "
            + (type === ServiceCardType.AddOn ? "w-60" : "w-96")}
          >
            {cardOverlayContent !== undefined && cardOverlayContent.length > 0
              ?
              <p className="p-5 pb-0 text-center text-lg {notBookable ? my-auto : my-0}">{cardOverlayContent}</p>
              :
              null
            }
            {price ? <strong className="text-center my-auto">{price}</strong> : null}
            {notBookable ? null :
              <div className="card-actions justify-center items-end grow">
                <FancyButton cardLinkTo={cardLinkTo} />
              </div>
            }
          </div>
        </div >
      </div >
    </>
  )
}

export default ServicesCards
