import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Post } from 'shared/components/ui';
import postModel from 'shared/model/postModel';
import { PostRecordType } from 'shared/types/PostTypes';
import useTheme from 'shared/hooks/useTheme';
import i18n from 'shared/i18n';
import UserProfileContainer from './UserProfileContainer';
import { baseURL } from 'src/api/api';

type IndexProfileProps = {
  userId: string;
};

export default function IndexProfile({ userId }: IndexProfileProps) {
  const [result, setResult] = useState<PostRecordType[]>([]);
  const { theme } = useTheme();
  const { t } = i18n;

  useEffect(() => {
    const fetchPosts = async () => {
      const res: PostRecordType[] = await postModel.selectAllFrom('user_id', userId);
      setResult(res);
    };
    fetchPosts();
  }, [userId]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={result}
        contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
        ListHeaderComponent={() => (
          <UserProfileContainer/>
        )}
        renderItem={({ item }) => (
          <Post
            style={{ marginBottom: 10 }}
            title={item.title}
            description={item.description ?? ''}
            username={item.username ?? ''}
            imageSource={
              item.image && item.image.length > 0
                ? { uri: `${baseURL}api/files/posts/${item.id}/${item.image}` }
                : undefined
            }
            isLiked={item.is_liked ?? false}
            isCommented={item.is_commented ?? false}
            likesCount={item.likes ?? '0'}
            commentsCount={item.comments ?? '0'}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
