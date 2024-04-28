import { useEffect, useState } from 'react';

import type { ISubjectsCollection } from '@/@types/database';
import { MinimumQueryCharacter } from '@/@types/enum';
import DbClass from '@/firebase_configs/DB/DbClass';
import { useSessionStore } from '@/store';

interface Props {
  limit?: number;
  searchQuery?: string | null;
  classId: string | null;
}

const useFetchSubjects = ({ limit, searchQuery, classId }: Props) => {
  const [data, setData] = useState<ISubjectsCollection[]>([]);

  const { institute } = useSessionStore();

  useEffect(() => {
    if (!institute) return;

    if (!classId) return;

    if (
      searchQuery &&
      searchQuery.trim().length > 0 &&
      searchQuery.trim().length < MinimumQueryCharacter.SUBJECT_LIST
    ) {
      return;
    }
    const fetchInitialSubjects = async () => {
      const snapshot = await DbClass.getSubjects({
        lmt: limit,
        lastDoc: null,
        searchQuery:
          searchQuery &&
          searchQuery.trim().length > MinimumQueryCharacter.SUBJECT_LIST
            ? searchQuery.trim()
            : undefined,
        instituteId: institute.InstituteId,
        classId,
      });
      return snapshot.docs
        .map(doc => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const data = doc.data() as ISubjectsCollection;
          if (data) {
            return data;
          }
          return null;
        })
        .filter(item => item !== null) as ISubjectsCollection[];
    };

    try {
      fetchInitialSubjects().then(arr => {
        setData(arr);
      });
    } catch (error) {
      console.log(error);
    }
  }, [limit, institute, searchQuery, classId]);

  if (!classId || classId.length < 3) return { data: [] };
  return { data };
};

export default useFetchSubjects;
