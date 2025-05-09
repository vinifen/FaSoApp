import { View, Text, Image, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { H4 } from '../Titles'
import useTheme from '../../hooks/useTheme'

export default function Post({ style }: { style?: StyleProp<ViewStyle> }) {
  const { theme } = useTheme();
  return (
    <View style={[style, { backgroundColor: theme.primary, paddingHorizontal: 8, paddingTop: 6, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 10, height: 10 }, shadowOpacity: 1.2, shadowRadius: 1.41, elevation: 10 }]}>
      <View style={{backgroundColor: theme.windowBox, height: 250, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, borderRadius: 12, overflow: 'hidden'}}>
        <Image
          source={require('assets/images/test-image-2.png')}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'stretch',
            
          }}
        />
      </View>
      <View>
        <H4>title</H4>
        <Text>short description</Text>
        <Text>username</Text>
      </View>
    </View>
  )
}