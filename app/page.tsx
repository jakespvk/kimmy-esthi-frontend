import { glassAntiqua, msMadi } from "./fonts";

export default function Home() {
  return (
    <>
      <div className="hero min-h-dvh bg-cover overscroll-none bg-linear-30 from-amber-700 to-amber-400">
        {/* <div className="hero min-h-screen h-screen overflow-clip bg-cover bg-repeat bg-origin-border bg-fixed overscroll-none bg-[radial-gradient(ellipse_at_75%_25%,#d17d34,#cc9a43),radial-gradient(ellipse_at_25%_75%,#d17d34,#cc9a43)]"> */}
        <div className="hero-content text-center">
          <div>
            <div className={glassAntiqua.className}>
              <h1 className="mb-5 text-4xl md:text-[10rem]/23 ">SunsetKimcare</h1>
            </div>
            <p className={`${msMadi.className} mb-5 text-4xl md:text-6xl`}>
              Let me make something clear... your skin
            </p>
            <a role="button" className="btn btn-accent mb-10 text-lg px-4 py-2" href="/services">Get Started</a>
          </div>
        </div>
      </div>
    </>
  )
}
