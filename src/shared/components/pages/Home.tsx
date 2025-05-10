import { View, FlatList } from "react-native";
import useTheme from "shared/hooks/useTheme";
import Post from "../ui/posts/Post";


export default function Home() {
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const title = "Lorem ipsum dolor sit amet";
  const imageSource = require('assets/images/test-image-3.webp');
  const username = "John Doe";

  const posts = [
    {
      id: "1",
      title: title,
      description: description,
      username: username,
      image: imageSource,
    },
    {
      id: "2",
      title: "Another Post Title",
      description: "Short description for another post.",
      username: "Jane Doe",
      image: imageSource,
    },
    {
      id: "3",
      title: "Another Post Title",
      description: "Short description for another post.",
      username: "Jane Doe",
      image: imageSource,
    },
    {
      id: "4",
      title: "Another Post Title",
      description: "Short description for another post.",
      username: "Jane Doe",
      image: imageSource,
    },
  ];

  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={posts}
        style={{ paddingHorizontal: 10, marginTop: 10 }}
        renderItem={({ item }) => (
          <Post
            style={{ marginBottom: 10 }}
            title={item.title}
            description={item.description}
            username={item.username}
            imageSource={item.image}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
    
  );
}
