import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

import { getImageLink } from "../data/Repository";

export default function PersonDetailsCreditItem({ item, ifCast, onPress }) {
  const { colors } = useTheme();

  var str;
  if (ifCast) {
    str = item.character;
  } else {
    str = item.job;
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 16,
          paddingVertical: 8
        }}
      >
        {item.poster_path != null ? (
          <Image
            source={{ uri: getImageLink(item.poster_path, 300) }}
            style={{ width: 80, height: 120 }}
          ></Image>
        ) : (
          <View
            style={{
              width: 80,
              height: 120,
              backgroundColor: "lightgrey"
            }}
          ></View>
        )}
        <View style={{ justifyContent: "center", paddingStart: 16 }}>
          <Text style={{ color:colors.text, fontSize: 16  }}> {item.title} </Text>
          {str.length > 0 && <Text style={{color:colors.text, fontStyle: "italic" }}>{str}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}
