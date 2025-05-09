import { View, Text } from 'react-native';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import Post from '../posts/Post';


export default function Home() {
  const {theme} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.background, paddingHorizontal: 10}}>
      <Post style={{marginTop: 10}}></Post>
    </View>
  )
}
