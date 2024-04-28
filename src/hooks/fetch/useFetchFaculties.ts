import { useEffect, useState } from 'react';

import type { IFacultiesCollection } from '@/@types/database';
import { MinimumQueryCharacter } from '@/@types/enum';
import DbFaculty from '@/firebase_configs/DB/DbFaculty';
import { useSessionStore } from '@/store';

interface Props {
  limit?: number;
  searchQuery?: string | null;
}

const useFetchFaculties = ({ limit, searchQuery }: Props) => {
  const [data, setData] = useState<IFacultiesCollection[]>([]);

  const { institute } = useSessionStore();

  useEffect(() => {
    if (!institute) return;

    if (
      searchQuery &&
      searchQuery.trim().length > 0 &&
      searchQuery.trim().length < MinimumQueryCharacter.FACULTY_LIST
    ) {
      return;
    }
    const fetchInitialFaculties = async () => {
      const snapshot = await DbFaculty.getFaculties({
        lmt: limit,
        lastDoc: null,
        searchQuery:
          searchQuery &&
          searchQuery.trim().length > MinimumQueryCharacter.FACULTY_LIST
            ? searchQuery.trim()
            : undefined,
        instituteId: institute.InstituteId,
      });
      return snapshot.docs
        .map(doc => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const data = doc.data() as IFacultiesCollection;
          if (data) {
            return data;
          }
          return null;
        })
        .filter(item => item !== null) as IFacultiesCollection[];
    };

    try {
      fetchInitialFaculties().then(arr => {
        setData(arr);
      });
    } catch (error) {
      console.log(error);
    }
  }, [limit, institute, searchQuery]);

  return { data };
};

export default useFetchFaculties;
