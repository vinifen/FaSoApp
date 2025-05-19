import { useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import useUser from 'shared/hooks/useUser';

export default function useCheckParamUserId(id: string) {
  const { getUser } = useUser();
  const router = useRouter();
  
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          if (!id) throw new Error("ID parameter is required");;
          await getUser(id);
        } catch (error) {
          router.push('/');
        }
      };
      
      fetchUser();
    }, []) 
  ); 
  
}
