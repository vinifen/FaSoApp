import React from 'react';
import { Image, View } from 'react-native';
import useTheme from '../../hooks/useTheme';


export default function LogoImage({ width = 30}: {width?: number}) {
  const { currentlyTheme } = useTheme(); 
  
  const logoSource =
    currentlyTheme === 'light'
      ? require('assets/images/fasoapp-logo.png')
      : require('assets/images/fasoapp-logo-darktheme.png');
  
  return (
    <View>
      <Image
        source={logoSource}
        resizeMode="contain"
        style={{ width}}
      />
    </View>
  );
}
