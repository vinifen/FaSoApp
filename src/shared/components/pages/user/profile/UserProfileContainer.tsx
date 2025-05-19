import { View, Text } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { t } from 'i18next';
import { H3 } from 'shared/components/ui/Titles';
import useTheme from 'shared/hooks/useTheme';
import useUserStore from 'shared/store/userStore';

export default function UserProfileContainer() {
  const { theme } = useTheme();
  const { user } = useUserStore();
  
  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={{
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
          marginBottom: 12,
          borderRadius: 15,
          padding: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <MaterialCommunityIcons
            name="account-circle"
            size={40}
            color={theme.secondary}
            style={{ marginRight: 10 }}
          />
          <H3 style={{ color: theme.secondary }}>{user?.username}</H3>
        </View>

        <Text style={{ color: theme.secondary, marginBottom: 4 }}>
          ID: {user?.id}
        </Text>
        <Text style={{ color: theme.secondary, marginBottom: 4 }}>
          {t('since')}: {user?.created}
        </Text>
        <Text style={{ color: theme.secondary }}>{user?.email}</Text>
      </View>

      <View
        style={{
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
          height: 45,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: theme.secondary, fontSize: 16}}>
          {t('my_posts')}
        </Text>
      </View>
    </View>
  );
}
