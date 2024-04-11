'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const courseFormSchema = z.object({
  fullName: z.string().min(4, {
    message: 'Full name must be at least 4 characters.',
  }),
  shortName: z.string().min(2, {
    message: 'Short name must be at least 2 characters.',
  }),
});

export type CourseFormFields = z.infer<typeof courseFormSchema>;

export function CreateCourse() {
  const form = useForm<CourseFormFields>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      fullName: '',
      shortName: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const { institute } = useSessionStore();

  const onSubmit = async (data: CourseFormFields) => {
    if (!institute) return;
    try {
      setLoading(true);
      await DbClass.createNewCourse(
        institute.InstituteId,
        data.fullName,
        data.shortName,
      );

      setLoading(false);
      showSnackbar({ message: 'Course created successfully', type: 'success' });
    } catch (error) {
      setLoading(false);
      console.log(error);
      errorHandler(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5 hover:bg-blueButtonHoverBg">
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Full Name</FormLabel>
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
              name="shortName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Short Name</FormLabel>
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
