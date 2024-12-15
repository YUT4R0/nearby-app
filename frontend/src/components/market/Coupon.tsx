import { colors } from "@/styles/colors";
import { IconTicket } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  code: string;
};

export function Coupon({ code }: Props) {
  return (
    <View className="px-8">
      <Text className="text-gray-500 font-medium mb-3 text-sm">
        Utilize ese cupom
      </Text>
      <View className="flex flex-row bg-green-soft px-2 py-3 rounded-lg items-center gap-3">
        <IconTicket size={24} color={colors.green.light} />
        <Text className="text-gray-600 text-base font-bold uppercase">
          {code}
        </Text>
      </View>
    </View>
  );
}
