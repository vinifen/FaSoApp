import { ScrollView, View } from 'react-native';
import React from 'react';
import useTheme from 'shared/hooks/useTheme';
import { useTranslation } from "react-i18next";
import CreatePostForm from './CreatePostForm';
import { Flex } from 'shared/components/ui';
import { H2 } from 'shared/components/ui/Titles';

export default function CreatePosts() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.background }} 
      contentContainerStyle={{ paddingHorizontal: '10%', paddingBottom: 20, flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Flex justify='center' align='center' style={{ marginVertical: 20 }}>
        <H2>{t("create_new_post")}</H2>
      </Flex>
      <CreatePostForm />
    </ScrollView>
  );
}
