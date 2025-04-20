import { Stack } from 'expo-router';
import { Image, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import "../../global.css"
import '../shared/i18n'


export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/fasoapp-logo.png')}
              style={{
                width: 28, 
                height: 28, 
                marginRight: 6,
              }}
              resizeMode="contain"
              className='text-red-800'
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>FaSoApp</Text>
          </View>
        ),
        headerRight: () => (
          <Feather name="menu" size={24} color="262F38" style={{ marginRight: 12 }} />
        ),
      }}
    />
  );
}
