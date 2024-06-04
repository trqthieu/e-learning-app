import { FontAwesome } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { getToken } from '../../storage';

export default function TabsLayout() {
  console.log('run tablayout');
  const checkLogin = async () => {
    const token = await getToken();
    if (!token) {
      router.replace('/login');
    }
  };
  checkLogin();
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
          title: 'Trang chủ',
          href: '/home',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='home' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Tìm kiếm',
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
          title: 'Học tập',
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
          title: 'Bài thi',
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
          title: 'Cá nhân',
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
