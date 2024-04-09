'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

// import LoaderDialog from '../common/dialogs/LoaderDialog';

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

  const onSubmit = async (data: CourseFormFields) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-blueButtonHoverBg">Create Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
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
          </form>
          {/* <LoaderDialog
              loading={loading}
              title="Please wait..."
              description="Creating your institute"
            /> */}
        </Form>
        <DialogFooter>
          <Button type="submit" className="hover:bg-blueButtonHoverBg">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
