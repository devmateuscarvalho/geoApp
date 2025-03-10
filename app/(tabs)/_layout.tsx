import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, useColorScheme } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4A4A4A",
        tabBarInactiveTintColor: "#A9A9A9",
        tabBarStyle: {
          backgroundColor: "#E0E0E0",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
        headerStyle: {
          backgroundColor: "#F5F5F5",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 3,
        },
        headerTintColor: "#4A4A4A",
        headerTitleStyle: {
          fontWeight: "normal",
          fontSize: 16,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="muro-gabiao"
        options={{
          title: "Muro Gabião",
          tabBarIcon: ({ color }) => <TabBarIcon name="wall" color={color} />,
        }}
      />
      <Tabs.Screen
        name="dimensionamento-solo"
        options={{
          title: "Dimensionamento do Solo",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="terrain" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
