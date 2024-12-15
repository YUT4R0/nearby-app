import { colors } from "@/styles/colors";
import { categoriesIcons } from "@/utils/categories-icons";
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
  iconId: string;
  isSelected?: boolean;
  name: string;
};

export function Category({ name, iconId, isSelected = false, ...rest }: Props) {
  const Icon = categoriesIcons[iconId];
  return (
    <Pressable
      className={`h-9 ${
        isSelected ? "bg-green-base border-green-base" : "bg-gray-100"
      } border border-gray-300 rounded-lg justify-center flex items-center flex-row px-3 gap-3`}
      {...rest}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text
        className={`text-sm text-gray-${
          isSelected ? "100" : "500"
        } font-regular`}
      >
        {name}
      </Text>
    </Pressable>
  );
}
