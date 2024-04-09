'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { HiArrowCircleLeft } from 'react-icons/hi';
import { z } from 'zod';

import { ConstRegex } from '@/constants/ConstRegex';

const createStudentSchema = z.object({
  StudentFullName: z.string().min(3, { message: 'This field is required' }),
  StudentPhone: z.string().min(3, { message: 'This field is required' }),
  StudentEmail: z
    .string()
    .min(3, { message: 'This field is required' })
    .regex(ConstRegex.EMAIL_OPTIONAL),
  StudentPassword: z.string().min(3, { message: 'This field is required' }),
  StudentUniqueId: z.string().min(3, { message: 'This field is required' }),
  StudentRollNo: z.string().min(3, { message: 'This field is required' }),
  StudentCourseId: z.string().min(3, { message: 'This field is required' }),
  StudentClassId: z.string().min(3, { message: 'This field is required' }),
  StudentClassArmId: z.string().nullable().optional(),
  StudentCourseStartYear: z.date(),
  StudentCourseEndYear: z.date(),
});

export type CreateStudentFields = z.infer<typeof createStudentSchema>;

const CreateStudent = () => {
  const router = useRouter();
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <div
          onClick={() => router.push('/students')}
          className="flex cursor-pointer items-center gap-2 text-2xl font-semibold text-indigo-500"
        >
          <HiArrowCircleLeft />
          <span>Create Student</span>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
