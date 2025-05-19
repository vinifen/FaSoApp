import { useNavigation } from "expo-router"
import { DrawerActions } from "@react-navigation/native"
import React from "react"
import { useTranslation } from "react-i18next"
import { Feather } from "@expo/vector-icons"
import { View, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import useTheme from "shared/hooks/useTheme"
import Flex from "../Flex"
import ButtonsContainerDrawer from "./ButtonsContainerDrawer"
import UserContainerDrawer from "./UserContainerDrawer"

export default function CustomDrawerContent() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  
  const closeSidenav = () => {
    navigation.dispatch(DrawerActions.closeDrawer())
  }
  
  return (
    <View 
      style={{ 
        flex: 1, 
        backgroundColor: theme.background,
        paddingHorizontal: 20, 
      }}
    >
      <Flex
        direction='row'
        justify='flex-end'
        align='center'
        style={{
          paddingTop: insets.top,
          height: 60 + insets.top,
        }}
      >
        <Feather
          name="menu"
          size={24}
          color={theme.secondary}
          onPress={closeSidenav}
        />
      </Flex>
      
      <UserContainerDrawer style={{flex: 2}}/>
      
      <ButtonsContainerDrawer style={{flex: 7}}/>
      
      <View style={{ justifyContent: 'flex-end', flex: 1 }}>
        <Text 
          style={{ 
            color: theme.secondary, 
            fontSize: 10, 
            marginBottom: 5,
            textAlign: 'center', 
          }}
        >{t('rights_reserved')}</Text>
      </View>
    </View>
  )
}
