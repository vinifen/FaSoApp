import { View, Text } from 'react-native'
import React from 'react'
import useUserStore from 'shared/store/userStore';

export default function UserProfile() {
  const { user } = useUserStore();
  return (
    <View>
      <Text>user profile {user?.username}</Text>
    </View>
  )
}