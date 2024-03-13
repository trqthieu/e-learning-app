import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  console.log("run check auth layout");
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
        // headerStyle: {
        //   backgroundColor: "#6c47ff",
        // },
        // headerTintColor: "#fff",
        // headerBackTitle: "Back",
      }}
    ></Stack>
  );
};

export default AuthLayout;
