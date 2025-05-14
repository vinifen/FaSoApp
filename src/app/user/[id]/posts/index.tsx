import { View, Text } from 'react-native'
import React from 'react'
import useCheckParamUserId from 'shared/hooks/useCheckParamUserId';
import { useRoute } from '@react-navigation/native';

export default function _screen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  useCheckParamUserId(id);
  return (
    <View>
      <Text>_screen</Text>
    </View>
  )
}