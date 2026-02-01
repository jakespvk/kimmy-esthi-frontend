import InstagramEmbed from "../social/InstagramEmbed"
// import Headline from "@/components/ui/headline"
import { glassAntiqua } from "../fonts";

const About = () => {
  const classname = "text-lg md:text-xl py-3";
  return (
    <>
      <div className="flex justify-center">
        <h1 id="about" className={`scroll-mt-18 headline ${glassAntiqua.className}`}>About SunsetKimcare</h1>
      </div>

      <div className="lg:w-4/5 px-5 mx-auto my-auto">
        <p className={classname}>
          Hi! I’m Kimmy Ancheta, a licensed esthetician based in Long Beach, CA but also offering services in Santa Ana. I specialize in corrective facials, acne care, glow-focused treatments, and Brow Laminations!
        </p>
        <p className={classname}>
          My approach to skincare blends a mix of advanced education, relaxation, and results-driven techniques so every client leaves feeling confident and cared for; both inside and out!
        </p>
        <p className={classname}>
          My journey into esthetics started when I was in middle school. I struggled so much with my own skin over the years and became obsessed with learning how to heal it / I fell in love with the feeling of helping someone feel confident or even just good in their own skin. Since then, I’ve made it my mission to create a space where skin REALLY meets self-care; where each treatment feels like both a reset and a little celebration of you.
        </p>
        <p className={classname}>
          When I’m not in the treatment room, you can find me teaching esthetics to future estheticians, brain-rotting on social media, yelling into a mic in karaoke rooms, watching shows &amp; movies with loved ones, and sometimes you’ll even see me on a big screen; acting or modeling! I’m passionate about continuing skin education, staying inspired, and bringing my clients the latest in advanced treatments that truly work.
        </p>
        <p className={classname}>
          Whether you’re here for a glow-up, a deep reset, or to start your skincare journey, I can’t wait to meet you and help you fall in love with your skin again. 🤍
        </p>
      </div>

      {/*<Headline text={"Socials"} />*/}

      <div className="flex justify-center">
        <h1 id="socials" className={`scroll-mt-18 headline ${glassAntiqua.className}`}>Socials</h1>
      </div>

      <div className="text-center lg:w-2/3 px-5 mx-auto my-auto">
        <InstagramEmbed />
      </div>
    </>
  )
}

export default About
