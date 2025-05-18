import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import useUserStore from 'shared/store/userStore';
import { useRoute, useTheme } from '@react-navigation/native';
import useCheckParamId from 'shared/hooks/useCheckParamUserId';
import postModel from 'shared/model/postModel';
import { Post } from 'shared/components/ui';
import { PostRecordType } from 'shared/types/PostTypes';

export default function _screen() {
  const { user } = useUserStore(); 
  const route = useRoute();
  const { id } = route.params as { id: string };
  
  useCheckParamId(id);
  const [result, setResult] = useState<PostRecordType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res: PostRecordType[] = await postModel.selectAllFrom('user_id', id);
      setResult(res);
      console.log(res, "aqui");
    };
    fetchPosts();
  }, []);
  
  return (
    <View>
      <Text>{user?.id}</Text>
      <Text>{id}</Text>
      <FlatList
        data={result}
        style={{ paddingHorizontal: 10}}
        renderItem={({ item }) => (
          <Post
            style={{ marginTop: 10 }}
            title={item.title}
            description={item.description ?? ""}
            username={item.username ?? ""}
            imageSource={{ uri: `http://10.0.2.2:8090/api/files/posts/${item.id}/${item.image}` }}
            isLiked={item.is_liked ?? false}
            isCommented={item.is_commented ?? false}
            likesCount={item.likes ?? "0"}
            commentsCount={item.comments ?? "0"}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
