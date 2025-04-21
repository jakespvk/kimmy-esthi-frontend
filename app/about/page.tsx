import React from 'react'
import ServicesCards from './services_cards'
import Headline from './headline'

import { Glass_Antiqua } from 'next/font/google'

const fraunces = Glass_Antiqua({ weight: '400', subsets: ['latin'] })

const about = () => {
  return (
    <>
      <Headline text={"About SunsetKimcare"} />

      <div className="text-center lg:w-2/3 px-5 mx-auto my-auto">
        <p className="text-2xl">Hello, welcome to my page
          About me yada yada blah blah blah
          I love skin and clear skin is my passion
          fill the space fill the space fill the space
          filling more space and more space and more space
          tesitng the extra space and the width restrictions
        </p>
      </div>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

        <div className={fraunces.className}>
          <h1 id="mainTitle" className="text-7xl p-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 inline-block text-transparent bg-clip-text">
            Services
          </h1>
        </div>

      </div>

      <div className="lg:2/3 mx-auto my-auto min-w-fit">
        <div className="flex flex-wrap justify-center">
          <ServicesCards
            cardTitle={"☀️ Facials"}
            cardContent={"We offer many different facials, from vegan to pumpkin"}
            cardImgSrc={"https://media.allure.com/photos/5c2e8ec54325fe2d62c0943a/16:9/w_2560%2Cc_limit/how-often-should-you-get-a-facial-lede.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"Completely customized facial"}
          />
          <ServicesCards
            cardTitle={"☀️ Facials"}
            cardContent={"Keep that pesky mustache in check"}
            cardImgSrc={"https://www.shutterstock.com/image-photo/cosmetologist-performs-hydropiling-beauty-salon-600nw-2208041711.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"We offer many different facials, from vegan to pumpkin"}
          />
          <ServicesCards
            cardTitle={"Waxing! hehe"}
            cardContent={"Keep that pesky mustache in check (and other things)"}
            cardImgSrc={"https://t3.ftcdn.net/jpg/01/44/24/88/360_F_144248813_1PduH2CEnX2mdR9UpVNerzZs6Kv64qsw.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"We offer many different facials, from vegan to pumpkin"}
          />
          <ServicesCards
            cardTitle={"Facials!"}
            cardContent={"We offer many different facials, from vegan to pumpkin"}
            cardImgSrc={"https://media.allure.com/photos/5c2e8ec54325fe2d62c0943a/16:9/w_2560%2Cc_limit/how-often-should-you-get-a-facial-lede.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"We offer many different facials, from vegan to pumpkin"}
          />
          <ServicesCards
            cardTitle={"Dermabrasion!"}
            cardContent={"Keep that pesky mustache in check"}
            cardImgSrc={"https://www.shutterstock.com/image-photo/cosmetologist-performs-hydropiling-beauty-salon-600nw-2208041711.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"We offer many different facials, from vegan to pumpkin"}
          />
          <ServicesCards
            cardTitle={"Waxing! hehe"}
            cardContent={"Keep that pesky mustache in check (and other things)"}
            cardImgSrc={"https://t3.ftcdn.net/jpg/01/44/24/88/360_F_144248813_1PduH2CEnX2mdR9UpVNerzZs6Kv64qsw.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"We offer many different facials, from vegan to pumpkin"}
          />
          <ServicesCards
            cardTitle={"Facials!"}
            cardContent={"We offer many different facials, from vegan to pumpkin"}
            cardImgSrc={"https://media.allure.com/photos/5c2e8ec54325fe2d62c0943a/16:9/w_2560%2Cc_limit/how-often-should-you-get-a-facial-lede.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"We offer many different facials, from vegan to pumpkin"}
          />
          <ServicesCards
            cardTitle={"Dermabrasion!"}
            cardContent={"Keep that pesky mustache in check"}
            cardImgSrc={"https://www.shutterstock.com/image-photo/cosmetologist-performs-hydropiling-beauty-salon-600nw-2208041711.jpg"}
            cardLinkTo={"/booking"}
            cardOverlayContent={"We offer many different facials, from vegan to pumpkin"}
          />
        </div>
      </div>

      <div className="pb-5"></div>
    </>
  )
}

export default about
