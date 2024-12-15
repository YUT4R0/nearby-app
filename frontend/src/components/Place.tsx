import { colors } from "@/styles/colors";
import { IconTicket } from "@tabler/icons-react-native";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

export type PlaceProps = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
};

type Props = TouchableOpacityProps & {
  data: PlaceProps;
};

export function Place({ data, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="h-32 w-full p-2 border border-gray-200 rounded-xl flex flex-row gap-4 items-center"
      {...rest}
    >
      <Image
        style={{
          width: 116,
          height: 104,
          backgroundColor: colors.gray[200],
          borderRadius: 8,
        }}
        source={{ uri: data.cover }}
      />
      <View className="flex-1">
        <Text className="text-sm font-medium text-gray-600">{data.name}</Text>
        <Text numberOfLines={3} className="text-xs font-regular text-gray-500">
          {data.description}
        </Text>

        <View className="flex flex-row gap-2 mt-3">
          <IconTicket size={16} color={colors.red.base} />
          <Text className="text-xs font-regular text-gray-400">
            {data.coupons} cupons disponíveis
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
