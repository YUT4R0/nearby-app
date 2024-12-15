import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";
import { Step } from "./Step";

export function Steps() {
  return (
    <View className="gap-6 flex-1">
      <Text className="text-base text-gray-500">Veja como funciona:</Text>
      <Step
        icon={IconMapPin}
        subtitle="Veja locais perto de você que são parceiros Nearby"
        title="Encontre estabelecimentos"
      />
      <Step
        icon={IconQrcode}
        subtitle="Escaneie o código no estabelecimento para usar o benefício"
        title="Ative o cupom com QR Code"
      />
      <Step
        icon={IconTicket}
        subtitle="Ative cupons onde estiver, em diferentes tipos de estabelecimento "
        title="Garanta vantagens perto de você"
      />
    </View>
  );
}
