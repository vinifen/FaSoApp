import { View } from 'react-native';
import React from 'react';
import useTheme from 'shared/hooks/useTheme';
import { useTranslation } from "react-i18next";
import CreatePostForm from './CreatePostForm';

export default function CreatePost() {
  const { theme } = useTheme();
  const { currentlyTheme } = useTheme();
  const {t, i18n} = useTranslation();
 
  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <CreatePostForm></CreatePostForm>
    </View>
  )
}