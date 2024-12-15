import { colors } from "@/styles/colors";
import { IconProps } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  description: string;
  icon: React.ComponentType<IconProps>;
};

export function Info({ icon: Icon, description }: Props) {
  return (
    <View className="flex flex-row items-center gap-2">
      <Icon size={16} color={colors.gray[400]} />
      <Text className="text-gray-500 font-regular text-sm flex-1 leading-6">
        {description}
      </Text>
    </View>
  );
}
