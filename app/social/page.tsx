import React from 'react';
import Headline from "../about/headline";
import InstagramEmbed from './InstagramEmbed';

export default function Social() {
  return (
    <>
      <Headline text={"Socials"} />

      <div className="text-center lg:w-2/3 px-5 mx-auto my-auto">
        <p className="text-2xl">Hello, welcome to my page
          About me yada yada blah blah blah
          I love skin and clear skin is my passion
          fill the space fill the space fill the space
          filling more space and more space and more space
          tesitng the extra space and the width restrictions
        </p>
        <InstagramEmbed />
      </div>
    </>
  );
}
