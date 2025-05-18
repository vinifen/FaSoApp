import { useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import useUser from 'shared/hooks/useUser';
import useUserStore from 'shared/store/userStore';


export default function useCheckParamUserId(id: string) {
  const { getUserAuthenticated } = useUser();
  const router = useRouter();
  const { user } = useUserStore();
  
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          if (!id) throw new Error("ID parameter is required");;
          await getUserAuthenticated(id);

        } catch (error) {
          router.push('/');
        }
      };
      
      fetchUser();
    }, []) 
  ); 
  
}
