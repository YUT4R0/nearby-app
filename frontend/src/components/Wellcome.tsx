import React from "react";
import { Image, Text, View } from "react-native";

export function Wellcome() {
  return (
    <View>
      <Image
        source={require("@/assets/logo.png")}
        style={{ height: 48, width: 48, marginTop: 24, marginBottom: 28 }}
      />
      <Text className="text-2xl font-bold text-gray-600">
        Boas vindas ao Nearby!
      </Text>
      <Text className="text-[1rem] font-regular text-gray-500 mt-3">
        Tenha cupons de vantagem para usar em seus estabelecimentos favoritos.
      </Text>
    </View>
  );
}
