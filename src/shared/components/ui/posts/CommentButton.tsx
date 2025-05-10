import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import Flex  from 'shared/components/ui/Flex';
import useTheme from 'shared/hooks/useTheme';

type Props = {
  commentsCount: number;
  isCommented: boolean;
};

export default function CommentButton({ commentsCount, isCommented}: Props) {
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
          {commentsCount}
        </Text>
        {isCommented ? (
          <MaterialCommunityIcons name="comment" size={18} color={theme.secondary} />
        ) : (
          <MaterialCommunityIcons name="comment-outline" size={18} color={theme.secondary} />
        )}
      </Flex>
    </TouchableOpacity>
  );
}
