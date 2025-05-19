import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Flex, FormInput, SubmitButton } from 'shared/components/ui';
import useTheme from 'shared/hooks/useTheme';
import { getCreatePostSchema } from 'shared/schemas/postSchemas';
import { CreatePostType } from 'shared/types/PostTypes';
import { ImageInput } from 'shared/components/ui';
import { useRouter } from 'expo-router';
import postModel from 'shared/model/postModel';
import { NewImageType } from 'shared/types/ImageTypes';
import useUserStore from 'shared/store/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from "mime";
import validationStyles from 'shared/styles/validationStyles';

export default function CreatePostForm() {
  const { theme } = useTheme();
  const { t } = useTranslation();
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
      const postFormData = toFormData(newPostData);
      const responseCreate = await postModel.create(postFormData, token);
      
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

    if (postData.user_id) {
      formData.append('user_id', String(postData.user_id));
    }

    // remove this in the future (mock)
    const comments = Math.floor(Math.random() * 50);
    const likes = comments + Math.floor(Math.random() * 51);
    formData.append('username', user?.username);
    formData.append('comments', comments.toString());
    formData.append('likes', likes.toString());
    formData.append('is_liked', Math.random() < 0.6);
    formData.append('is_commented', Math.random() < 0.2);
    // remove this in the future (mock)

    if (postData.image) {
      const newImageUri =  "file:///" + postData.image.uri.split("file:/").join("");

      formData.append('image', {
      uri : newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
      });
    }
    
    return formData;
  }
  
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
        multiline={true}
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
      <Flex justify="center" align="center">
        <Text style={[validationStyles.error, {height: 35, textAlign: "center"}]}>
          {error ?? ''}
        </Text>
      </Flex>
    </View>
  )
}