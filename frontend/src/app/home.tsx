import { api } from "@/api";
import { Categories, CategoryProps } from "@/components/Categories";
import { PlaceProps } from "@/components/Place";
import { Places } from "@/components/Places";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Callout, Marker } from "react-native-maps";

import * as Location from "expo-location";
import { router } from "expo-router";

type MarketProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

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

  async function getCurrentUserLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const location = await Location.getCurrentPositionAsync();
        console.log(location);
      }
    } catch (error) {
      console.error("permission denied: " + error);
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
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />
        {markets.map(({ longitude, latitude, id, name, address }) => (
          <Marker
            key={id}
            identifier={id}
            coordinate={{ latitude, longitude }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${id}`)}>
              <View>
                <Text className="text-sm text-gray-600 font-medium">
                  {name}
                </Text>
                <Text className="text-xs text-gray-600 font-regular">
                  {address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Places data={markets} />
    </GestureHandlerRootView>
  );
}
