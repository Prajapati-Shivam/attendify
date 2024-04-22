import { useEffect, useState } from 'react';

import type { ICoursesCollection } from '@/@types/database';
import { MinimumQueryCharacter } from '@/@types/enum';
import DbClass from '@/firebase_configs/DB/DbClass';
import { useSessionStore } from '@/store';

interface Props {
  limit?: number;
  searchQuery?: string | null;
}

const useFetchCourses = ({ limit, searchQuery }: Props) => {
  const [data, setData] = useState<ICoursesCollection[]>([]);

  const { institute } = useSessionStore();

  useEffect(() => {
    if (!institute) return;

    if (
      searchQuery &&
      searchQuery.trim().length > 0 &&
      searchQuery.trim().length < MinimumQueryCharacter.COURSE_LIST
    ) {
      return;
    }
    const fetchInitialCourses = async () => {
      const snapshot = await DbClass.getCourses({
        lmt: limit,
        lastDoc: null,
        searchQuery:
          searchQuery &&
          searchQuery.trim().length > MinimumQueryCharacter.COURSE_LIST
            ? searchQuery.trim()
            : undefined,
        instituteId: institute.InstituteId,
      });
      return snapshot.docs
        .map(doc => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const data = doc.data() as ICoursesCollection;
          if (data) {
            return data;
          }
          return null;
        })
        .filter(item => item !== null) as ICoursesCollection[];
    };

    try {
      fetchInitialCourses().then(arr => {
        setData(arr);
      });
    } catch (error) {
      console.log(error);
    }
  }, [limit, institute, searchQuery]);

  return { data };
};

export default useFetchCourses;
