// src/utils/location.ts
import * as Location from 'expo-location';

export type CheckLocationResult = {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  timestamp: number;
};

export async function getCurrentLocationForCheck(): Promise<CheckLocationResult> {
  // 1. Xin quyền
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  // 2. Kiểm tra xem service có bật không (GPS / Location service)
  const servicesEnabled = await Location.hasServicesEnabledAsync();
  if (!servicesEnabled) {
    throw new Error('Location services are disabled');
  }

  // 3. Lấy vị trí hiện tại
  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High, // có thể hạ xuống Balanced cho đỡ tốn pin
  });

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    timestamp: position.timestamp,
  };
}
