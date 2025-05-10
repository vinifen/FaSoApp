import { View, Text } from 'react-native';
import React from 'react';
import useUserStore from 'shared/store/userStore';
import { useRoute } from '@react-navigation/native';
import useCheckParamId from 'shared/hooks/useCheckParamId';

export default function _screen() {
  const { user } = useUserStore(); 
  const route = useRoute();
  const { id } = route.params as { id: string };
  
  useCheckParamId(id);
  
  return (
    <View>
      <Text>{user?.id}</Text>
      <Text>{id}</Text>
      <Text>user profile</Text>
    </View>
  );
}
