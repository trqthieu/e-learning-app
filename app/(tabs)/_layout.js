import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
      }}
      // tabBar={(props) =>
      //   Platform.OS === "ios" ? (
      //     <BlurView
      //       style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      //       tint={colorScheme == "dark" ? "dark" : "light"}
      //       intensity={95}
      //     >
      //       <BottomTabBar {...props} />
      //     </BlurView>
      //   ) : (
      //     <BottomTabBar {...props} />
      //   )
      // }
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          href: '/home',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='home' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          href: {
            pathname: '/search',
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='search' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='mycourse'
        options={{
          title: 'Study',
          href: {
            pathname: '/mycourse',
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='book' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='myexam'
        options={{
          title: 'Exam',
          href: {
            pathname: '/myexam',
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='calculator' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Profile',
          href: {
            pathname: '/account',
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='user' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
