import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput, SubmitButton } from 'shared/components/ui';
import useTheme from 'shared/hooks/useTheme';
import { getCreatePostSchema } from 'shared/schemas/postSchemas';
import { CreatePostType } from 'shared/types/PostTypes';
import ImageInput from 'shared/components/ui/ImageInput';
import ImageLayout from 'shared/components/ui/posts/ImageLayout';
import { useRouter } from 'expo-router';
import postModel from 'shared/model/postModel';
import * as ImagePicker from 'expo-image-picker';
import { NewImageType } from 'shared/types/ImageTypes';
import useUserStore from 'shared/store/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreatePostForm() {
  const { theme } = useTheme();
  const { currentlyTheme } = useTheme();
  const {t, i18n} = useTranslation();
  const router = useRouter();
  const {create, update} = postModel();
  const {user} = useUserStore();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreatePostType>({
    resolver: zodResolver(getCreatePostSchema()),
    mode: "onChange"
  })
  

  const [imageData, setImageData] = useState<NewImageType | null>(null);
  const [imageErrors, setImageErrors] = useState<string | null>(null);
  const [error, setError] = useState('');


  async function handleCreatePost(newPostData: CreatePostType, imageData: NewImageType) {
    try {
      if(imageErrors){
        setError("Post data with error");
        return;
      }  
    
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) return;

      const responseCreate = await create(newPostData, token);
      
      if(imageData){ 
        const imageFormData = toImageFormData(imageData);
        const responseUpdate = await update(responseCreate.id, imageFormData, token);
        
      }
      router.push('');
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(t('unexpected_error'));
      }
    }
  }

  function toImageFormData(imageData: NewImageType): FormData {
    const formData = new FormData();
    
    if (imageData) {
      formData.append('image', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.name,
      } as any);
    }
    return formData;
  }


  useEffect(()=>{console.log(imageData)}, [ imageData]);
  return (
    <View style={{backgroundColor: theme.background}}>
      
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
        numberOfLines={10}
      />
      
      <ImageInput onChangeImage={setImageData} onChangeErrors={setImageErrors}></ImageInput>
      
      <SubmitButton
        title={t('create_posts')}
        isDisabled={!isValid || imageErrors !== null}
        onPress={handleSubmit((data) =>
          handleCreatePost({
            title: data.title,
            description: data.description,
            user_id: user?.id
          }, imageData)
        )}
      />

    </View>
  )
}