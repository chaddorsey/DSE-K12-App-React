import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot,
  orderBy,
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { QuestionResponse } from '../types/response';

export function useResponseUpdates(questionId: string, limitCount: number = 10) {
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const responsesRef = collection(db, 'responses');
    const q = query(
      responsesRef,
      where('questionId', '==', questionId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newResponses = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp as Timestamp
        })) as QuestionResponse[];
        
        setResponses(newResponses);
        setLoading(false);
      },
      (err) => {
        console.error('Error getting response updates:', err);
        setError(err instanceof Error ? err : new Error('Failed to get updates'));
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [questionId, limitCount]);

  return { responses, loading, error };
} 