import React from 'react'
import { Text, TextProps } from 'react-native'
import useTheme from '../hooks/useTheme'

export function H1(props: TextProps) {
  const { theme } = useTheme()
  return <Text {...props} style={[{ fontSize: 18, fontWeight: '500', color: theme.secondary }, props.style]} />
}

export function H2(props: TextProps) {
  const { theme } = useTheme()
  return <Text {...props} style={[{ fontSize: 22, fontWeight: '400', color: theme.secondary }, props.style]} />
}

export function H3(props: TextProps) {
  const { theme } = useTheme()
  return <Text {...props} style={[{ fontSize: 20, fontWeight: '400', color: theme.secondary }, props.style]} />
}

export function H4(props: TextProps) {
  const { theme } = useTheme()
  return <Text {...props} style={[{ fontSize: 12, fontWeight: '300', color: theme.secondary }, props.style]} />
}
