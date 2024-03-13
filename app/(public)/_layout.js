import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: "#6c47ff",
        // },
        // headerTintColor: "#fff",
        headerBackTitle: "Back",
      }}
    ></Stack>
  );
};

export default PublicLayout;
