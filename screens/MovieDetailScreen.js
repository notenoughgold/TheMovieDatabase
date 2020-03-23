import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { getImageLink, fetchMovieDetailsAsync } from "../data/Repository";
import {
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native-gesture-handler";
import MovieDetailsCreditItem from "../components/MovieDetailsCreditItem";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function MovieDetailsScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesResponse, setMoviesResponse] = useState(null);
  const { colors } = useTheme();

  const fetchMovieDetails = movieId => {
    setIsLoading(true);
    fetchMovieDetailsAsync(movieId).then(response => {
      setIsLoading(false);
      setMoviesResponse(response);
      // this.setState({ isLoading: false, moviesResponse: response });
    });
  };

  useEffect(() => {
    console.log("componentDidMount");
    fetchMovieDetails(route.params?.movieId);
  }, []);

  const renderGenreChips = genres => {
    var genreNames = genres.map(genre => genre.name);
    var str = genreNames.join(" | ");
    return (
      <Text style={{ color: colors.text, fontWeight: "bold" }}>{str}</Text>
    );
  };

  const renderListHeader = movie => {
    return (
      <View>
        {movie.backdrop_path != null && (
          <ImageBackground
            source={{ uri: getImageLink(movie.backdrop_path, 780) }}
            style={{ width: "100%", height: screenHeight / 3 }}
          ></ImageBackground>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingTop: 8
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontStyle: "italic", color: colors.text }}>
              Release Date
            </Text>
            <Text style={{ color: colors.text }}>
              {movie.release_date.length == 0
                ? "-"
                : String(movie.release_date)}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontStyle: "italic", color: colors.text }}>
              Runtime
            </Text>
            <Text style={{ color: colors.text }}>
              {movie.runtime == null ? "-" : String(movie.runtime) + " m"}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontStyle: "italic", color: colors.text }}>
              Vote Average
            </Text>
            <Text style={{ color: colors.text }}>
              {movie.vote_average == 0 ? "-" : String(movie.vote_average)}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            flexWrap: "wrap"
          }}
        >
          {renderGenreChips(movie.genres)}
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ color: colors.text }}>{movie.overview}</Text>
        </View>
      </View>
    );
  };

  if (moviesResponse != null) {
    var movie = moviesResponse;
  }

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
      {moviesResponse != null && (
        <ScrollView>
          {movie.backdrop_path != null && (
            <ImageBackground
              source={{ uri: getImageLink(movie.backdrop_path, 780) }}
              style={{ width: "100%", height: screenHeight / 3 }}
            ></ImageBackground>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingTop: 8
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontStyle: "italic", color: colors.text }}>
                Release Date
              </Text>
              <Text style={{ color: colors.text }}>
                {movie.release_date.length == 0
                  ? "-"
                  : String(movie.release_date)}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontStyle: "italic", color: colors.text }}>
                Runtime
              </Text>
              <Text style={{ color: colors.text }}>
                {movie.runtime == null ? "-" : String(movie.runtime) + " m"}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontStyle: "italic", color: colors.text }}>
                Vote Average
              </Text>
              <Text style={{ color: colors.text }}>
                {movie.vote_average == 0 ? "-" : String(movie.vote_average)}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              flexWrap: "wrap"
            }}
          >
            {renderGenreChips(movie.genres)}
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <Text style={{ color: colors.text }}>{movie.overview}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 8
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 20
              }}
            >
              Cast
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push("AllCredits", {
                  credits: movie.credits.cast,
                  ifCast: true
                })
              }
            >
              <Text style={{ color: colors.text }}>Show All</Text>
            </TouchableOpacity>
          </View>
          {movie.credits.cast.slice(0, 3).map(item => {
            return (
              <MovieDetailsCreditItem
                item={item}
                ifCast={true}
                onPress={() =>
                  navigation.push("PeopleDetails", {
                    peopleId: item.id,
                    peopleName: item.name,
                    ifCast: true
                  })
                }
              ></MovieDetailsCreditItem>
            );
          })}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 8
            }}
          >
            <Text
              style={{
                color: colors.text,

                fontSize: 20
              }}
            >
              Crew
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push("AllCredits", {
                  credits: movie.credits.crew,
                  ifCast: false
                })
              }
            >
              <Text style={{ color: colors.text }}>Show All</Text>
            </TouchableOpacity>
          </View>
          {movie.credits.crew.slice(0, 3).map(item => {
            return (
              <MovieDetailsCreditItem
                item={item}
                ifCast={false}
                onPress={() =>
                  navigation.push("PeopleDetails", {
                    peopleId: item.id,
                    peopleName: item.name,
                    ifCast: false
                  })
                }
              ></MovieDetailsCreditItem>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
