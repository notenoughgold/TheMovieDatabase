import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

export default function AllCreditsScreen({ navigation, route }) {
  const { colors } = useTheme();
  const biography = route.params?.biography;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{color:colors.text}}>{biography}</Text>
      </View>
    </ScrollView>
  );
}
