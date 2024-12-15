import { colors } from "@/styles/colors";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import { Place, PlaceProps } from "./Place";

type Props = {
  data: PlaceProps[];
};

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions();
  const bottomSheet = useRef<BottomSheet>(null);

  const snapPoints = {
    min: 278,
    max: dimensions.height - 278,
  };

  return (
    <BottomSheet
      ref={bottomSheet}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={{
        width: 80,
        height: 4,
        backgroundColor: colors.gray[300],
      }}
      backgroundStyle={{ backgroundColor: colors.gray[100] }}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}`)}
          />
        )}
        contentContainerStyle={{
          gap: 12,
          padding: 24,
          paddingBottom: 100,
        }}
        ListHeaderComponent={() => (
          <Text className="text-gray-600 text-xs font-regular mb-4">
            Explore locais perto de vocês
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
