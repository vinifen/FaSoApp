import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userModel from "shared/model/userModel";
import { LoginType, RegisterUserType, UserRecordType } from "shared/types/UserTypes";
import useUserStore from "shared/store/userStore";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const {setUser, removeUser} = useUserStore();

  const loginUser = async (data: LoginType, rememberMe?: boolean) => {
    setLoading(true);
    try {
      const response = await userModel().login(data);
      const userRecordData: UserRecordType = response.data.record;
      const token: string = response.data.token;
      if(rememberMe){ 
        await AsyncStorage.setItem("auth_token", token);
      }
      setUser(userRecordData);
      
      return true;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data: RegisterUserType) => {
    setLoading(true);
    try {
      const response = await userModel().create(data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("auth_token");
    removeUser();
  };

  const checkUserAuth = async (token: string) => {
    setLoading(true);
    try {
      console.log("checking auth");
      const response = await userModel().checkAuth(token);
      
      const userRecordData: UserRecordType = response.record;
      const newToken: string = response.token;
      
      if (userRecordData) {
      
        setUser(userRecordData);
      }
      
      if (newToken) {
        
        await AsyncStorage.setItem("auth_token", newToken);
      } 
      return true;
    } finally {
      setLoading(false);
    }
  }

  return {
    loginUser,
    registerUser,
    logoutUser,
    loading,
    checkUserAuth
  };
}
