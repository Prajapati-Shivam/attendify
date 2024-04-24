import { useEffect, useState } from 'react';

import type { IClassesCollection } from '@/@types/database';
import { MinimumQueryCharacter } from '@/@types/enum';
import DbClass from '@/firebase_configs/DB/DbClass';
import { useSessionStore } from '@/store';

interface Props {
  limit?: number;
  searchQuery?: string | null;
}

const useFetchClasses = ({ limit, searchQuery }: Props) => {
  const [data, setData] = useState<IClassesCollection[]>([]);

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
    const fetchInitialClasses = async () => {
      const snapshot = await DbClass.getClasses({
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
          const data = doc.data() as IClassesCollection;
          if (data) {
            return data;
          }
          return null;
        })
        .filter(item => item !== null) as IClassesCollection[];
    };

    try {
      fetchInitialClasses().then(arr => {
        setData(arr);
      });
    } catch (error) {
      console.log(error);
    }
  }, [limit, institute, searchQuery]);

  return { data };
};

export default useFetchClasses;
