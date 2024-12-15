import { Button } from "@/components/Button";
import { Steps } from "@/components/Steps";
import { Wellcome } from "@/components/Wellcome";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 p-10 gap-10">
      <Wellcome />
      <Steps />
      <Button onPress={() => router.navigate("/home")}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  );
}
