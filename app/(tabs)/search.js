import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import instance from '../../axios-instance';
import { getUser } from '../../storage';
import PotentialCourse from '../../components/PotentialCourse';
import SearchCourse from '../../components/SearchCourse';
import { useLocalSearchParams } from 'expo-router';

const SearchPage = () => {
  const local = useLocalSearchParams();
  const [searchText, setSearchText] = useState(local.searchData || '');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [data, setData] = useState([]);
  console.log('data', data);

  // Sample categories and levels in the new format
  const categories = {
    IELTS: 'IELTS',
    TOEIC: 'TOEIC',
    TOEFL: 'TOEFL',
    ENGLISH_BASIC: 'English Basic',
    OTHERS: 'Others',
  };
  const levels = {
    A1: 'A1',
    A2: 'A2',
    B1: 'B1',
    B2: 'B2',
    C1: 'C1',
    C2: 'C2',
  };
  useEffect(() => {
    console.log('local.searchData', local.searchData);
    setSearchText(local.searchData);
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
    console.log(
      'Searching for: ',
      searchText,
      ' in category: ',
      selectedCategory,
      ' and level: ',
      selectedLevel
    );
    fetchCourses();
  };

  const handleCategorySelect = categoryKey => {
    setSelectedCategory(selectedCategory === categoryKey ? null : categoryKey);
  };

  const handleLevelSelect = levelKey => {
    setSelectedLevel(selectedLevel === levelKey ? null : levelKey);
  };

  const fetchCourses = async () => {
    try {
      const data = await instance.get('/courses', {
        params: {
          order: 'ASC',
          page: 1,
          take: 10,
          name: searchText || undefined,
          level: selectedLevel || undefined,
          category: selectedCategory || undefined,
        },
      });
      console.log('data course', data);
      setData(data?.data?.data || []);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {/* <FontAwesome name='search' size={20} color='#777' style={styles.icon} /> */}
        <TextInput
          style={styles.input}
          placeholder='Tìm kiếm...'
          placeholderTextColor='#777'
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <FontAwesome name='search' size={20} color='white' />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.title}>Thể loại:</Text>
        <FlatList
          data={Object.entries(categories)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item[0]}
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
      <View style={styles.filterContainer}>
        <Text style={styles.title}>Mức độ:</Text>
        <FlatList
          data={Object.entries(levels)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item[0]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterItem,
                selectedLevel === item[0] && styles.selectedFilter,
              ]}
              onPress={() => handleLevelSelect(item[0])}
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
    backgroundColor: '#fff',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    borderRadius: 25,
    padding: 10,
  },
  filterContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedFilter: {
    backgroundColor: 'orange',
  },
  filterText: {
    color: '#333',
  },
});

export default SearchPage;
