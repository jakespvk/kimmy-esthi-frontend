import ServicesCards from './services_cards'
import Headline from '../about/headline'

import { Glass_Antiqua } from 'next/font/google'

const fraunces = Glass_Antiqua({ weight: '400', subsets: ['latin'] })

export default function ServicesPage() {
  return (
    <>
      <Headline text="SunsetKimcare Services" />
      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={fraunces.className}>
          <h1 id="mainTitle" className="text-2xl md:text-5xl md:pt-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Signature Facials
          </h1>
          <h3 className="text-xl md:text-3xl md:mb-6">Select a facial:</h3>
        </div>

      </div>

      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          <ServicesCards
            cardTitle={"☀️ Day Dream"}
            serviceName={"daydream"}
            cardContent={"Personalized facial for luminous, refreshed skin."}
            cardImgSrc={"https://images.squarespace-cdn.com/content/v1/54ab19d1e4b01ff9ee6258e2/1428977878229-B4ME0YAK6RU0P83JO3GL/iStock_000026513352_Large.jpg?format=1500w"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A 65-minute personalized facial designed to cleanse, exfoliate, and hydrate while melting away tension. Each step is customized to your skin’s unique needs, leaving it soft, balanced, and radiant, the perfect reset for your complexion and your mind."}
            tags={["65 min"]}
            price={"$55"}
            serviceType={ServiceCardType.Facial}
          />
          <ServicesCards
            cardTitle={"☀️ Sunset Reset"}
            serviceName={"sunset-reset"}
            cardContent={"Quick refresh to restore skin harmony."}
            cardImgSrc={"https://frasada.com/wp-content/uploads/2017/09/W-Euro.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A 45-minute express treatment made for returning clients or anyone needing a quick renewal. This facial helps maintain your skin’s clarity and balance between full sessions, featuring gentle exfoliation, hydration, and a soothing massage for that fresh, just-treated feel."}
            tags={["45 min"]}
            price={"$45"}
            serviceType={ServiceCardType.Facial}
          />
          <ServicesCards
            cardTitle={"☀️ Acne Afterglow"}
            serviceName={"acne-afterglow"}
            cardContent={"Clear, calm, and restore skin balance."}
            cardImgSrc={"https://cdn.prod.website-files.com/6500a07711e91a1b23e39f7b/6509cf8a9cb78b9676a2dafe_AdobeStock_308584000-min.jpeg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A 75-minute treatment designed for acne-prone or congested skin. This facial combines deep cleansing, gentle exfoliation, extractions, and light therapy to reduce inflammation and promote clarity. The result? Calm, refined, and balanced skin that feels healthy and renewed."}
            tags={["75 min"]}
            price={"$65"}
            serviceType={ServiceCardType.Facial}
          />
          <ServicesCards
            cardTitle={"☀️ Radiance Revival"}
            serviceName={"radiance-revival"}
            cardContent={"Hydrate, replenish, and bring back vitality."}
            cardImgSrc={"https://handandstone.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2F8a0nz9cb9x1e%2F3tkJUfLc3d53YTLTtYRCSF%2F692bd5398df0a906bbdeb13bad14520a%2FService_Detail_Page-What-s_Included-Hydrating_Facial-Desktop.jpg&w=3840&q=75"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A 75-minute rejuvenating treatment that deeply nourishes and strengthens the skin barrier. Featuring a hydrating cleanse, antioxidant-infused products, and a custom Hydrojelly mask, this facial restores moisture, supports repair, and leaves your complexion visibly smoother and more vibrant."}
            tags={["75 min"]}
            price={"$65"}
            serviceType={ServiceCardType.Facial}
          />
        </div>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={fraunces.className}>
          <h1 id="mainTitle" className="text-2xl md:text-5xl p-5 md:p-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Facial Packages
          </h1>
        </div>

      </div>

      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          <ServicesCards
            cardTitle={"Glow Getter Package"}
            serviceName={"glow-getter-package"}
            cardContent={""}
            cardImgSrc={"https://media.allure.com/photos/5c2e8ec54325fe2d62c0943a/16:9/w_2560%2Cc_limit/how-often-should-you-get-a-facial-lede.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"Designed for anyone craving a reset, this package pairs two of my most-loved treatments to revive dull, depleted skin. Think of it as a double dose of hydration, renewal, and confidence; leaving you with a bright, rested complexion and that unmistakable “I’ve been taking good care of myself” energy."}
            packageItems={["Day Dream Facial", "Radiance Revival Facial (includes jelly mask)", "1 FREE high frequency add on"]}
            price={"$105 ($125 value)"}
            serviceType={ServiceCardType.Package}
          />
          < ServicesCards
            cardTitle={"Self Care Series"}
            serviceName={"self-care-series"}
            cardContent={""}
            cardImgSrc={"https://www.shutterstock.com/image-photo/cosmetologist-performs-hydropiling-beauty-salon-600nw-2208041711.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"Perfect for keeping your skin balanced between seasons or busy schedules, this series helps you slow down and stay consistent. Each visit focuses on renewal and hydration, making space for calm moments and healthy, happy skin that stays that way."}
            packageItems={["2 Day Dream Facials", "1 FREE jelly mask add on"]}
            price={"$110 ($120 value)"}
            serviceType={ServiceCardType.Package}
          />
          <ServicesCards
            cardTitle={"Ultimate Radiance Retreat"}
            serviceName={"ultimate-radiance-retreat"}
            cardContent={""}
            cardImgSrc={"https://t3.ftcdn.net/jpg/01/44/24/88/360_F_144248813_1PduH2CEnX2mdR9UpVNerzZs6Kv64qsw.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"The ultimate indulgence for anyone ready to fully reset. This retreat-style experience blends deep cleansing, advanced exfoliation, and targeted treatments that refine texture and restore balance. Expect smoother, clearer skin and a revitalized sense of calm; like a mini vacation for your face and mind."}
            packageItems={["Radiance Revival Facial (includes jelly mask)", "Acne Afterglow Facial (includes LED)", "1 FREE High Frequency add-on", "1 Dermaplaning add-on included"]}
            price={"$140 ($155 value)"}
            serviceType={ServiceCardType.Package}
          />
          <ServicesCards
            cardTitle={"Clear Horizon Package"}
            serviceName={"clear-horizon-package"}
            cardContent={""}
            cardImgSrc={"https://media.allure.com/photos/5c2e8ec54325fe2d62c0943a/16:9/w_2560%2Cc_limit/how-often-should-you-get-a-facial-lede.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A thoughtful series created for acne-prone or sensitive skin that needs consistency, care, and gentle guidance. Each session builds on the last, helping calm inflammation, encourage healing, and support your long-term skin journey. Over time, you’ll notice more clarity, balance, and quiet confidence in your skin’s natural rhythm."}
            packageItems={["3 Acne Afterglow Facials (includes blue LED)", "FREE High Frequency on all sessions"]}
            price={"$180 ($210 value)"}
            serviceType={ServiceCardType.Package}
          />
        </div>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={fraunces.className}>
          <h1 id="mainTitle" className="text-2xl md:text-5xl p-5 md:p-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Facial Add-Ons
          </h1>
        </div>

      </div>
      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          <ServicesCards
            cardTitle={"High Frequency"}
            serviceName={"high-frequency"}
            cardContent={""}
            cardImgSrc={"https://static.wixstatic.com/media/2fdacb_ee6a2b770650475293e4fd855667ad55~mv2.jpg/v1/fill/w_640,h_484,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2fdacb_ee6a2b770650475293e4fd855667ad55~mv2.jpg"}
            cardLinkTo={"/booking/daydream"}
            cardOverlayContent={"Boost circulation and target breakouts with gentle electrical currents that calm, purify, and support skin healing."}
            notBookable={true}
            serviceType={ServiceCardType.AddOn}
          />
          <ServicesCards
            cardTitle={"Custom Hydrojelly Mask"}
            serviceName={"custom-hydrojelly-mask"}
            cardContent={""}
            cardImgSrc={"https://www.honeybesthetics.com/cdn/shop/files/IMG-1851.png?v=1746437836"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"A cooling, skin-loving mask tailored to your needs; adds hydration, soothes irritation, and seals in nutrients for a supple finish."}
            notBookable={true}
            serviceType={ServiceCardType.AddOn}
          />
          <ServicesCards
            cardTitle={"LED Light Therapy"}
            serviceName={"led-light-therapy"}
            cardContent={""}
            cardImgSrc={"https://images.squarespace-cdn.com/content/v1/68061840f8f9a419beb845be/13eaaaad-3b37-4e8d-b121-c25678549109/Maryville-Acupuncture_LED-Light-Therapy_Header-Image.png"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"Harness the power of light energy to refine texture, calm redness, and promote a more even, healthy complexion."}
            notBookable={true}
            serviceType={ServiceCardType.AddOn}
          />
          <ServicesCards
            cardTitle={"Dermaplaning"}
            serviceName={"dermaplaning"}
            cardContent={""}
            cardImgSrc={"https://images.squarespace-cdn.com/content/v1/5c4f6ba1e2ccd1ee6075495d/b46da5d5-865c-4244-8bab-6d8abd83f222/dermaplaning-benefits.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"Instantly smooth and brighten with this gentle exfoliating treatment that removes dull surface buildup and peach fuzz for a flawless finish."}
            notBookable={true}
            serviceType={ServiceCardType.AddOn}
          />
        </div>
      </div>

      <div className="pb-5"></div>
    </>
  )
}

export enum ServiceCardType {
  Facial,
  Package,
  AddOn
}
