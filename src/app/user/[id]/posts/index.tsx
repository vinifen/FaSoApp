import { View, Text } from 'react-native'
import React from 'react'
import useCheckParamId from 'shared/hooks/useCheckParamId';
import { useRoute } from '@react-navigation/native';

export default function _screen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  useCheckParamId(id);
  return (
    <View>
      <Text>_screen</Text>
    </View>
  )
}