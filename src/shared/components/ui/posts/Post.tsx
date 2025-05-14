
import React, { useState, useEffect } from 'react';
import { ImageSourcePropType, Image as RNImage, StyleProp, useWindowDimensions, View, ViewStyle, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from 'shared/hooks/useTheme';
import { H4 } from '../Titles';
import Flex from '../Flex';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import ImageLayout from '../ImageLayout';

type PostProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  description: string;
  username: string;
  imageSource?: ImageSourcePropType;
  isLiked: boolean;
  isCommented: boolean;
  likesCount: number;
  commentsCount: number;
};

export default function Post({ 
  style, 
  title, 
  description, 
  username, 
  imageSource,
  isLiked,
  isCommented,
  likesCount,
  commentsCount,
}: PostProps) {
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
    <View
      style={[
        style,
        {
          backgroundColor: theme.primary,
          paddingHorizontal: 8,
          paddingTop: 6,
          paddingBottom: 5,
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 1.2,
          shadowRadius: 1.41,
          elevation: 10,
        },
      ]}
    >
     <ImageLayout imageSource={imageSource}></ImageLayout>

      <Flex style={{ marginHorizontal: 5, marginTop: 5 }}>
        <View>
          <H4 numberOfLines={1}>
            {title.length > 40 ? title.slice(0, 40) + '...' : title}
          </H4>
          
          <Text style={{ color: theme.postDescription }} numberOfLines={2}>
            {description.length > 100 ? description.slice(0, 100) + '...' : description}
          </Text>
        </View>
        
        <Flex direction='row' justify='space-between' align='center'>
          <Text style={{ color: theme.secondary, fontSize: 12}} numberOfLines={1}>
            {username.length > 20 ? username.slice(0, 20) + '...' : username}
          </Text>
          <Flex direction='row' style={{ marginRight: 5}} >
            <CommentButton commentsCount={commentsCount} isCommented={isCommented}/>
            <LikeButton likesCount={likesCount} isLiked={isLiked}/>
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
}
