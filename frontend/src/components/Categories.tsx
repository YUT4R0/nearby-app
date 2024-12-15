import React from "react";
import { FlatList } from "react-native";
import { Category } from "./Category";

export type CategoryProps = {
  id: string;
  name: string;
};

interface Props {
  data?: CategoryProps[];
  selected: string;
  onSelect: (id: string) => void;
}

export function Categories({ data, onSelect, selected }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 24 }}
      className="max-h-9 absolute z-10 top-16"
    />
  );
}
