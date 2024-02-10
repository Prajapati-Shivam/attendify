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
        className="mx-auto mt-5 w-full space-y-6 rounded-md bg-surfaceLight p-6 dark:bg-onSurfaceLight  md:max-w-3xl"
      >
        <div className="text-2xl font-semibold sm:text-3xl">
          Create Institute
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    className="border-inputBorderLight dark:border-inputBorderDark dark:bg-primaryVariantDark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className="border-inputBorderLight dark:border-inputBorderDark dark:bg-primaryVariantDark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
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
                    className="border-inputBorderLight dark:border-inputBorderDark dark:bg-primaryVariantDark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
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
                    className="border-inputBorderLight dark:border-inputBorderDark dark:bg-primaryVariantDark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
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
                    className="border-inputBorderLight dark:border-inputBorderDark dark:bg-primaryVariantDark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
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
                    className="border-inputBorderLight dark:border-inputBorderDark dark:bg-primaryVariantDark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-1 md:col-span-2">
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
                      className=" flex w-full rounded-md border border-inputBorderLight bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-inputBorderDark dark:bg-primaryVariantDark"
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
