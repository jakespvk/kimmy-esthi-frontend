import { glassAntiqua, msMadi } from "./fonts";

export default function Home() {
  return (
    <section className="min-h-svh flex flex-col items-center justify-center px-5 bg-gradient-to-b from-base-200 via-amber-500 to-base-200">
      <div className={glassAntiqua.className}>
        <h1 className="mb-5 text-5xl md:text-8xl lg:text-[10rem]/23 ">SunsetKimcare</h1>
      </div>
      <p className={`${msMadi.className} mb-5 text-center text-4xl md:text-5xl lg:text-6xl`}>
        Let me make something clear... your skin
      </p>
      <a role="button" className="btn btn-accent text-lg px-4 py-2" href="/services">Get Started</a>
    </section>
  )
}
