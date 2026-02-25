import InstagramEmbed from "@/components/InstagramEmbed";
import { glassAntiqua } from "../fonts";

export default function Social() {
  return (
    <div>
      <div className="flex justify-center">
        <h1 id="socials" className={`scroll-mt-36 md:scroll-mt-18 p-5 md:p-10 headline ${glassAntiqua.className}`}>Socials</h1>
      </div>

      <div className="text-center lg:w-2/3 p-5 mx-auto my-auto">
        <InstagramEmbed />
      </div>
    </div>
  )
}

