import { View, Text } from 'react-native'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput, SubmitButton } from 'shared/components/ui';
import useTheme from 'shared/hooks/useTheme';
import { getCreatePostSchema } from 'shared/schemas/postSchemas';
import { CreatePostType } from 'shared/types/PostTypes';
import ImageInput from 'shared/components/ui/ImageInput';

export default function CreatePostForm() {
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
        textAlign='left'
        paddingLeft={10}
      />  
      
      <FormInput
        control={control}
        inputName="description"
        minHeight={100}
        errors={errors}
        placeholder={t("post_description")}
        textAlign='left'
        paddingLeft={10}
        numberOfLines={5}
      />  

      <ImageInput></ImageInput>
      
      <SubmitButton title={t('create_posts')} onPress={handleSubmit(()=>{})}/>
    </View>
  )
}