import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { UserProvider } from './context/UserContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <RootSiblingParent>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(screens)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </RootSiblingParent>
    </UserProvider>

  );
}
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});