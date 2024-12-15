import { api } from "@/api";
import { Categories, CategoryProps } from "@/components/Categories";
import { PlaceProps } from "@/components/Place";
import { Places } from "@/components/Places";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
type MarketProps = PlaceProps & {};

export default function Home() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get<CategoryProps[]>("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.error(error);
      Alert.alert("Categorias", "Error fetching categories");
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return;
      const { data } = await api.get<MarketProps[]>(
        `/markets/category/${category}`
      );
      setMarkets(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Locais", "Error fetching markets");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#cecece" }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <Places data={markets} />
    </GestureHandlerRootView>
  );
}
