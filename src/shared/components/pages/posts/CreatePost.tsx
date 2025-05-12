import { View, Text } from 'react-native'
import React from 'react'
import useTheme from 'shared/hooks/useTheme'
import { useForm, Controller } from "react-hook-form";
import { CreatePostType } from 'shared/types/PostTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCreatePostSchema } from 'shared/schemas/postSchemas';
import { FormInput } from 'shared/components/ui';
import { useTranslation } from "react-i18next";

export default function CreatePost() {
  const { theme } = useTheme();
  const { currentlyTheme } = useTheme();
  const {t, i18n} = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreatePostType>({
    resolver: zodResolver(getCreatePostSchema()),
    mode: "onChange"
  })
  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <Text>CreatePosts</Text>
      
      <FormInput
        control={control}
        inputName="title"
        errors={errors}
        placeholder={t("post_title")}
      />  
      
      <FormInput
        control={control}
        inputName="description"
        minHeight={100}
        errors={errors}
        placeholder={t("post_description")}
      />  
      
    </View>
  )
}