import React from 'react'
import ServicesCards from './services_cards'
import Headline from './headline'

import { Glass_Antiqua } from 'next/font/google'

const fraunces = Glass_Antiqua({ weight: '400', subsets: ['latin'] })

const about = () => {
  return (
    <>
      <Headline text={"About SunsetKimcare"} />

      <div className="lg:w-4/5 px-5 mx-auto my-auto">
        <p className="text-xl py-3">
          Hi! I’m Kimmy Ancheta, a licensed esthetician based in Long Beach, CA but also offering services in Santa Ana. I specialize in corrective facials, acne care, glow-focused treatments, and Brow Laminations!
        </p>
        <p className="text-xl py-3">
          My approach to skincare blends a mix of advanced education, relaxation, and results-driven techniques so every client leaves feeling confident and cared for; both inside and out!
        </p>
        <p className="text-xl py-3">
          My journey into esthetics started when I was in middle school. I struggled so much with my own skin over the years and became obsessed with learning how to heal it / I fell in love with the feeling of helping someone feel confident or even just good in their own skin. Since then, I’ve made it my mission to create a space where skin REALLY meets self-care; where each treatment feels like both a reset and a little celebration of you.
        </p>
        <p className="text-xl py-3">
          When I’m not in the treatment room, you can find me teaching esthetics to future estheticians, brain-rotting on social media, yelling into a mic in karaoke rooms, watching shows & movies with loved ones, and sometimes you’ll even see me on a big screen; acting or modeling! I’m passionate about continuing skin education, staying inspired, and bringing my clients the latest in advanced treatments that truly work.
        </p>
        <p className="text-xl py-3">
          Whether you’re here for a glow-up, a deep reset, or to start your skincare journey, I can’t wait to meet you and help you fall in love with your skin again. 🤍
        </p>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={fraunces.className}>
          <h1 id="mainTitle" className="text-7xl pt-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Signature Facials
          </h1>
          <h3 className="text-3xl pb-6">Select a facial:</h3>
        </div>

      </div>

      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          <ServicesCards
            cardTitle={"☀️ Day Dream"}
            cardContent={"Personalized facial for luminous, refreshed skin."}
            cardImgSrc={"https://images.squarespace-cdn.com/content/v1/54ab19d1e4b01ff9ee6258e2/1428977878229-B4ME0YAK6RU0P83JO3GL/iStock_000026513352_Large.jpg?format=1500w"}
            cardLinkTo={"/booking/daydream"}
            cardOverlayContent={"A 65-minute personalized facial designed to cleanse, exfoliate, and hydrate while melting away tension. Each step is customized to your skin’s unique needs, leaving it soft, balanced, and radiant, the perfect reset for your complexion and your mind."}
            tags={["65 min"]}
            price={"$55"}
          />
          <ServicesCards
            cardTitle={"☀️ Sunset Reset"}
            cardContent={"Quick refresh to restore skin harmony."}
            cardImgSrc={"https://frasada.com/wp-content/uploads/2017/09/W-Euro.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A 45-minute express treatment made for returning clients or anyone needing a quick renewal. This facial helps maintain your skin’s clarity and balance between full sessions, featuring gentle exfoliation, hydration, and a soothing massage for that fresh, just-treated feel."}
            tags={["45 min"]}
            price={"$45"}
          />
          <ServicesCards
            cardTitle={"☀️ Acne Afterglow"}
            cardContent={"Clear, calm, and restore skin balance."}
            cardImgSrc={"https://cdn.prod.website-files.com/6500a07711e91a1b23e39f7b/6509cf8a9cb78b9676a2dafe_AdobeStock_308584000-min.jpeg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A 75-minute treatment designed for acne-prone or congested skin. This facial combines deep cleansing, gentle exfoliation, extractions, and light therapy to reduce inflammation and promote clarity. The result? Calm, refined, and balanced skin that feels healthy and renewed."}
            tags={["75 min"]}
            price={"$65"}
          />
          <ServicesCards
            cardTitle={"☀️ Radiance Revival"}
            cardContent={"Hydrate, replenish, and bring back vitality."}
            cardImgSrc={"https://handandstone.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2F8a0nz9cb9x1e%2F3tkJUfLc3d53YTLTtYRCSF%2F692bd5398df0a906bbdeb13bad14520a%2FService_Detail_Page-What-s_Included-Hydrating_Facial-Desktop.jpg&w=3840&q=75"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A 75-minute rejuvenating treatment that deeply nourishes and strengthens the skin barrier. Featuring a hydrating cleanse, antioxidant-infused products, and a custom Hydrojelly mask, this facial restores moisture, supports repair, and leaves your complexion visibly smoother and more vibrant."}
            tags={["75 min"]}
            price={"$65"}
          />
        </div>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={fraunces.className}>
          <h1 id="mainTitle" className="text-7xl p-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Facial Packages
          </h1>
        </div>

      </div>

      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          <ServicesCards
            cardTitle={"Glow Getter Package"}
            cardContent={""}
            cardImgSrc={"https://media.allure.com/photos/5c2e8ec54325fe2d62c0943a/16:9/w_2560%2Cc_limit/how-often-should-you-get-a-facial-lede.jpg"}
            cardLinkTo={"/booking/daydream"}
            cardOverlayContent={"Designed for anyone craving a reset, this package pairs two of my most-loved treatments to revive dull, depleted skin. Think of it as a double dose of hydration, renewal, and confidence; leaving you with a bright, rested complexion and that unmistakable “I’ve been taking good care of myself” energy."}
            packageItems={["Day Dream Facial", "Radiance Revival Facial (includes jelly mask)", "1 FREE high frequency add on"]}
            price={"$105 ($125 value)"}
          />
          <ServicesCards
            cardTitle={"Self Care Series"}
            cardContent={""}
            cardImgSrc={"https://www.shutterstock.com/image-photo/cosmetologist-performs-hydropiling-beauty-salon-600nw-2208041711.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A 45-minute express treatment made for returning clients or anyone needing a quick renewal. This facial helps maintain your skin’s clarity and balance between full sessions, featuring gentle exfoliation, hydration, and a soothing massage for that fresh, just-treated feel."}
            packageItems={["2 Day Dream Facials", "1 FREE jelly mask add on"]}
            price={"$110 ($120 value)"}
          />
          <ServicesCards
            cardTitle={"Ultimate Radiance Retreat"}
            cardContent={""}
            cardImgSrc={"https://t3.ftcdn.net/jpg/01/44/24/88/360_F_144248813_1PduH2CEnX2mdR9UpVNerzZs6Kv64qsw.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"We offer many different facials, from vegan to pumpkin"}
            packageItems={["Radiance Revival Facial (includes jelly mask)", "Acne Afterglow Facial (includes LED)", "1 FREE High Frequency add-on", "1 Dermaplaning add-on included"]}
            price={"$140 ($155 value)"}
          />
          <ServicesCards
            cardTitle={"Clear Horizon Package"}
            cardContent={""}
            cardImgSrc={"https://media.allure.com/photos/5c2e8ec54325fe2d62c0943a/16:9/w_2560%2Cc_limit/how-often-should-you-get-a-facial-lede.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"We offer many different facials, from vegan to pumpkin"}
            packageItems={["3 Acne Afterglow Facials (includes blue LED)", "FREE High Frequency on all sessions"]}
            price={"$180 ($210 value)"}
          />
        </div>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={fraunces.className}>
          <h1 id="mainTitle" className="text-7xl p-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Facial Add-Ons
          </h1>
        </div>

      </div>
      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          <ServicesCards
            cardTitle={"☀️ High Frequency"}
            cardContent={""}
            cardImgSrc={"https://static.wixstatic.com/media/2fdacb_ee6a2b770650475293e4fd855667ad55~mv2.jpg/v1/fill/w_640,h_484,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2fdacb_ee6a2b770650475293e4fd855667ad55~mv2.jpg"}
            cardLinkTo={"/booking/daydream"}
            cardOverlayContent={"Boost circulation and target breakouts with gentle electrical currents that calm, purify, and support skin healing."}
            notBookable={true}
          />
          <ServicesCards
            cardTitle={"☀️ Custom Hydrojelly Mask"}
            cardContent={""}
            cardImgSrc={"https://www.honeybesthetics.com/cdn/shop/files/IMG-1851.png?v=1746437836"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A cooling, skin-loving mask tailored to your needs; adds hydration, soothes irritation, and seals in nutrients for a supple finish."}
            notBookable={true}
          />
          <ServicesCards
            cardTitle={"☀️ LED Light Therapy"}
            cardContent={""}
            cardImgSrc={"https://images.squarespace-cdn.com/content/v1/68061840f8f9a419beb845be/13eaaaad-3b37-4e8d-b121-c25678549109/Maryville-Acupuncture_LED-Light-Therapy_Header-Image.png"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"Harness the power of light energy to refine texture, calm redness, and promote a more even, healthy complexion."}
            notBookable={true}
          />
          <ServicesCards
            cardTitle={"☀️ Dermaplaning"}
            cardContent={""}
            cardImgSrc={"https://images.squarespace-cdn.com/content/v1/5c4f6ba1e2ccd1ee6075495d/b46da5d5-865c-4244-8bab-6d8abd83f222/dermaplaning-benefits.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"Instantly smooth and brighten with this gentle exfoliating treatment that removes dull surface buildup and peach fuzz for a flawless finish."}
            notBookable={true}
          />
        </div>
      </div>

      <div className="pb-5"></div>
    </>
  )
}

export default about
