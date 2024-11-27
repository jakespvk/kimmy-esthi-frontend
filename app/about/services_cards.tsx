'use client';

import React from 'react'

const ServicesCards = ({cardTitle, cardContent, cardImgSrc, cardLinkTo} : {cardTitle:string, cardContent:string, cardImgSrc:string, cardLinkTo:string}) => {
    return (
        <>
        <div className="p-5">
        <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
        <img
        className="h-56 w-full object-cover"
        src={cardImgSrc}
        alt="Facial" />
        </figure>
        <div className="card-body h-56">
        <h2 id="card_title" className="card-title">{cardTitle}</h2>
        <p>{cardContent}</p>
        <div className="card-actions justify-end">
        <a role="button" className="btn btn-primary text-white bg-gradient-to-r from-amber-500 to-amber-700 border-amber-600 hover:from-amber-400 hover:to-amber-600 hover:border-amber-500" href={cardLinkTo}>Book Now</a>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default ServicesCards
