import { IconArrowLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, View } from "react-native";
import { Button } from "../Button";

type Props = {
  uri: string;
};

export function Cover({ uri }: Props) {
  router;
  return (
    <ImageBackground
      source={{ uri }}
      className="w-full h-60 mb-[-32px] bg-gray-200"
    >
      <View className="p-6 pt-14">
        <Button style={{ height: 40, width: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}
