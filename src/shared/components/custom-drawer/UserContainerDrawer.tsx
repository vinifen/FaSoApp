import { ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import Flex from '../Flex'
import { t } from 'i18next'
import { H3 } from '../Titles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from 'shared/hook/useTheme';


export default function UserContainerDrawer({ style }: {style?: StyleProp<ViewStyle>}) {
  const { theme } = useTheme();

  return (
    <Flex justify="center" align="center" style={style}>
      <MaterialCommunityIcons
        name="account"
        size={35}
        color={theme.secondary}
      />
      <H3 style={{ color: theme.secondary }}>
        {t('hello_user')} Vinicius
      </H3>
    </Flex>
  )
}
