'use client';

import React, { useEffect, useState } from 'react';

import type { IStudentsCollection } from '@/@types/database';
import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import NoSearchResult from '@/components/common/NoSearchResult';
import StudentDetails from '@/components/students/StudentDetails';
import DbClass from '@/firebase_configs/DB/DbClass';
import DbStudent from '@/firebase_configs/DB/DbStudent';

type Props = {
  params: {
    slug: string;
  };
};

export interface StudentsCollection
  extends Omit<IStudentsCollection, 'StudentClassId' | 'StudentCourseId'> {
  StudentClassName: string;
  StudentCourseName: string;
}

const SingleStudent = (props: Props) => {
  const { slug } = props.params;

  const [loading, setLoading] = useState(true);

  const [studentData, setStudentData] = useState<StudentsCollection | null>(
    null,
  );

  useEffect(() => {
    if (!slug) return;
    const fetchStudentData = async () => {
      try {
        setLoading(true);

        const data = await DbStudent.getStudentById(slug);
        const { StudentClassId, StudentCourseId } = data;

        const classDetails = await DbClass.getClassById(StudentClassId);
        const courseDetails = await DbClass.getCourseById(StudentCourseId);

        setStudentData({
          ...data,
          StudentClassName: classDetails.ClassName,
          StudentCourseName: courseDetails.CourseFullName,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchStudentData();
  }, [slug]);

  if (loading) {
    return (
      <PageContainer>
        <PageHeader route="students">Student - Loading...</PageHeader>
        <div className="mt-10 flex size-full animate-pulse items-center justify-center">
          <div className="h-[300px] w-full bg-shimmerColorLight dark:bg-shimmerColorDark"></div>
        </div>
      </PageContainer>
    );
  }

  if (!studentData) {
    return <NoSearchResult />;
  }

  return (
    <PageContainer>
      <PageHeader route="students">
        Student - {studentData.StudentFullName}
      </PageHeader>
      <div className="mt-10 bg-surfaceLight p-4 dark:bg-surfaceDark">
        <StudentDetails studentData={studentData} />
      </div>
    </PageContainer>
  );
};

export default SingleStudent;
