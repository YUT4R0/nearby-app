import { colors } from "@/styles/colors";
import { IconProps } from "@tabler/icons-react-native";
import { Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
  icon: React.ComponentType<IconProps>;
};

export function Step({ icon: Icon, subtitle, title }: Props) {
  return (
    <View className="w-full flex flex-row gap-4">
      {Icon && <Icon size={32} color={colors.red.base} />}
      <View className="flex-1 mt-[-4px]">
        <Text className="text-base font-semiBold text-gray-600">{title}</Text>
        <Text className="text-sm font-regular text-gray-500 mt-1">
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
