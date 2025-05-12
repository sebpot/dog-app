import { useColorScheme } from "@/hooks/useColorScheme.web";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function BreedLayout() {
  const colorScheme = useColorScheme();

  return (
  <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="[breedId]" options={{ headerShown: false }} />
    </Stack>
  </ThemeProvider>
  );
}