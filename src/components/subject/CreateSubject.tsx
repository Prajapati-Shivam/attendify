'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { REACT_QUERY_KEYS } from '@/@types/enum';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
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
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

import LoaderDialog from '../common/dialogs/LoaderDialog';
import CourseInput from '../common/inputs/CourseInput';

const subjectFormSchema = z.object({
  subjectCourse: z.string().min(2, {
    message: 'Subject course must be at least 2 characters.',
  }),
  subjectName: z.string().min(4, {
    message: 'Subject name must be at least 4 characters.',
  }),
});

export type SubjectFormFields = z.infer<typeof subjectFormSchema>;

export function CreateSubject() {
  const form = useForm<SubjectFormFields>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      subjectCourse: '',
      subjectName: '',
    },
  });

  const [opened, setOpened] = useState(false);

  const [loading, setLoading] = useState(false);

  const { institute } = useSessionStore();

  const queryClient = useQueryClient();

  const onSubmit = async (data: SubjectFormFields) => {
    if (!institute) return;
    try {
      setLoading(true);

      await DbClass.createSubject({
        instituteId: institute.InstituteId,
        courseId: data.subjectCourse,
        subjectName: data.subjectName,
      });

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

  if (window.innerWidth > 640) {
    return (
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogTrigger asChild>
          <Button className="mt-5 hover:bg-blueButtonHoverBg">
            Create Subject
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Subject</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <FormField
                control={form.control}
                name="subjectCourse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Course</FormLabel>
                    <FormControl>
                      <CourseInput field={field} />
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
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={opened} onOpenChange={setOpened}>
      <DrawerTrigger asChild>
        <Button className="mt-5 hover:bg-blueButtonHoverBg">
          Create Subject
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-[425px]">
        <DrawerHeader>
          <DrawerTitle>Create Subject</DrawerTitle>
          <DrawerClose />
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 px-4"
          >
            <FormField
              control={form.control}
              name="subjectCourse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Course</FormLabel>
                  <FormControl>
                    <CourseInput field={field} />
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
      </DrawerContent>
    </Drawer>
  );
}
