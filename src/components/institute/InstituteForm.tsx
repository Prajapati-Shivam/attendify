'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
import DbUser from '@/firebase_configs/DB/DbUser';
import { useSessionStore, useUIStore } from '@/store';

import LoaderDialog from '../common/dialogs/LoaderDialog';

const instituteFormSchema = z.object({
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

export type InstituteFormFields = z.infer<typeof instituteFormSchema>;

export function InstituteForm() {
  // 1. Define your form.
  const form = useForm<InstituteFormFields>({
    resolver: zodResolver(instituteFormSchema),
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

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { setSnackbar } = useUIStore();

  const { admin, setInstitute } = useSessionStore();

  // 2. Define a submit handler.
  const onSubmit = async (values: InstituteFormFields) => {
    if (!admin) return;
    try {
      setLoading(true);

      const institute = await DbUser.createNewInstitute(values, admin.AdminId);

      setSnackbar({
        open: true,
        message: 'Institute created successfully',
        type: 'success',
      });
      setInstitute(institute);
      setLoading(false);
      router.push('/');
    } catch (error) {
      setLoading(false);
      console.log(error);
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        type: 'error',
      });
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-5 w-full space-y-6 rounded-md bg-surfaceLight p-6 dark:bg-onSurfaceLight  md:max-w-3xl"
      >
        <div className="text-2xl font-semibold sm:text-3xl">
          Institute Details
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
      <LoaderDialog
        loading={loading}
        title="Please wait..."
        description="Creating your institute"
      />
    </Form>
  );
}
