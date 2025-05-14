
import React, { useState, useEffect } from 'react';
import { ImageSourcePropType, Image as RNImage, StyleProp, useWindowDimensions, View, ViewStyle, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from 'shared/hooks/useTheme';
import Flex from '../Flex';


type ImageLayoutType = {

  imageSource?: ImageSourcePropType | null;

};

export default function ImageLayout({ 

  imageSource,

}: ImageLayoutType) {
  const { theme } = useTheme();
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    if (imageSource) {
      const { uri } = RNImage.resolveAssetSource(imageSource);
      RNImage.getSize(uri, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [imageSource]);

  const maxImageHeight = 250;

  return (
    <>
    {aspectRatio && imageSource && (
      <View
        style={{
          backgroundColor: theme.windowBox,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.background,
          overflow: 'hidden',
          
        }}
      >
        <Image
          source={imageSource}
          resizeMode="contain"
          style={{
            width: '100%',
            height: Math.min(screenWidth / aspectRatio, maxImageHeight),
            borderRadius: 10,
          }}
        />
      </View>
    )}
    </>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useWindowDimensions, View, Image } from 'react-native';
// import useTheme from 'shared/hooks/useTheme';

// type ImageLayoutType = {
//   imageSource?: string | null; // agora espera uma URI
// };

// export default function ImageLayout({ imageSource }: ImageLayoutType) {
//   const { theme } = useTheme();
//   const [aspectRatio, setAspectRatio] = useState<number | null>(null);
//   const { width: screenWidth } = useWindowDimensions();

//   useEffect(() => {
//     if (imageSource) {
//       Image.getSize(
//         imageSource,
//         (width, height) => setAspectRatio(width / height),
//         (error) => console.error('Erro ao carregar imagem:', error)
//       );
//     }
//   }, [imageSource]);

//   const maxImageHeight = 250;

//   if (!aspectRatio || !imageSource) return null;

//   return (
//     <View
//       style={{
//         backgroundColor: theme.windowBox,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: theme.background,
//         overflow: 'hidden',
//       }}
//     >
//       <Image
//         source={{ uri: imageSource }}
//         resizeMode="contain"
//         style={{
//           width: '100%',
//           height: Math.min(screenWidth / aspectRatio, maxImageHeight),
//           borderRadius: 10,
//         }}
//       />
//     </View>
//   );
// }
