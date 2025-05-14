import { View, FlatList } from "react-native";
import useTheme from "shared/hooks/useTheme";
import Post from "../ui/posts/Post";

export default function Home() {
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const title = "Lorem ipsum dolor sit amet";
  const imageSource = require("assets/images/test-image-3.webp");
  const imageSource2 = require("assets/images/test-image-2.png");
  const imageSource3 = require("assets/images/test-image-1.webp");
  const username = "John Doe";

  const posts = [
    {
      id: "1",
      title: title,
      description: description,
      username: username,
      imageSource: imageSource,
      isLiked: false,
      isCommented: true,
      likesCount: 10000,
      commentsCount: 50000,
    },
    {
      id: "2",
      title: "Another Post Title",
      description: "Short description for another post.",
      username: "Jane Doe",
      imageSource: imageSource2,
      isLiked: false,
      isCommented: false,
      likesCount: 3,
      commentsCount: 0,
    },
    {
      id: "30",
      title: "Another Post Title",
      description: "Short description for another post.",
      username: "Jane Doe",
      imageSource: imageSource3,
      isLiked: false,
      isCommented: true,
      likesCount: 1,
      commentsCount: 2,
    },
    {
      id: "4",
      title: "Another Post Title",
      description: "Short description for another post.",
      username: "Jane Doe",
      imageSource: imageSource,
      isLiked: true,
      isCommented: false,
      likesCount: 7,
      commentsCount: 1,
    },
    {
      id: "5",
      title: "Post post",
      description: "post :)",
      username: "user12312",
      imageSource: imageSource,
      isLiked: true,
      isCommented: false,
      likesCount: 70,
      commentsCount: 100,
    },
  ];

  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={posts}
        style={{ paddingHorizontal: 10}}
        renderItem={({ item }) => (
          <Post
            style={{ marginTop: 10 }}
            title={item.title}
            description={item.description}
            username={item.username}
            imageSource={item.imageSource}
            isLiked={item.isLiked}
            isCommented={item.isCommented}
            likesCount={item.likesCount}
            commentsCount={item.commentsCount}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
