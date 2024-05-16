'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { REACT_QUERY_KEYS } from '@/@types/enum';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DbClass from '@/firebase_configs/DB/DbClass';
import useFetchClasses from '@/hooks/fetch/useFetchClasses';
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

import DialogDrawer from '../common/dialogs/DialogDrawer';
import LoaderDialog from '../common/dialogs/LoaderDialog';
import InputSelect from '../common/inputs/InputSelect';

const subjectFormSchema = z.object({
  subjectClassId: z.string().min(2, {
    message: 'Subject class must be at least 2 characters.',
  }),
  subjectName: z.string().min(3, {
    message: 'Subject name must be at least 3 characters.',
  }),
});

export type SubjectFormFields = z.infer<typeof subjectFormSchema>;

export function CreateSubject() {
  const form = useForm<SubjectFormFields>({
    resolver: zodResolver(subjectFormSchema),
  });

  const [opened, setOpened] = useState(false);

  const [loading, setLoading] = useState(false);

  const { institute } = useSessionStore();

  const queryClient = useQueryClient();

  const { data: classes } = useFetchClasses({});

  const onSubmit = async (data: SubjectFormFields) => {
    if (!institute) return;
    try {
      setLoading(true);

      await DbClass.createSubject(institute.InstituteId, data);

      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.SUBJECT_LIST],
      });

      form.reset();
      setLoading(false);
      setOpened(false);
      showSnackbar({
        message: 'Subject created successfully',
        type: 'success',
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      errorHandler(error);
    }
  };

  return (
    <DialogDrawer
      opened={opened}
      setOpened={setOpened}
      title="Create Subject"
      trigger={
        <Button className="mt-5 hover:bg-blueButtonHoverBg">
          Create Subject
        </Button>
      }
      positiveCallback={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <FormField
            control={form.control}
            name="subjectClassId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Class</FormLabel>
                <FormControl>
                  <InputSelect
                    data={classes.map(res => {
                      return { label: res.ClassName, value: res.ClassId };
                    })}
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="Subject class"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Name</FormLabel>
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
          <DialogFooter>
            <Button type="submit" className="hover:bg-blueButtonHoverBg">
              Create
            </Button>
          </DialogFooter>
        </form>
        <LoaderDialog loading={loading} title="Loading..." />
      </Form>
    </DialogDrawer>
  );
}
