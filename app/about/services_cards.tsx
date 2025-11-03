'use client';

import React from 'react'

import { Coiny } from 'next/font/google'
const fraunces = Coiny({ weight: '400', subsets: ['latin'] })

const ServicesCards = ({ cardTitle, cardContent, cardImgSrc, cardLinkTo, cardOverlayContent, packageItems, tags, notBookable, price }: { cardTitle: string, cardContent: string, cardImgSrc: string, cardLinkTo: string, cardOverlayContent?: string, packageItems?: string[], tags?: string[], notBookable?: boolean, price?: string }) => {
  return (
    <>
      <div className="relative group">
        <div className="p-5">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                className="h-56 w-full object-cover"
                src={cardImgSrc}
                alt="Facial" />
            </figure>
            <div className={(packageItems !== undefined && packageItems.length > 0) ? "card-body h-64" : "card-body h-44"}>
              <div className={fraunces.className}>
                <h2 id="card_title" className="card-title text-3xl tracking-wide pb-3">{cardTitle}</h2>
              </div>
              {packageItems !== undefined && packageItems.length > 0
                ?
                <ul className="mx-2 list-disc list-inside my-auto">
                  {packageItems.map((item) => <li className="">{item}</li>)}
                </ul>
                :
                null}
              {(cardContent !== undefined && cardContent.length > 0) ? <p className="text-lg">{cardContent}</p> : null}
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
          <div
            className="card w-96 h-full backdrop-blur-xl bg-base-300/70 bg-blend-overlay shadow-[0_7px_20px_7px_rgb(230,150,23,0.7)] transition duration-200 ease-in-out border-1 border-base-200"
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

const FancyButton = ({ cardLinkTo }: { cardLinkTo: string }) => {
  return (
    <a role="button" className="btn btn-accent mb-10 text-lg px-4 py-2 jellybtn" href={cardLinkTo}>
      Book Now
      <div className="star-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xml:space="preserve"
          version="1.1"
          // style={shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd", clipRule:"evenodd"}
          viewBox="0 0 784.11 815.53"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs></defs>
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="star-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xml:space="preserve"
          version="1.1"
          // style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
          viewBox="0 0 784.11 815.53"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs></defs>
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="star-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xml:space="preserve"
          version="1.1"
          // style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
          viewBox="0 0 784.11 815.53"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs></defs>
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="star-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xml:space="preserve"
          version="1.1"
          // style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
          viewBox="0 0 784.11 815.53"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs></defs>
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="star-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xml:space="preserve"
          version="1.1"
          // style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
          viewBox="0 0 784.11 815.53"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs></defs>
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="star-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xml:space="preserve"
          version="1.1"
          // style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
          viewBox="0 0 784.11 815.53"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs></defs>
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
    </a>
  )
}
