import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("root layout rendered");
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
      }}
      // initialRouteName='home'
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(public)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
