import { api } from "@/api";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { Coupon } from "@/components/market/Coupon";
import { Cover } from "@/components/market/Cover";
import { Details, PropsDetails } from "@/components/market/Details";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";

type DataProps = PropsDetails & {
  cover: string;
};

export default function MarketId() {
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const qrLock = useRef(false);

  const { id } = useLocalSearchParams<{ id: string }>();
  const [_, requestPermission] = useCameraPermissions();

  async function fetchMarket() {
    try {
      const { data } = await api.get<DataProps>(`/markets/${id}`);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar dados", [
        { text: "Ok", onPress: () => router.back() },
      ]);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [id, coupon]);

  if (isLoading) return <Loading />;

  if (!data) return <Redirect href={"/home"} />;

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted)
        return Alert.alert("Camera", "Você precisa habilitar o uso da camera");

      qrLock.current = false;
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to open camera");
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);
      const { data } = await api.patch<{ coupon: string }>(`/coupons/${id}`);
      Alert.alert("Coupon", String(data.coupon));
      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to get coupon");
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsModalOpen(false);
    Alert.alert(
      "Cupom",
      "Não foi possível possível usar o cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle={"light-content"} hidden={isModalOpen} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View className="p-8">
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isModalOpen}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />
        <View className="absolute bottom-8 left-8 right-8">
          <Button
            onPress={() => setIsModalOpen(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
