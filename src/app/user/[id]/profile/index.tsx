import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useUserStore from 'shared/store/userStore';
import { useRoute } from '@react-navigation/native';
import useUser from 'shared/hooks/useUser';

export default function _screen() {
  const { user } = useUserStore();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { getUser } = useUser(); 

  const idParam: string = id ? id.replace("[", "").replace("]", "") : "";
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (idParam && !userId) {
        const userData = await getUser(idParam); 
        setUserId(userData?.id || null);
      }
    };
    
    fetchUser();
  }, []);
  
  return (
    <View>
      <Text>{userId}</Text>
      <Text>user profile {user?.username}</Text>
    </View>
  );
}
