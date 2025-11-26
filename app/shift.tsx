// src/screens/ShiftCheckScreen.tsx
import React, { useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getDistanceInMeters } from './utils/distance';
import { getCurrentLocationForCheck } from './utils/location';

// src/constants/location.ts
export const COMPANY_LOCATION = {
  latitude: 10.855775,
  longitude: 106.6311383,
};

export const MAX_DISTANCE_METERS = 100; // 100m

type Props = {
  shiftId: string;
};

export default function ShiftCheckScreen({ shiftId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheck = async (type: 'CHECKIN' | 'CHECKOUT') => {
    try {
      setLoading(true);

      // 1. Lấy GPS
      const loc = await getCurrentLocationForCheck();

      console.log('Location obtained:', loc);

      const distance = getDistanceInMeters(
        loc.latitude,
        loc.longitude,
        COMPANY_LOCATION.latitude,
        COMPANY_LOCATION.longitude
      );

      console.log('Distance to company (m):', distance);

      if (distance > MAX_DISTANCE_METERS) {
        Alert.alert(
          'Không thể thực hiện',
          `Bạn đang cách vị trí làm việc khoảng ~${distance.toFixed(
            1
          )}m.\nCần đứng trong bán kính ${MAX_DISTANCE_METERS}m để check ${
            type === 'CHECKIN' ? 'in' : 'out'
          }.`
        );
        return; // ❌ Không call API
      }

      //   // 2. Gửi lên API (ví dụ)
      //   const res = await fetch('https://api.your-domain.com/shifts/check', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       // Authorization: `Bearer ${token}`, // nếu có auth
      //     },
      //     body: JSON.stringify({
      //       shiftId,
      //       type, // 'CHECKIN' hoặc 'CHECKOUT'
      //       latitude: loc.latitude,
      //       longitude: loc.longitude,
      //       accuracy: loc.accuracy,
      //       timestamp: loc.timestamp,
      //     }),
      //   });

      //   if (!res.ok) {
      //     const text = await res.text();
      //     throw new Error(text || 'Check failed');
      //   }

      Alert.alert(
        'Thành công',
        type === 'CHECKIN' ? 'Checkin thành công' : 'Checkout thành công'
      );
    } catch (err: any) {
      console.error(err);
      Alert.alert('Lỗi', err.message || 'Không thể lấy vị trí / gọi API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', gap: 12 }}>
      <Text variant="titleMedium">Quản lý ca làm</Text>
      <Text>Shift ID: {shiftId}</Text>

      <Button
        mode="contained"
        onPress={() => handleCheck('CHECKIN')}
        disabled={loading}
      >
        Checkin
      </Button>

      <Button
        mode="contained-tonal"
        onPress={() => handleCheck('CHECKOUT')}
        disabled={loading}
      >
        Checkout
      </Button>

      {loading && (
        <View style={{ marginTop: 16 }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8 }}>Đang xử lý...</Text>
        </View>
      )}
    </View>
  );
}
