import { View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useTheme from "shared/hooks/useTheme";
import Post from "../ui/posts/Post";
import postModel from "shared/model/postModel";
import { PostRecordType } from "shared/types/PostTypes";
import { baseURL } from "src/api/api";

export default function Home() {
  const [result, setResult] = useState<PostRecordType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        const res: PostRecordType[] = await postModel.selectAll();
        setResult(res);
      };
      fetchPosts();
    }, [])
  );

  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={result}
        style={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <Post
            style={{ marginTop: 10 }}
            title={item.title}
            description={item.description ?? ""}
            username={item.username ?? ""}
            imageSource={
              item.image && item.image.length > 0
                ? { uri: `${baseURL}api/files/posts/${item.id}/${item.image}` }
                : undefined
            }
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
