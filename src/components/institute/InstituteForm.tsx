'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Second name must be at least 2 characters.',
  }),
  instituteName: z.string().min(2, {
    message: 'Institute name must be at least 2 characters.',
  }),
  instituteAddress: z.string().min(2, {
    message: 'Institute address must be at least 8 characters.',
  }),
  institutePhone: z.string().min(2, {
    message: 'Institute phone number must be at least 10 digits.',
  }),
  instituteEmail: z.string().optional(),
  instituteWebsite: z.string().optional(),
});

export function InstituteForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      instituteName: '',
      instituteAddress: '',
      institutePhone: '',
      instituteEmail: '',
      instituteWebsite: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-5 w-[90%] rounded-md sm:w-[80%] md:w-[70%] lg:w-[50%] space-y-8 bg-surfaceLight dark:bg-slate-800 p-5 sm:p-10"
      >
        <h2 className="text-2xl sm:text-4xl font-semibold">Create Institute</h2>
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="border-inputBorderLight dark:border-inputBorderDark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="border-inputBorderLight dark:border-inputBorderDark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-x-8">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="instituteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="border-inputBorderLight dark:border-inputBorderDark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="institutePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="border-inputBorderLight dark:border-inputBorderDark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-x-8">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="instituteEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Email (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="border-inputBorderLight dark:border-inputBorderDark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="instituteWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Website (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="border-inputBorderLight dark:border-inputBorderDark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="instituteAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute Address</FormLabel>
              <FormControl>
                <textarea
                  placeholder=""
                  rows={3}
                  {...field}
                  className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-inputBorderLight dark:border-inputBorderDark"
                ></textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='hover:bg-blueButtonHoverBg'>Submit</Button>
      </form>
    </Form>
  );
}
