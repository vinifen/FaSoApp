import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, Alert, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import i18n from 'shared/i18n';
import useTheme from 'shared/hooks/useTheme';
import Flex from './Flex';
import { getInfoAsync } from 'expo-file-system';
import validationStyles from 'shared/styles/validationStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NewImageType } from 'shared/types/ImageTypes';

type imageInput = {
  onChangeImage: (uri: NewImageType | null) => void;
  onChangeErrors: (err: string | null) => void;
}

export default function ImageInput({onChangeImage, onChangeErrors}: imageInput) {
  const {t} = i18n;
  const {theme} = useTheme();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const { width } = useWindowDimensions();
  const [errors, setErrors] = useState<string | null>(null);

  const pickImage = async () => {
    errorsSetter(null);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t("permission_required"), t('access_gallery'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    const resultUri: string | null = result.assets && result.assets.length > 0 ? result.assets[0].uri : null;
    

    if (!result.canceled && resultUri) {
      try {
        const fileInfo = await getInfoAsync(resultUri);

        if (!fileInfo.exists || !fileInfo.size) {
          console.log(fileInfo)
          errorsSetter(t("image_not_found_or_invalid"));
          return;
        }

        const sizeInMB = fileInfo.size / (1024 * 1024);
        console.log(sizeInMB);

        if (sizeInMB > 15) {
          errorsSetter(t("image_description_error_size"));
          return;
        }

        const imageData = imageMapper(result)

        setImageUri(resultUri);
        onChangeImage(imageData);

      } catch (err) {
        console.error(err);
        errorsSetter(t('unexpected_error'));
      }
    }
  }

  const imageMapper = (imgData: ImagePicker.ImagePickerResult): NewImageType => {
    if (imgData.canceled || !imgData.assets || imgData.assets.length === 0) {
      throw new Error('No image selected');
    }

    const asset: ImagePicker.ImagePickerAsset = imgData.assets[0];

    return {
      uri: asset.uri,
      name: asset.fileName ?? 'upload.jpg',
      type: asset.type ?? 'image/jpeg',
      size: asset.fileSize ?? 0,
    };
  };
  
  const errorsSetter = (err: string | null) => {
    setErrors(err);
    onChangeErrors(err);
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.button, 
      borderColor: theme.secondary, 
      borderWidth: 1,
      borderStyle: "dashed",
      borderRadius: 15,
      height: 42,
      justifyContent: "center",
      alignItems: "center"
    }
  })

  useEffect(() => {

    if (imageUri) {
      Image.getSize(imageUri, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [imageUri]);
  
    const maxImageHeight = 300;
  
  const removeImageUri = () => {
    setImageUri(null);
    onChangeImage(null);
  }

  return (
    <Flex>
      <Flex direction='row' gap={5}>
        <TouchableOpacity onPress={pickImage} style={[styles.button, { flex: imageUri ? 8.5 : 10 }]}>
          <Text style={{color: theme.secondary}}>{t("select_image")}</Text>
        </TouchableOpacity>
        {imageUri && (
          <Flex justify='center' align='center' style={[{flex: 1.5}, styles.button]}>
            <TouchableOpacity onPress={removeImageUri}>
              <MaterialCommunityIcons name="trash-can-outline" size={22} color={theme.secondary} />
            </TouchableOpacity>
          </Flex>
        )}
      </Flex>
      
      {imageUri &&  (
        <Flex  
          style={{
            backgroundColor: theme.windowBox,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: theme.secondary,
            overflow: 'hidden',
            marginTop: 10
          }}
        >
          <Image 
            resizeMode="contain"
            source={{ uri: imageUri }} 
            style={{ 
              width: '100%',
              height: Math.min(width / (aspectRatio || 1), maxImageHeight)
            }} 
          />
        </Flex>
      )}
      {!errors && (
        <Flex justify='center' align='center'>
          <Text style={[validationStyles.error, {height: 30, fontSize: 12}]}>
            {errors ?? ' '}
          </Text>
        </Flex>
      )}
      
    </Flex>
  );
}
