'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import LoaderDialog from '@/components/common/dialogs/LoaderDialog';
import CourseInput from '@/components/common/inputs/CourseInput';
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
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

const createClassSchema = z.object({
  ClassName: z.string().min(2, {
    message: 'Class name must be at least 2 characters.',
  }),
  ClassCourseId: z.string().min(1, {
    message: 'Course name is required.',
  }),
  ClassAcademicStartYear: z.string().min(4, {
    message: 'Start year must be valid year.',
  }),
  ClassAcademicEndYear: z.string().min(4, {
    message: 'End year must be valid year.',
  }),
});

export type CreateClassFields = z.infer<typeof createClassSchema>;

function CreateClassroomPage() {
  const form = useForm<CreateClassFields>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      ClassName: '',
      ClassCourseId: '',
      ClassAcademicStartYear: '',
      ClassAcademicEndYear: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const { institute } = useSessionStore();

  const onSubmit = async (values: CreateClassFields) => {
    if (!institute) return;
    try {
      setLoading(true);
      console.log(values);
      // await DbClass.createClass(values, institute?.InstituteId);
      showSnackbar({
        message: 'Classroom created successfully',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader route="classes">Create Classroom</PageHeader>
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
              name="ClassName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
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
              name="ClassCourseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <CourseInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ClassAcademicStartYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Year</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
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
              name="ClassAcademicEndYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Year</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder=""
                      {...field}
                      className="border-inputBorderLight dark:border-inputBorderDark dark:bg-primaryVariantDark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{' '}
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
          description="Creating classroom."
        />
      </Form>
    </PageContainer>
  );
}

export default CreateClassroomPage;
