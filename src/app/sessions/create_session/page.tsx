'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import DbSession from '@/firebase_configs/DB/DbSession';
import useFetchClasses from '@/hooks/fetch/useFetchClasses';
import useFetchFaculties from '@/hooks/fetch/useFetchFaculties';
import useFetchSubjects from '@/hooks/fetch/useFetchSubjects';
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

const createSessionSchema = z.object({
  SessionClassName: z.string().min(2),
  SessionClassId: z.string().min(2),
  SessionFacultyName: z.string().min(2),
  SessionFacultyId: z.string().min(2),
  SessionSubjectName: z.string().min(2),
  SessionSubjectId: z.string().min(2),
  SessionStartTime: z.string(),
  SessionEndTime: z.string(),
  SessionDate: z.date(),
});

export type CreateSessionFields = z.infer<typeof createSessionSchema>;

function CreateSessionPage() {
  const form = useForm<CreateSessionFields>({
    resolver: zodResolver(createSessionSchema),
  });

  const [loading, setLoading] = useState(false);

  const { institute } = useSessionStore();

  const { data: faculties } = useFetchFaculties({});

  const { data: classes } = useFetchClasses({});

  const { data: subjects } = useFetchSubjects({
    classId: form.watch('SessionClassId'),
  });

  const [classId, subjectId, facultyId] = form.watch([
    'SessionClassId',
    'SessionSubjectId',
    'SessionFacultyId',
  ]);

  useEffect(() => {
    if (classId) {
      const selectedClassName = classes.find(
        res => res.ClassId === classId,
      )?.ClassName;

      form.setValue('SessionClassName', selectedClassName || '');
    } else {
      form.setValue('SessionClassName', '');
    }
  }, [classId]);

  useEffect(() => {
    if (subjectId) {
      const selectedSubjectName = subjects.find(
        res => res.SubjectId === subjectId,
      )?.SubjectName;

      form.setValue('SessionSubjectName', selectedSubjectName || '');
    } else {
      form.setValue('SessionSubjectName', '');
    }
  }, [subjectId]);

  useEffect(() => {
    if (facultyId) {
      const selectedFaculty = faculties.find(
        res => res.FacultyId === facultyId,
      );

      const selectedFacultyName = `${selectedFaculty?.FacultyFirstName} ${selectedFaculty?.FacultyLastName}`;

      form.setValue('SessionFacultyName', selectedFacultyName);
    } else {
      form.setValue('SessionFacultyName', '');
    }
  }, [facultyId]);

  const queryClient = useQueryClient();

  const router = useRouter();

  const onSubmit = async (data: CreateSessionFields) => {
    if (!institute) return;
    try {
      setLoading(true);

      await DbSession.createSession(institute.InstituteId, data);

      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.SESSION_LIST],
      });

      showSnackbar({
        message: 'Session created successfully',
        type: 'success',
      });
      form.reset();
      setLoading(false);

      router.push('/sessions');
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
              name="SessionClassId"
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
                      placeholder="Select ClassName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="SessionSubjectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <InputSelect
                      data={subjects.map(res => {
                        return {
                          label: res.SubjectName,
                          value: res.SubjectId,
                        };
                      })}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Subject"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="SessionFacultyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty Name</FormLabel>
                  <FormControl>
                    <InputSelect
                      data={faculties.map(res => {
                        return {
                          label: `${res.FacultyFirstName} ${res.FacultyLastName}`,
                          value: res.FacultyId,
                        };
                      })}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Faculty"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SessionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
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
          description="Creating session."
        />
      </Form>
    </PageContainer>
  );
}

export default CreateSessionPage;
