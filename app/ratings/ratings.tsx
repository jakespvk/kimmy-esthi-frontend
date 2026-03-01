"use client";

import { Dot, Sun } from "lucide-react";
import { glassAntiqua } from "../fonts";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Rating } from "../types";
import { getAllRatings, savePostRating } from "../api";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";

export default function Ratings() {

  const { data, isPending, error } = useQuery({
    queryKey: ['ratings'],
    queryFn: async () => await getAllRatings(),
  });

  if (isPending) return (
    <div className="mx-auto">Loading reviews...</div>
  )

  if (error) return (
    <div className="mx-auto">There was an error loading reviews! Please refresh the page</div>
  )

  return (
    <div className="lg:max-w-4/5 mx-auto">
      <div className="flex justify-center">
        <h1 id="reviews" className={`scroll-mt-36 md:scroll-mt-18 p-5 md:p-10 headline ${glassAntiqua.className}`}>Reviews</h1>
      </div>

      <ReviewForm />
      <div className="reviews-cards">
        {data.map((rating: Rating, index: number) => (
          <Review key={index} review={rating} />
        ))}
      </div>
    </div>
  )
}

const Review = (props: { review: Rating }) => {
  return (
    <div className="p-5 mx-auto my-auto">
      <div className="card rounded-3xl bg-base-100 shadow-xl card-multiple-border">
        <div className="card-body mt-0 pt-0">
          <div id="rating-title-section" className="flex items-center flex-wrap">
            <h2 id="card_title" className="max-sm:mr-3 card-title tracking-wide text-center text-2xl my-2">{props.review.title}</h2>
            <Dot className="hidden sm:inline" />
            <div id="rating-suns" className="card-actions">
              {Array.from({ length: 5 }, ((_, key) =>
                <Sun className={key > (props.review.rating - 1) ? "text-muted" : "text-amber-400"} key={key} />
              ))}
            </div>
          </div>
          {!props.review.hideName && <p className="lg:text-lg text-amber-400">{props.review.author}</p>}
          <p className="lg:text-lg">{props.review.content}</p>
        </div>
      </div >
    </div>
  )
}

const ratingFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(150, "Title must not exceed 150 characters, please consider moving something to content of review. Thanks!"),
  author: z.string().min(1, "Author name is required, but if you choose, will not be shared publicly."),
  hideName: z.boolean(),
  rating: z.number().min(1, "Please select a suns rating 1 through 5").max(5, "Please select a suns rating 1 through 5"),
  content: z.string().max(1000, "Content must not exceed 1000 characters, sorry about that and thank you for writing!"),
})

const ReviewForm = () => {

  const form = useForm<z.infer<typeof ratingFormSchema>>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      title: "",
      author: "",
      hideName: false,
      rating: 0,
      content: "",
    },
  })

  async function postRating(values: z.infer<typeof ratingFormSchema>) {
    await savePostRating(values as Rating);
    form.reset();
    // TODO invalidate cached reviews and refetch, or optimistically update the ui
  }

  return (
    <div className="w-200 max-w-full p-5 mx-auto my-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(postRating)}>
          <div className="card rounded-3xl bg-base-100 shadow-xl">
            <div className="card-body mt-0 pt-0">
              <div id="rating-title-section" className="flex items-start flex-wrap mt-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center">
                          <Label className="mr-3">Title:</Label>
                          <Input className="mr-3 my-2" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div id="rating-suns" className="card-actions">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            className="flex gap-1"
                            value={String(field.value)}
                            onValueChange={(value) => field.onChange(Number(value))}
                          >
                            {Array.from({ length: 5 }, ((_, i) => {
                              const value = i + 1;
                              const filled = value <= field.value;
                              return (
                                <div key={value}>
                                  <RadioGroupItem value={String(value)} id={`rating=${value}`} className="sr-only" />
                                  <Label htmlFor={`rating=${value}`} className="cursor-pointer">
                                    <Sun className={filled ? "text-amber-400" : "text-muted hover:text-amber-400"} />
                                  </Label>
                                </div>
                              )
                            }))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center">
                        <Label className="mr-3">Author:</Label>
                        <Input className="text-amber-400 w-80 max-w-full" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hideName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center my-2">
                        <Checkbox className="mr-3" defaultChecked={field.value} onCheckedChange={field.onChange} id="hideName" />
                        <Label htmlFor="hideName">Please hide my name</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Label className="mb-2">Content:</Label>
                        <textarea rows={2} className="field-sizing-content text-sm w-full max-w-full min-h-[81px] border border-amber-500 focused:border-amber-800 focus-visible:ring-1 ring-amber-700 focus:outline-none shadow-sm rounded-sm p-2.5 resize-none" {...field}></textarea>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center items-center mb-5">
              <Button type="submit">Submit Review</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
