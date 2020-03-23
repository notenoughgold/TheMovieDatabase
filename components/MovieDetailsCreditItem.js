import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

import { getImageLink } from "../data/Repository";

export default function MovieDetailsCreditItem({ item, ifCast, onPress }) {
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
        {item.profile_path != null ? (
          <Image
            source={{ uri: getImageLink(item.profile_path, 300) }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          ></Image>
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "lightgrey"
            }}
          ></View>
        )}

        <View style={{ justifyContent: "center", paddingStart: 16 }}>
          <Text style={{ color: colors.text, fontSize: 16 }}>
            {" "}
            {item.name}{" "}
          </Text>
          {str.length > 0 && <Text style={{color: colors.text, fontStyle: "italic" }}>{str}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}
