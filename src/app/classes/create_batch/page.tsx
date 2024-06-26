'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import SelectYear from '@/components/classroom/SelectYear';
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
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
// import DbClass from '@/firebase_configs/DB/DbClass';
import { useSessionStore } from '@/store';

const createBatchSchema = z.object({
  batchName: z.string().min(2, {
    message: 'Class name must be at least 2 characters.',
  }),
  batchClassName: z.string().min(2, {
    message: 'Batch class name must be at least 2 character.',
  }),
  startYear: z.string(),
  endYear: z.string(),
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
  const { institute } = useSessionStore();
  const onSubmit = async (values: CreateBatchFields) => {
    if (!institute) return;
    try {
      setLoading(true);
      // await DbClass.createClass(values, institute?.InstituteId);
      console.log(values);
      showSnackbar({
        message: 'Batch created successfully',
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
      <PageHeader route="classes">Create Batch</PageHeader>
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
                    <SelectYear field={field} />
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
                    <SelectYear field={field} />
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
          description="Creating your batch"
        />
      </Form>
    </PageContainer>
  );
}

export default CreateBatchPage;
