import { ScrollView } from "react-native";
import React from "react";
import useTheme from "shared/hooks/useTheme";
import { useTranslation } from "react-i18next";
import RegisterForm from "shared/components/pages/register/RegisterForm";
import { H2 } from "shared/components/ui/Titles";
import { Flex } from "shared/components/ui";

export default function IndexRegister() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingHorizontal: "10%",
        paddingBottom: 20,
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Flex justify="center" align="center" style={{ marginVertical: 20 }}>
        <H2 style={{ color: theme.secondary, textAlign: "center" }}>
          {t("welcome") + " " + t("register")}
        </H2>
      </Flex>

      <RegisterForm />
    </ScrollView>
  );
}
