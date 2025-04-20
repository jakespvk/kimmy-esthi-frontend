// import Image from 'next/image'
import { Glass_Antiqua } from 'next/font/google';
import { Ms_Madi } from 'next/font/google';

const fraunces = Glass_Antiqua({ weight: '400', subsets: ['latin'] });
const msMadi = Ms_Madi({ weight: '400', subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <div
                className="hero min-h-screen bg-cover overscroll-none"
                style={{
                    backgroundImage: "url(https://t4.ftcdn.net/jpg/05/01/83/79/360_F_501837926_xvM4Ym7pql243YOrjmct5NCXjFTxz11v.jpg)",
                }}>
                <div className="hero-content text-center">
                    <div className="">
                        <div className={fraunces.className}>
                            <h1 className="mb-5 text-[10rem]/23 ">SunsetKimcare</h1>
                        </div>
                        <p className={`${msMadi.className} mb-5 text-6xl`}>
                            Let me make something clear... your skin
                        </p>
                        <a role="button" className="btn btn-accent mb-10 text-lg px-4 py-2" href="/about">Get Started</a>
                    </div>
                </div>
            </div>
        </>
    )
}
