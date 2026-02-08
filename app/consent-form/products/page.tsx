"use client";

import { saveProductsUsed } from "@/app/api";
import { glassAntiqua } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Products(props: { searchParams: Promise<{ clientId: string }> }) {
  const router = useRouter();

  async function submitProductsUsed(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const products: string = formData.get('products') as string;
    await saveProductsUsed((await props.searchParams).clientId, products);
    router.push("/consent-form/skincare-history?" + new URLSearchParams({ clientId: (await props.searchParams).clientId }));
  }

  return (
    <div>
      <form onSubmit={submitProductsUsed} className="mx-3">
        <div className="flex justify-center">
          <h3 id="consent-form--products-used" className={`subheading ${glassAntiqua.className}`}>What products are you currently using at home?</h3>
        </div>
        <div className="flex justify-center">
          <textarea name="products" rows={2} placeholder="Versed Light Moisturizer, Dermalogica Toner Pads..." className="field-sizing-content text-sm w-125 max-w-full min-h-[81px] border border-amber-500 focused:border-amber-800 focus-visible:ring-1 ring-amber-700 focus:outline-none shadow-sm rounded-sm p-2.5 resize-none"></textarea>
        </div>
        <div className="flex justify-center">
          <Button className="my-2" type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}

