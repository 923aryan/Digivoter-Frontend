import { Stack } from 'expo-router';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{headerShown: true, headerTitle: "Back", headerBackTitle: "Back", headerBackVisible: true }}>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="EnrollmentScreen" />
      <Stack.Screen name="ImageUploadScreen" />
      <Stack.Screen name="SuccessfullyEnrolled" />
      <Stack.Screen name="TermsAndConditions" />
      <Stack.Screen name="CredentialScreen" />
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="UserDetailsScreen" />

    </Stack>
  );
}
