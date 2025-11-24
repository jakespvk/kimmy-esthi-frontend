"use client";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
})

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Admin = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(`${baseUrl}/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values })
    });
    if (!response.ok) {
      console.error("err:", response.statusText);
    }
    localStorage.setItem("super-secret-token", await response.json());
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex items-center justify-center h-svh">
      <div className="flex items-center justify-center max-w-4/5 md:max-w-1/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your private password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-center'>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Admin
