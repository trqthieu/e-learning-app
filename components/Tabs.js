import React, { useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity onPress={onHandleSearchType}>
      <Text
        style={{
          fontWeight: "500",
          marginTop: 10,
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        contentContainerStyle={{ columnGap: 10 }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    marginBottom: 6 / 2,
  },
});

export default Tabs;
