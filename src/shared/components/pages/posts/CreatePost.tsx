import { View } from 'react-native';
import React from 'react';
import useTheme from 'shared/hooks/useTheme';
import { useTranslation } from "react-i18next";
import CreatePostForm from './CreatePostForm';
import { Flex } from 'shared/components/ui';
import { H2 } from 'shared/components/ui/Titles';

export default function CreatePost() {
  const { theme } = useTheme();
  const { currentlyTheme } = useTheme();
  const {t, i18n} = useTranslation();
  
  return (
    <View style={{flex: 1, backgroundColor: theme.background, paddingHorizontal: "10%" }}>
      <Flex justify='center' align='center' flex={1}>
        <H2>{t("create_new_post")}</H2>
      </Flex>
      <Flex flex={9}>
        <CreatePostForm></CreatePostForm>
      </Flex>
    </View>
  )
}