import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";

import { View, Text, Image, Dimensions, ActivityIndicator } from "react-native";
import { getImageLink, fetchPeopleDetailsAsync } from "../data/Repository";
import {
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native-gesture-handler";
import PeopleDetailsCreditItem from "../components/PeopleDetailsCreditItem";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function PeopleDetailsScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [peopleResponse, setPeopleResponse] = useState(null);
  const { colors } = useTheme();

  const fetchPeopleDetails = peopleId => {
    setIsLoading(true);
    fetchPeopleDetailsAsync(peopleId).then(response => {
      setIsLoading(false);
      setPeopleResponse(response);
    });
  };
  useEffect(() => {
    console.log("componentDidMount");
    fetchPeopleDetails(route.params?.peopleId);
  }, []);

  if (peopleResponse != null) {
    var people = peopleResponse;
  }
  const ifCast = route.params?.ifCast;

  const renderPeopleHeader = people => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          {people.profile_path != null ? (
            <Image
              source={{ uri: getImageLink(people.profile_path, 780) }}
              style={{
                width: "100%",
                height: screenHeight / 3,
                flex: 1
              }}
            ></Image>
          ) : (
            <View
              style={{
                width: "100%",
                height: screenHeight / 3,
                flex: 1,
                backgroundColor: "lightgrey",
                borderRadius: 16
              }}
            ></View>
          )}

          <View style={{ width: 8 }}></View>
          <View
            style={{
              flex: 1,
              height: screenHeight / 3,
              justifyContent: "space-between"
            }}
          >
            <Text numberOfLines={10} style={{ color: colors.text }}>
              {people.biography}
            </Text>
            {people.biography.length > 0 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Biography", {
                    biography: people.biography
                  })
                }
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.text
                  }}
                >
                  Read all
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            paddingHorizontal: 16,
            paddingBottom: 8
          }}
        >
          {ifCast ? "Cast in" : "Crew in"}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1
      }}
    >
      {isLoading && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      )}
      {peopleResponse != null && (
        <FlatList
          data={ifCast ? people.movie_credits.cast : people.movie_credits.crew}
          keyExtractor={(item, index) => item.id.toString()}
          ListHeaderComponent={renderPeopleHeader(people)}
          renderItem={({ item }) => (
            <PeopleDetailsCreditItem
              item={item}
              ifCast={ifCast}
              onPress={() =>
                navigation.push("MovieDetails", {
                  movieId: item.id,
                  movieTitle: item.title
                })
              }
            ></PeopleDetailsCreditItem>
          )}
        ></FlatList>
      )}
    </View>
  );
}
