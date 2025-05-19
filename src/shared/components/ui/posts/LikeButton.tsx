import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import Flex  from 'shared/components/ui/Flex';
import useTheme from 'shared/hooks/useTheme';
import { useState } from 'react';

type LikeButtonType = {
  likesCount: number;
  isLiked: boolean;
};

export default function LikeButton({ likesCount, isLiked }: LikeButtonType) {
  const { theme } = useTheme();
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);
  
  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <TouchableOpacity onPress={handleLike} activeOpacity={0.7} style={{ paddingVertical: 10 }}>
      <Flex flex={1} direction="row" gap={4} align="center">
        <Text
          style={{
            color: theme.secondary,
            fontSize: 15,
            fontWeight: "500",
            width: 50,
            textAlign: "right",
            alignItems: "center",
          }}
        >
          {count}
        </Text>
        <MaterialCommunityIcons
          name={liked ? "heart" : "heart-outline"}
          size={20}
          color={theme.secondary}
        />
      </Flex>
    </TouchableOpacity>
  );
}
