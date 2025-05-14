import React, { useState } from 'react';
import { View, Text, Button, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import i18n from 'shared/i18n';
import useTheme from 'shared/hooks/useTheme';
import Flex from './Flex';

type imageInput = {
  onChangeImage: (uri: string | null) => void;
}

export default function ImageInput({onChangeImage}: imageInput) {
  const {t} = i18n
  const {theme} = useTheme();

  const pickImage = async () => {
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

    if (!result.canceled) {
      
      onChangeImage(result.assets[0].uri)
    }
  };

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
  

  return (
    <Flex>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={{color: theme.secondary}}>{t("select_image")}</Text>
      </TouchableOpacity>
      
      
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
          source={require("../../../../assets/images/test-image-1.webp")}
          style={{height: 200, width: 100}}
        ></Image>
      </Flex>
      
      
    </Flex>
  );
}
