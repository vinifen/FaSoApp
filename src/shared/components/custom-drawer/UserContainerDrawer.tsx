import { ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import Flex from '../Flex'
import { t } from 'i18next'
import { H3 } from '../Titles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useTheme from 'shared/hooks/useTheme';
import useUserStore  from 'shared/store/userStore';

export default function UserContainerDrawer({ style }: {style?: StyleProp<ViewStyle>}) {
  const { theme } = useTheme();
  const { user } = useUserStore();
  return (
    <Flex justify="center" align="center" style={style}>
      {user ? (
        <>
        <MaterialCommunityIcons
          name="account"
          size={35}
          color={theme.secondary} />
        <H3 style={{ color: theme.secondary }}>
          {t('hello_user')} {user.username}
        </H3>
        </>
      ) : (
        <>
        <MaterialCommunityIcons
            name="account-outline"
            size={35}
            color={theme.secondary} />
        <H3 style={{ color: theme.secondary }}>
          {t('hello_user_login')}
        </H3>
        </>
      )}
    </Flex>
  )
}
