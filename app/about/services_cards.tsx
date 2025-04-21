'use client';

import React from 'react'

const ServicesCards = ({ cardTitle, cardContent, cardImgSrc, cardLinkTo, cardOverlayContent }: { cardTitle: string, cardContent: string, cardImgSrc: string, cardLinkTo: string, cardOverlayContent: string }) => {
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
            <div className="card-body h-56">
              <h2 id="card_title" className="card-title text-2xl">{cardTitle}</h2>
              <p>{cardContent}</p>
            </div>
          </div>
        </div>
        <div className="p-5 absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 ease-in-out bg-blend-overlay">
          <div
            className="card w-96 h-112 bg-base-300/50 bg-blend-overlay shadow-[0_35px_60px_-15px_rgb(0,0,0,0.35)]"
            style={{
              backgroundImage: "url(https://t4.ftcdn.net/jpg/05/01/83/79/360_F_501837926_xvM4Ym7pql243YOrjmct5NCXjFTxz11v.jpg)",
            }}>
            <p className="p-5">{cardOverlayContent}</p>
            <div className="card-actions justify-center items-end grow">
              <a role="button" className="btn btn-accent mb-10 text-lg px-4 py-2" href={cardLinkTo}>Book Now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicesCards
