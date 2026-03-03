import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',

        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Quizzes',
          headerTitleAlign: 'center',
          headerTitle: 'RespondAI',
          headerTitleStyle: {
            fontFamily: 'Sansation-Bold',
            fontSize: 26,
            fontWeight: '600',
          },
          headerStyle: { backgroundColor: '#f7f8fb' },    
          tabBarLabelStyle: {
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? 'list-alt' : 'list'}
              color={color}
              size={focused ? 24 : 22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createQuizScreen"
        options={{
          title: 'Crie seu quiz',
          headerTitleAlign: 'center',
          tabBarLabelStyle: {
            fontWeight: '600',
          },

          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? 'plus-circle' : 'plus'}
              color={color}
              size={focused ? 24 : 22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="configScreen"
        options={{
          title: 'Minha conta',
          headerTitleAlign: 'center',
          tabBarLabelStyle: {
            fontWeight: '600',
          },

          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? 'user-circle' : 'user'}
              color={color}
              size={focused ? 24 : 22}
            />
          ),
        }}
      />
    </Tabs>
  );
}
