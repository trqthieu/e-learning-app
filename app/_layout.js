import { Stack } from 'expo-router';

export default function RootLayout() {
  console.log('root layout rendered');
  return (
    <Stack
    // screenOptions={{
    //   ...
    // }}
    // initialRouteName='home'
    >
      <Stack.Screen
        name='(tabs)'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
