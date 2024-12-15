import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";
import { Info } from "./Info";

export type PropsDetails = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
};

type Props = {
  data: PropsDetails;
};

export function Details({ data }: Props) {
  return (
    <View className="p-8 pb-0 rounded-t-3xl bg-gray-100">
      <Text className="font-bold text-xl text-gray-600">{data.name}</Text>
      <Text className="font-regular text-base text-gray-500 mt-3 mb-8 leading-6">
        {data.description}
      </Text>

      <View className="w-full border-b border-b-gray-200 pb-4 mb-4">
        <Text className="font-medium text-md text-gray-600 mb-3">
          Informações
        </Text>
        <Info
          description={`${data.coupons} cupons disponíveis`}
          icon={IconTicket}
        />
        <Info description={data.address} icon={IconMapPin} />
        <Info description={data.phone} icon={IconPhone} />
      </View>

      <View className="w-full border-b border-b-gray-200 pb-4 mb-4">
        <Text className="font-medium text-md text-gray-600 mb-3">
          Regulamento
        </Text>
        {data.rules.map(({ description, id }) => (
          <Text key={id} className="font-medium text-md text-gray-500">
            {`\u2022 ${description}\n`}
          </Text>
        ))}
      </View>
    </View>
  );
}
