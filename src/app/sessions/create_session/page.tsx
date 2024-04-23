'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import LoaderDialog from '@/components/common/dialogs/LoaderDialog';
import FacultyInput from '@/components/common/inputs/FacultyInput';
import SubjectInput from '@/components/common/inputs/SubjectInput';
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

const createSessionSchema = z.object({
  SessionClassName: z.string().min(2).max(50),
  SessionFacultyName: z.string().min(2).max(50),
  SessionSubjectName: z.string().min(2).max(50),
  SessionStartTime: z.string(),
  SessionEndTime: z.string(),
  SessionDate: z.string(),
});

export type CreateSessionFields = z.infer<typeof createSessionSchema>;

function CreateSessionPage() {
  const form = useForm<CreateSessionFields>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      SessionClassName: '',
      SessionFacultyName: '',
      SessionSubjectName: '',
      SessionStartTime: '',
      SessionEndTime: '',
      SessionDate: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const { institute } = useSessionStore();

  const onSubmit = async (values: CreateSessionFields) => {
    if (!institute) return;
    try {
      setLoading(true);
      // implement create session logic here
      console.log(values);
      showSnackbar({
        message: 'Session created successfully',
        type: 'success',
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  return (
    <PageContainer>
      <PageHeader route="sessions">Create Session</PageHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-5 w-full space-y-6 rounded-md bg-surfaceLight p-6 dark:bg-surfaceDark  md:max-w-3xl"
        >
          <div className="text-2xl font-semibold sm:text-3xl">
            Session Details
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="SessionClassName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Name</FormLabel>
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
              name="SessionFacultyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty Name</FormLabel>
                  <FormControl>
                    <FacultyInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name="SessionSubjectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <SubjectInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name="SessionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
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
            />
            <FormField
              control={form.control}
              name="SessionStartTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
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
              name="SessionEndTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="time"
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

export default CreateSessionPage;
