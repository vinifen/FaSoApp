import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import useTheme from 'shared/hooks/useTheme';
import i18n from 'shared/i18n';


export default function IndexActionSheet() {
  const { theme } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const { t } = i18n
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleOpenActionSheet = () => {
    const options = [t("show_block"), t("hide_block"), t("cancel")];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: '',
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            setIsShow(true);
            break;
          case 1:
            setIsShow(false);
            break;
          case 2:
            break;
        }
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.text, marginBottom: 16 }}>IndexActionSheet</Text>
      {isShow && (
        <View style={{
          width: 100,
          height: 100,
          backgroundColor: theme.secondary,
        }}>
        </View>
      )}
      <Button title={t("open_action")} onPress={handleOpenActionSheet} />
    </View>
  );
}
