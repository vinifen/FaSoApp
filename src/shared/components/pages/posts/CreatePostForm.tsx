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
import mime from "mime";

export default function CreatePostForm() {
  const { theme } = useTheme();
  const { currentlyTheme } = useTheme();
  const {t, i18n} = useTranslation();
  const router = useRouter();
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


  async function handleCreatePost(newPostData: CreatePostType) {
    try {
      if(imageErrors){
        setError("Post data with error");
        return;
      }  
    
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) return;
      const postFormData = await toFormData(newPostData);
      const responseCreate = await postModel.create(postFormData, token);
      
      console.log("response Create: " + responseCreate);
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

  function toFormData(postData: CreatePostType): FormData {
    const formData = new FormData();

    formData.append('title', postData.title);
    formData.append('description', postData.description);
    if (postData.user_id) {
      formData.append('user_id', String(postData.user_id));
    }

   


    if (postData.image) {
      const newImageUri =  "file:///" + postData.image.uri.split("file:/").join("");

      formData.append('image', {
      uri : newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
      });
    }
    

    for (const pair of (formData as any)._parts) {
      console.log(`[FormData] ${pair[0]}:`, pair[1]);
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
            user_id: user?.id,
            image: imageData 
          })
        )}
      />
    </View>
  )
}