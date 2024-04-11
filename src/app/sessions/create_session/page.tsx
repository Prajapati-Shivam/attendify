'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useSessionStore, useUIStore } from '@/store';

const createSessionSchema = z.object({
  sessionClassName: z.string().min(2).max(50),
  sessionFacultyName: z.string().min(2).max(50),
  sessionSubjectName: z.string().min(2).max(50),
  sessionStartTime: z.string(),
  sessionEndTime: z.string(),
  sessionDate: z.string(),
});

export type CreateSessionFields = z.infer<typeof createSessionSchema>;

function CreateSessionPage() {
  const form = useForm<CreateSessionFields>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      sessionClassName: '',
      sessionFacultyName: '',
      sessionSubjectName: '',
      sessionStartTime: '',
      sessionEndTime: '',
      sessionDate: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const { setSnackbar } = useUIStore();

  const { institute } = useSessionStore();

  const onSubmit = async (values: CreateSessionFields) => {
    if (!institute) return;
    try {
      setLoading(true);
      // implement create session logic here
      console.log(values);
      setSnackbar({
        open: true,
        message: 'Session created successfully',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <div
          onClick={() => router.push('/sessions')}
          className="flex cursor-pointer items-center gap-2 text-2xl font-semibold text-indigo-500"
        >
          <ArrowLeft />
          <span>Sessions</span>
        </div>
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
                name="sessionClassName"
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
                name="sessionFacultyName"
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
                name="sessionSubjectName"
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
                name="sessionStartTime"
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
              />{' '}
              <FormField
                control={form.control}
                name="sessionEndTime"
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
      </div>
    </div>
  );
}

export default CreateSessionPage;
