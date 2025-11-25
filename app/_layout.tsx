import { useThemeStore } from '@/src/store/themeStore';
import { darkTheme, lightTheme } from '@/src/theme';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  // Get color scheme
  const colorScheme = useColorScheme();

  // Get theme from store or system
  const { themeMode, loadThemeMode } = useThemeStore();

  // Load theme mode from storage on mount
  useEffect(() => {
    loadThemeMode();
  }, [loadThemeMode]);

  const getTheme = () => {
    if (themeMode === 'system') {
      return colorScheme === 'dark' ? darkTheme : lightTheme;
    }
    if (themeMode === 'light') return lightTheme;
    if (themeMode === 'dark') return darkTheme;
  };

  // Get theme depend on your system color scheme
  const theme = getTheme();
  console.log('Current theme:', colorScheme);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="pagination" options={{ headerShown: false }} />
          <Stack.Screen name="colorPicker" options={{ headerShown: false }} />
          <Stack.Screen name="menu" options={{ headerShown: false }} />
          <Stack.Screen name="dialog" options={{ headerShown: false }} />
          <Stack.Screen name="timeframe" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
