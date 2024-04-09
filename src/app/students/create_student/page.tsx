'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiArrowCircleLeft } from 'react-icons/hi';
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
import { ConstRegex } from '@/constants/ConstRegex';

const createStudentSchema = z.object({
  StudentFullName: z.string().min(3, { message: 'This field is required' }),
  StudentPhone: z.string().min(3, { message: 'This field is required' }),
  StudentEmail: z
    .string()
    .min(3, { message: 'This field is required' })
    .regex(ConstRegex.EMAIL_OPTIONAL),
  StudentPassword: z.string().min(3, { message: 'This field is required' }),
  StudentUniqueId: z.string().min(3, { message: 'This field is required' }),
  StudentRollNo: z.string().min(3, { message: 'This field is required' }),
  StudentCourseId: z.string().min(3, { message: 'This field is required' }), //* Use select input to select from existing course and store its id
  StudentClassId: z.string().min(3, { message: 'This field is required' }), //* Use select input to select from existing class and store its id
  StudentClassArmId: z.string().nullable().optional(),
  StudentCourseStartYear: z.date(),
  StudentCourseEndYear: z.date(),
});

export type CreateStudentFields = z.infer<typeof createStudentSchema>;

const CreateStudent = () => {
  const router = useRouter();

  const form = useForm<CreateStudentFields>({
    resolver: zodResolver(createStudentSchema),
  });

  const onSubmit = async (data: CreateStudentFields) => {
    console.log(data);
  };
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <div
          onClick={() => router.push('/students')}
          className="flex cursor-pointer items-center gap-2 text-2xl font-semibold text-indigo-500"
        >
          <HiArrowCircleLeft />
          <span>Create Student</span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto mt-5 w-full space-y-6 rounded-md bg-surfaceLight p-6 dark:bg-surfaceDark  md:max-w-3xl"
          >
            <div className="text-2xl font-semibold sm:text-3xl">
              Class Details
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="StudentFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
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
                name="StudentRollNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll No</FormLabel>
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
                name="StudentUniqueId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique Id</FormLabel>
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
            </div>

            <Button
              type="submit"
              className="hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateStudent;
