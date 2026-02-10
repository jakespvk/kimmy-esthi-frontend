"use client";

import { saveProductsUsed } from "@/app/api";
import { glassAntiqua } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const productsSchema = z.object({
  products: z.string()
    .min(5, "Please list at least one product you're currently using")
    .max(500, "Please keep your answer under 500 characters"),
});

export default function Products(props: { searchParams: Promise<{ clientId: string }> }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof productsSchema>>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      products: "",
    },
  });

  async function onSubmit(values: z.infer<typeof productsSchema>) {
    await saveProductsUsed((await props.searchParams).clientId, values.products);
    form.reset();
    router.push("/consent-form/skincare-history?" + new URLSearchParams({ clientId: (await props.searchParams).clientId }));
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-3 space-y-4">
          <div className="flex justify-center">
            <h3 id="consent-form--products-used" className={`subheading ${glassAntiqua.className}`}>What products are you currently using at home?</h3>
          </div>
          <FormField
            control={form.control}
            name="products"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-center">
                  <FormControl>
                    <textarea rows={2} placeholder="Versed Light Moisturizer, Dermalogica Toner Pads..." className="field-sizing-content text-sm w-125 max-w-full min-h-[81px] border border-amber-500 focused:border-amber-800 focus-visible:ring-1 ring-amber-700 focus:outline-none shadow-sm rounded-sm p-2.5 resize-none" {...field}></textarea>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button className="my-2" type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

