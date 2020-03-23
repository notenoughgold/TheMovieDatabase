import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Image, Dimensions } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";

import { fetchPopularMoviesAsync, getImageLink } from "../data/Repository";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen({ route, navigation }) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [moviesList, setMoviesList] = useState([]);

  const mergeResponseToOldRes = (response, page) => {
    if (page === 1) {
      return response.results;
    } else {
      return [...moviesList, ...response.results];
    }
  };

  const fetchPopularMovies = async () => {
    try {
      var response = await fetchPopularMoviesAsync(page);
      setMoviesList(mergeResponseToOldRes(response, page));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
    setLoadingMore(true);
    fetchPopularMovies();
  };

  useEffect(() => {
    console.log("componentDidMount");
    fetchPopularMovies();
  }, []);

  const buildMoviePoster = item => {
    var posterUrl = getImageLink(item.poster_path, 500);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push("MovieDetails", {
            movieId: item.id,
            movieTitle: item.title
          })
        }
      >
        <Image
          source={{ uri: posterUrl }}
          style={{ width: screenWidth / 2, height: (screenWidth / 4) * 3 }}
        ></Image>
      </TouchableOpacity>
    );
  };

  const renderLoadingFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={{ paddingVertical: 8 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center"
      }}
    >
      {isLoading && <ActivityIndicator size="large"></ActivityIndicator>}
      {moviesList.length > 0 && (
        <FlatList
          numColumns={2}
          data={moviesList}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => buildMoviePoster(item)}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderLoadingFooter}
        />
      )}
    </View>
  );
}
