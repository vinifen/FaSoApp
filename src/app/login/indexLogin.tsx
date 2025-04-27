import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

import useAuth from "../../libs/firebase/hooks/useAuth";


export default function _screen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);



  return (
    <View >
      <Text >
        simple-firestore-hooks expo example
      </Text>
      <Text>Before start: check Readme.md for setup details!</Text>
      <Text>login with email: user@example.com, password: 123456</Text>

      <TextInput
        
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Login"
        onPress={async () => {
          try {
            await login(email, password);
            router.push("/home/");
          } catch (error: any) {
            Alert.alert("Login error", error.toString());
          }
        }}
      />
    </View>
  );
}