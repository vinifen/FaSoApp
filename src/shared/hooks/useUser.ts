import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userModel from "shared/model/userModel";
import { LoginType, RegisterUserType, UserRecordType } from "shared/types/UserTypes";
import useUserStore from "shared/store/userStore";
import i18n from "shared/i18n";
import useTheme from "./useTheme";

export default function useUser() {
  const [loading, setLoading] = useState(false);
  const {setUser, removeUser} = useUserStore();
  const { setTheme } = useTheme();
  
  const loginUser = async (data: LoginType, rememberMe?: boolean) => {
    const response = await userModel.login(data);
    const userRecordData: UserRecordType = response.record;
    
    if(rememberMe){ 
      await AsyncStorage.setItem("auth_token", response.token);
    }
    changeUser(userRecordData);
    
    return true;
  };
  
  const registerUser = async (data: RegisterUserType) => {
    const response = await userModel.create(data);
    return response.data;
  };
  
  const getUser = async (userId: string) => {
    const token = await AsyncStorage.getItem("auth_token");
    
    if (!token) throw new Error("User not authenticated");
    
    const response = await userModel.select(userId, token);
    
    const userRecordData: UserRecordType = response;
    
    changeUser(userRecordData);
    
    return userRecordData;
  };
  
  const logoutUser = async () => {
    await AsyncStorage.removeItem("auth_token");
    removeUser();
  };
  
  const checkUserAuth = async (token: string) => {
    const response = await userModel.checkAuth(token);
    
    const userRecordData: UserRecordType = response.record;
    
    changeUser(userRecordData);
    
    await AsyncStorage.setItem("auth_token", response.token);
    
    return true;
  }
  
  const changeUser = async (userData: UserRecordType) => {
    if(!userData) return;
    setUser(userData);
    if(userData.theme) {
      setTheme(userData.theme);
    }
    if(userData.language) {
      i18n.changeLanguage(userData.language);
    }
  }
  
  return {
    loginUser,
    registerUser,
    logoutUser,
    loading,
    checkUserAuth,
    getUser,
  };
}
