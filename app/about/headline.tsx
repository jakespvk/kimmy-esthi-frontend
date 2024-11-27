import Link from "next/link"
import React from 'react'
import { Glass_Antiqua } from 'next/font/google'

const fraunces = Glass_Antiqua({ weight: '400', subsets: ['latin'] })

const Headline = ({text} : {text: string}) => {

  return (
      <>

      <div className="text-center lg:w-2/3 mx-auto my-auto">

          <div className={fraunces.className}>
          <Link href="/">
          <h1 id="mainTitle" className="text-7xl p-10 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 hover:bg-gradient-to-l inline-block text-transparent bg-clip-text">
          {text}
          </h1>
          </Link>
          </div>

      </div>

      </>
  )
}

export default Headline
