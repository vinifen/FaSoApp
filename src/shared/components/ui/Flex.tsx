import React from 'react'
import { View, ViewStyle, StyleProp } from 'react-native'

type FlexProps = {
  flex?: number
  justify?: ViewStyle['justifyContent']
  align?: ViewStyle['alignItems']
  direction?: ViewStyle['flexDirection']
  wrap?: ViewStyle['flexWrap']
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  gap?: number
}

export default function Flex({
  flex,
  justify,
  align,
  direction,
  wrap,
  style,
  gap,
  children
}: FlexProps) {
  return (
    <View
      style={[
        {
          flex: flex,
          display: 'flex',
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          flexWrap: wrap,
          gap: gap,
        },
        style
      ]}
    >
      {children}
    </View>
  )
}
