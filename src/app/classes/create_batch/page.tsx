'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
// import DbClass from '@/firebase_configs/DB/DbClass';
import { useSessionStore, useUIStore } from '@/store';

const createBatchSchema = z.object({
  batchName: z.string().min(2, {
    message: 'Class name must be at least 2 characters.',
  }),
  batchClassName: z.string().min(2, {
    message: 'Batch class name must be at least 2 character.',
  }),
  startYear: z.string().min(4, {
    message: 'Start year must be valid year.',
  }),
  endYear: z.string().min(4, {
    message: 'End year must be valid year.',
  }),
});

export type CreateBatchFields = z.infer<typeof createBatchSchema>;

function CreateBatchPage() {
  const form = useForm<CreateBatchFields>({
    resolver: zodResolver(createBatchSchema),
    defaultValues: {
      batchName: '',
      batchClassName: '',
      startYear: '',
      endYear: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useUIStore();
  const { institute } = useSessionStore();
  const onSubmit = async (values: CreateBatchFields) => {
    if (!institute) return;
    try {
      setLoading(true);
      // await DbClass.createClass(values, institute?.InstituteId);
      setSnackbar({
        open: true,
        message: 'Batch created successfully',
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
          onClick={() => router.push('/classes')}
          className="flex cursor-pointer items-center gap-2 text-2xl font-semibold text-indigo-500"
        >
          <ArrowLeft />
          <span>Create Classroom</span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto mt-5 w-full space-y-6 rounded-md bg-surfaceLight p-6 dark:bg-surfaceDark  md:max-w-3xl"
          >
            <div className="text-2xl font-semibold sm:text-3xl">
              Batch Details
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="batchName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Name</FormLabel>
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
                name="batchClassName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Class Name</FormLabel>
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
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year</FormLabel>
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
                name="endYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Year</FormLabel>
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
            description="Creating your institute"
          />
        </Form>
      </div>
    </div>
  );
}

export default CreateBatchPage;
