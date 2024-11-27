import Image from 'next/image'
import { Glass_Antiqua } from 'next/font/google'

const fraunces = Glass_Antiqua({ weight: '400', subsets: ['latin'] })

export default function Home() {
  return (
      <>
      <div
      className="hero min-h-screen overscroll-none"
      style={{
          backgroundImage: "url(https://t4.ftcdn.net/jpg/05/01/83/79/360_F_501837926_xvM4Ym7pql243YOrjmct5NCXjFTxz11v.jpg)",
      }}>
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
      <div className={fraunces.className}>
      <h1 className="mb-5 text-7xl">SunsetKimcare</h1>
      </div>
      <p className="mb-5">
      Let me make something clear... your skin
      </p>
      <a role="button" className="btn btn-active btn-ghost hover:btn hover:rounded-full" href="/about">Get Started</a>
      </div>
      </div>
      </div>

      <div className="pb-5"></div>

      </>
  )
}
