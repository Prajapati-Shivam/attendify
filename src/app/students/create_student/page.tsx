'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { REACT_QUERY_KEYS } from '@/@types/enum';
import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import LoaderDialog from '@/components/common/dialogs/LoaderDialog';
import { InputDatePicker } from '@/components/common/inputs/InputDatePicker';
import InputSelect from '@/components/common/inputs/InputSelect';
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
import DbStudent from '@/firebase_configs/DB/DbStudent';
import useFetchClasses from '@/hooks/fetch/useFetchClasses';
import useFetchCourses from '@/hooks/fetch/useFetchCourses';
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

const createStudentSchema = z.object({
  StudentFullName: z.string().min(3, { message: 'This field is required' }),
  StudentPhone: z.string().min(3, { message: 'This field is required' }),
  StudentEmail: z
    .string()
    .min(3, { message: 'This field is required' })
    .regex(ConstRegex.EMAIL_OPTIONAL),
  StudentPassword: z.string().min(3, { message: 'This field is required' }),
  StudentUniqueId: z.string().min(3, { message: 'This field is required' }),
  StudentRollNo: z.string().min(1, { message: 'This field is required' }),
  StudentCourseId: z.string().min(3, { message: 'This field is required' }), //* Use select input to select from existing course and store its id
  StudentClassId: z.string().min(3, { message: 'This field is required' }), //* Use select input to select from existing class and store its id
  StudentClassArmId: z.string().nullable().optional(),
  StudentCourseStartYear: z.date(),
  StudentCourseEndYear: z.date(),
});

export type CreateStudentFields = z.infer<typeof createStudentSchema>;

const CreateStudent = () => {
  const form = useForm<CreateStudentFields>({
    resolver: zodResolver(createStudentSchema),
  });

  const { institute } = useSessionStore();

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const router = useRouter();

  const onSubmit = async (data: CreateStudentFields) => {
    if (!institute) return;
    try {
      setLoading(true);

      await DbStudent.createStudent(data, institute.InstituteId);

      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.STUDENT_LIST],
      });

      form.reset();

      showSnackbar({
        message: 'Student created successfully',
        type: 'success',
      });

      setLoading(false);

      router.push('/students');
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  const { data: classes } = useFetchClasses({});
  const { data: courses } = useFetchCourses({});

  return (
    <PageContainer>
      <PageHeader route="students">Create Student</PageHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-5 w-full space-y-6 rounded-md bg-surfaceLight p-6 dark:bg-surfaceDark  md:max-w-3xl"
        >
          <div className="text-2xl font-semibold sm:text-3xl">
            Student Details
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
              name="StudentPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
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
              name="StudentEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
              name="StudentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
            {/* select input will used later */}
            <FormField
              control={form.control}
              name="StudentCourseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <InputSelect
                      data={courses.map(res => {
                        return {
                          label: res.CourseShortName,
                          value: res.CourseId,
                        };
                      })}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Course"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* select input will used later */}
            <FormField
              control={form.control}
              name="StudentClassId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <InputSelect
                      data={classes.map(res => {
                        return {
                          label: res.ClassName,
                          value: res.ClassId,
                        };
                      })}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Class"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="StudentCourseStartYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Start Year</FormLabel>
                  <FormControl>
                    <InputDatePicker
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="StudentCourseEndYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course End Year</FormLabel>
                  <FormControl>
                    <InputDatePicker
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="StudentClassArmId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      onChange={field.onChange}
                      value={field.value || ''}
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
      <LoaderDialog loading={loading} title="Creating student..." />
    </PageContainer>
  );
};

export default CreateStudent;
