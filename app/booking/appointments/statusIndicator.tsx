'use client'

import Image from 'next/image';

export default function StatusIndicator(status: string) {
  if (status === "Available") {
    return <Image src="https://png.pngtree.com/png-clipart/20201029/ourmid/pngtree-circle-clipart-green-circle-png-image_2382000.jpg" alt="green" className="h-3 w-3" />
  } else if (status === "Booked") {
    return <Image src="https://www.citypng.com/public/uploads/preview/red-dot-circle-icon-transparent-background-701751694972430m9tnpqnwnd.png" alt="red" className="h-3 w-3" />
  }

  return <div className="p-3 text-xl">&#9679;</div>
}
