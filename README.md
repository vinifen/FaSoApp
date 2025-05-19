# FaSoApp  
#### v-alpha-1.0

FaSoApp (Fake Social App) is an application developed using React Native, designed to simulate a social network. The main goal of this project was to gain hands-on experience with React Native and learn how to build a mobile application from the ground up.

## ✨ Key Features

- User registration and login system  
- Post creation functionality  
- Automatic language translation between English and Portuguese, based on device settings  
- Light and dark mode support, synced with the system theme  
- User preference saving, stored directly in the account for a personalized experience  
- Responsive side menu with navigation buttons  
- User profile page, displaying personal information and activity  

This project served as a valuable learning experience to better understand the fundamentals of React Native and the architecture of modern mobile apps.

## 🧰 Technologies Used & Tested

- **React Native** (via Expo)  
- **Expo SDK**: v52.0.43  
- **PocketBase**: v0.27.2 (local backend)  
- **expo-router**: v3.4.2  
- **Node.js**: v22.11.0  
- **Expo Go**: v2.32.19  
- **Android Studio**: Meerkat | 2024.3.1 Patch 1  
- **Linux**: Ubuntu 24.04.2 LTS  
- **Platform**: Android  

## 🚀 Installation

### Clone the repository and navigate into the folder:

```bash
git clone https://github.com/vinifen/fasoapp.git
```
```
cd fasoapp/
```

### Install dependences:

```
npm install 
```

### Run Backend: 

#### If you're using another device:

- [install expo go v2.32.19 (SDK 52)](https://expo.dev/go) 

- Create a file named  ```ip.ts``` inside ```src/api/``` with your ip, following the structure in ```ip-example.ts``;

### Then (in all cases) run: 

```
npm run backend
```

### Default PocketBase admin login (backend):

- Access: http://0.0.0.0:8090/_/
#### Email:
```
user@email.com
```
#### Password:
```
1234567890
```

### 📱 Android Studio Setup

- Install [Android Studio](https://developer.android.com/) on folder $HOME/Applications/android-studio *

- Download Android Studio, unzip it in the mentioned folder, access the bin subfolder, run studio.sh to start the installation.

```
nano ~/.bashrc
```

- Paste the following lines at the end of the file:
```
export ANDROID_SDK=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_SDK/emulator
export PATH=$PATH:$ANDROID_SDK/tools
export PATH=$PATH:$ANDROID_SDK/tools/bin
export PATH=$PATH:$ANDROID_SDK/platform-tools
#Required for Bare Workflow (adjust the paths to your system)
export ANDROID_HOME=$HOME/Android/Sdk
#Java is required, if you are only going to use the emulator, you can use the jre from Android Studio itself, but if you are going to build the project you will need the JDK, in this case install Java separately (sudo apt install openjdk-17-jdk)
#Option 1: Emulator only
export JAVA_HOME=$HOME/Applications/android-studio/jre #jbr in newer versions
#Option 2: Install Java and point to the JDK path
#export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

### ▶️ Run Application

```
npm start
```

### 🧪 Default User for Testing

#### Email:
```
test@email.com
```
#### Password:
```
123456
```

### 📸 Screenshots

#### Home:
![home](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1747681051/home-fasoaap_khhv7l.png)

#### Home & Sidenav (Light Mode):
![homesidenav](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1747681050/light-menu-fasoapp_m4bprj.png)

#### Profile Page: 
![profile](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1747681050/profile-fasoapp_vy0ekx.png)

#### Register & Sidenav (Light Mode):
![registersidenav](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1747681050/menu-register-fasoapp_eyotap.png)

### Login:
![login](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1747681050/login-fasoapp_uxhacw.png)

### Menu (Dark Mode):
![menudark](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1747681050/menu-fasoapp_yn92cm.png)

