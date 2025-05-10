import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import Flex  from 'shared/components/ui/Flex';
import useTheme from 'shared/hooks/useTheme';

type Props = {
  likesCount: number;
  isLiked: boolean;
};

export default function LikeButton({ likesCount, isLiked}: Props) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={()=>{}} activeOpacity={0.7} style={{paddingVertical: 10}}>
      <Flex flex={1} direction="row" gap={4} align="center">
        <Text
          style={{
            color: theme.secondary,
            fontSize: 15,
            fontWeight: '500',
            width: 50,
            textAlign: 'right',
            alignItems: 'center',
          }}
        >
          {likesCount}
        </Text>
        {isLiked ? (
          <MaterialCommunityIcons name="heart" size={20} color={theme.secondary} />
        ) : (
          <MaterialCommunityIcons name="heart-outline" size={20} color={theme.secondary} />
        )}
      </Flex>
    </TouchableOpacity>
  );
}
