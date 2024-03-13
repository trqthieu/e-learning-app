import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import instance from "../../axios-instance";
import { getUser } from "../../storage";
import PotentialCourse from "../../components/PotentialCourse";
import SearchCourse from "../../components/SearchCourse";
import { useLocalSearchParams } from "expo-router";
import CourseCard from "../../components/CourseCard";
const MyCoursePage = () => {
  const local = useLocalSearchParams();
  const [searchText, setSearchText] = useState(local.searchData || "");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [data, setData] = useState([]);
  console.log("data", data);

  // Sample categories and levels in the new format
  const categories = {
    ALL: "All",
    ARCHIVE: "Archive",
    FAVORITE: "Favorite",
  };
  useEffect(() => {}, []);

  const handleSearch = () => {
    console.log(
      "Searching for: ",
      searchText,
      " in category: ",
      selectedCategory,
      " and level: ",
      selectedLevel
    );
    fetchCourses();
  };

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(selectedCategory === categoryKey ? null : categoryKey);
  };

  const fetchCourses = async () => {
    try {
      const user = getUser();
      const data = await instance.get("/user-course", {
        params: {
          order: "ASC",
          page: 1,
          take: 10,
          userId: user.id,
        },
      });
      setData(data?.data?.data.map((item) => item.course) || []);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#777"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <FontAwesome name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <FlatList
          data={Object.entries(categories)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterItem,
                selectedCategory === item[0] && styles.selectedFilter,
              ]}
              onPress={() => handleCategorySelect(item[0])}
            >
              <Text style={styles.filterText}>{item[1]}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {data.length ? <SearchCourse data={data} /> : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#333",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    borderRadius: 25,
    padding: 10,
  },
  filterContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedFilter: {
    backgroundColor: "orange",
  },
  filterText: {
    color: "#333",
  },
});

export default MyCoursePage;
