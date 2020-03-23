import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import MovieDetailsCreditItem from "../components/MovieDetailsCreditItem";

export default function AllCreditsScreen({ route, navigation }) {
  const credits = route.params?.credits;
  const ifCast = route.params?.ifCast;

  return (
    <View
      style={{
        flex: 1
      }}
    >
      {credits != null && (
        <FlatList
          data={credits}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieDetailsCreditItem
              item={item}
              ifCast={ifCast}
              onPress={() =>
                navigation.navigate("PeopleDetails", {
                  peopleId: item.id,
                  peopleName: item.name,
                  ifCast: ifCast
                })
              }
            ></MovieDetailsCreditItem>
          )}
        ></FlatList>
      )}
    </View>
  );
}
