import { Sun } from "lucide-react";
import { glassAntiqua } from "../fonts";

export default function Ratings() {
  const ratings = [
    {
      title: "The Best Facial Treatment",
      content: "I have been using this facial treatment for over a year now and I can say it has changed my skin. The results are amazing and I am so happy with the results. I would recommend this to anyone looking for a great facial treatment.",
      rating: 5,
    },
    {
      title: "The Best Facial Treatment",
      content: "I have been using this facial treatment for over a year now and I can say it has changed my skin. The results are amazing and I am so happy with the results. I would recommend this to anyone looking for a great facial treatment.",
      rating: 5,
    },
    {
      title: "Best Facial Treatment",
      content: "This facial treatment has been a game changer for me. I have been using it for over a year now and I can say it has changed my skin. The results are amazing and I am so happy with the results. I would recommend this to anyone looking for a great facial treatment.",
      rating: 5,
    },
    {
      title: "Best Facial Treatment",
      content: "This facial treatment has been a game changer for me. I have been using it for over a year now and I can say it has changed my skin. The results are amazing and I am so happy with the results. I would recommend this to anyone looking for a great facial treatment.",
      rating: 4,
    },
  ] as Rating[];
  return (
    <div>
      <div className="flex justify-center">
        <h1 id="reviews" className={`scroll-mt-36 md:scroll-mt-18 p-5 md:p-10 headline ${glassAntiqua.className}`}>Reviews</h1>
      </div>

      <div className="">
        {ratings.map((rating, index) => (
          <div key={index} className="flex flex-col">
            <div className="text-center lg:w-2/3 p-5 mx-auto my-auto">
              <div className="card rounded-3xl bg-base-100 shadow-xl card-multiple-border">
                <div className="card-body mt-0 pt-0">
                  <h2 id="card_title" className="card-title tracking-wide text-center text-2xl my-2">{rating.title}</h2>
                  <div className="card-actions">
                    {Array.from({ length: rating.rating }, ((_, key) =>
                      // TODO instead of stars, use suns
                      <Sun className="text-warning" key={key} />
                      // <div key={key}>sun</div>
                      // when clicked, all elements with index less than clicked should be "selected" or made colored in
                    ))}
                    <div className="text-warning">{rating.rating}</div>
                    <div>{rating.price}</div>
                  </div>
                  <p className="lg:text-lg">{rating.content}</p>
                </div>
              </div >
            </div>
          </div>))}
      </div>
    </div>
  )
}

