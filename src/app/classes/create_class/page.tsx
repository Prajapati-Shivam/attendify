'use client';

// import LoaderDialog from '@/components/common/dialogs/LoaderDialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { HiArrowCircleLeft } from 'react-icons/hi';
import { z } from 'zod';

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
import DbClass from '@/firebase_configs/DB/DbClass';
import { useSessionStore } from '@/store';

const createClassSchema = z.object({
  className: z.string().min(2, {
    message: 'Class name must be at least 2 characters.',
  }),
  startYear: z.string().min(4, {
    message: 'Start year must be valid year.',
  }),
  endYear: z.string().min(4, {
    message: 'End year must be valid year.',
  }),
});

export type CreateClassFields = z.infer<typeof createClassSchema>;

function CreateClassroomPage() {
  const form = useForm<CreateClassFields>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      className: '',
      startYear: '',
      endYear: '',
    },
  });

  // const [loading, setLoading] = useState(false);

  const { institute } = useSessionStore();

  const onSubmit = async (values: CreateClassFields) => {
    if (!institute) return;
    try {
      await DbClass.createClass(values, institute?.InstituteId);
    } catch (error) {
      console.log(error);
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
          <HiArrowCircleLeft />
          <span>Create Classroom</span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto mt-5 w-full space-y-6 rounded-md bg-surfaceLight p-6 dark:bg-surfaceDark  md:max-w-3xl"
          >
            <div className="text-2xl font-semibold sm:text-3xl">
              Class Details
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
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
                        type="date"
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
                        type="date"
                        placeholder=""
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
          {/* <LoaderDialog
            loading={loading}
            title="Please wait..."
            description="Creating your institute"
          /> */}
        </Form>
      </div>
    </div>
  );
}

export default CreateClassroomPage;
