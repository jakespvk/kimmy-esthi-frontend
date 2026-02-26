"use client";

import { Dot, Sun } from "lucide-react";
import { glassAntiqua } from "../fonts";

export default function Ratings() {
  const ratings = [
    {
      title: "The Best Facial Treatment",
      author: "Jake My Love",
      content: "I have been using this facial treatment for over a year now and I can say it has changed my skin. The results are amazing and I am so happy with the results. I would recommend this to anyone looking for a great facial treatment.",
      rating: 5,
    },
    {
      title: "The Best Facial Treatment",
      author: "Jake My Love",
      content: "I have been using this facial treatment for over a year now and I can say it has changed my skin. The results are amazing and I am so happy with the results. I would recommend this to anyone looking for a great facial treatment.",
      rating: 5,
    },
    {
      title: "Best Facial Treatment",
      author: "Jake My Love",
      content: "This facial treatment has been a game changer for me. I have been using it for over a year now and I can say it has changed my skin. The results are amazing and I am so happy with the results. I would recommend this to anyone looking for a great facial treatment.",
      rating: 5,
    },
    {
      title: "Best Facial Treatment",
      author: "Jake My Love",
      content: "This facial treatment has been a game changer for me. I have been using it for over a year now and I can say it has changed my skin. The results are amazing and I am so happy with the results. I would recommend this to anyone looking for a great facial treatment.",
      rating: 4,
    },
  ] as Rating[];

  return (
    <div>
      <div className="flex justify-center">
        <h1 id="reviews" className={`scroll-mt-36 md:scroll-mt-18 p-5 md:p-10 headline ${glassAntiqua.className}`}>Reviews</h1>
      </div>

      <div className="reviews-cards">
        {ratings.map((rating, index) => (
          <div key={index} className="flex flex-col">
            <div className="lg:w-2/3 p-5 mx-auto my-auto">
              <div className="card rounded-3xl bg-base-100 shadow-xl card-multiple-border">
                <div className="card-body mt-0 pt-0">
                  <div id="rating-title-section" className="flex items-center flex-wrap">
                    <h2 id="card_title" className="max-sm:mr-3 card-title tracking-wide text-center text-2xl my-2">{rating.title}</h2>
                    <Dot className="hidden sm:inline" />
                    <div id="rating-suns" className="card-actions">
                      {Array.from({ length: 5 }, ((_, key) =>
                        <Sun className={key > (rating.rating - 1) ? "text-muted" : "text-amber-400"} key={key} />
                      ))}
                    </div>
                  </div>
                  <p className="lg:text-lg text-amber-400">{rating.author}</p>
                  <p className="lg:text-lg">{rating.content}</p>
                </div>
              </div >
            </div>
          </div>))}
      </div>
    </div>
  )
}

