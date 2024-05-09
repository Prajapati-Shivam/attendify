'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { REACT_QUERY_KEYS } from '@/@types/enum';
import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import LoaderDialog from '@/components/common/dialogs/LoaderDialog';
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
import DbFaculty from '@/firebase_configs/DB/DbFaculty';
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

const createFacultySchema = z.object({
  FacultyFirstName: z.string().min(3, { message: 'First name is required' }),
  FacultyLastName: z.string().min(3, { message: 'Last name is required' }),
  FacultyPhone: z
    .string()
    .min(3, { message: 'Phone number is required' })
    .regex(ConstRegex.PHONE_NUMBER),
  FacultyEmail: z
    .string()
    .min(3, { message: 'Email is required' })
    .regex(ConstRegex.EMAIL_OPTIONAL),
  FacultyPassword: z.string().min(3, { message: 'Password is required' }),
});

export type CreateFacultyFields = z.infer<typeof createFacultySchema>;

function CreateFacultyPage() {
  const form = useForm<CreateFacultyFields>({
    resolver: zodResolver(createFacultySchema),
    defaultValues: {
      FacultyFirstName: '',
      FacultyLastName: '',
      FacultyPhone: '',
      FacultyEmail: '',
      FacultyPassword: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const { institute } = useSessionStore();

  const router = useRouter();

  const queryClient = useQueryClient();

  const onSubmit = async (values: CreateFacultyFields) => {
    if (!institute) return;
    try {
      setLoading(true);
      await DbFaculty.createFaculty(institute.InstituteId, values);
      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.FACULTY_LIST],
      });
      showSnackbar({
        message: 'Faculty created successfully',
        type: 'success',
      });
      setLoading(false);
      router.push('/faculties');
    } catch (error) {
      console.log(error);
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader route="faculties">Create Faculty</PageHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-5 w-full space-y-6 rounded-md bg-surfaceLight p-6 dark:bg-surfaceDark  md:max-w-3xl"
        >
          <div className="text-2xl font-semibold sm:text-3xl">
            Faculty Details
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="FacultyFirstName"
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
              name="FacultyLastName"
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
              name="FacultyPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
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
              name="FacultyEmail"
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
              name="FacultyPassword"
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

export default CreateFacultyPage;
