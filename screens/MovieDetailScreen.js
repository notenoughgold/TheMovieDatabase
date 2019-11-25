import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  ActivityIndicator
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

export default class MovieDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("movieTitle")
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      moviesResponse: null
    };
  }
  fetchMovieDetails(movieId) {
    this.setState({ isLoading: true });
    fetchMovieDetailsAsync(movieId).then(response => {
      this.setState({ isLoading: false, moviesResponse: response });
    });
  }
  componentDidMount() {
    console.log("componentDidMount");
    this.fetchMovieDetails(this.props.navigation.getParam("movieId"));
  }

  renderGenreChips(genres) {
    var genreNames = genres.map(genre => genre.name);
    var str = genreNames.join(" | ");
    return <Text style={{ fontWeight: "bold" }}>{str}</Text>;
  }

  render() {
    if (this.state.moviesResponse != null) {
      var movie = this.state.moviesResponse;
    }

    return (
      <View
        style={{
          flex: 1
        }}
      >
        {this.state.isLoading && (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        )}
        {this.state.moviesResponse != null && (
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
                <Text style={{ fontStyle: "italic", color: "grey" }}>
                  Release Date
                </Text>
                <Text>
                  {movie.release_date.length == 0
                    ? "-"
                    : String(movie.release_date)}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontStyle: "italic", color: "grey" }}>
                  Runtime
                </Text>
                <Text>
                  {movie.runtime == null ? "-" : String(movie.runtime) + " m"}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontStyle: "italic", color: "grey" }}>
                  Vote Average
                </Text>
                <Text>
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
              {this.renderGenreChips(movie.genres)}
            </View>
            <View style={{ paddingHorizontal: 16 }}>
              <Text>{movie.overview}</Text>
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
                  fontSize: 20
                }}
              >
                Cast
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push("AllCredits", {
                    credits: movie.credits.cast,
                    ifCast: true
                  })
                }
              >
                <Text>Show All</Text>
              </TouchableOpacity>
            </View>

            <View>
              <FlatList
                data={movie.credits.cast.slice(0, 3)}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => (
                  <MovieDetailsCreditItem
                    item={item}
                    ifCast={true}
                    onPress={() =>
                      this.props.navigation.push("PeopleDetails", {
                        peopleId: item.id,
                        peopleName: item.name,
                        ifCast: true
                      })
                    }
                  ></MovieDetailsCreditItem>
                )}
              ></FlatList>
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
                  fontSize: 20
                }}
              >
                Crew
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push("AllCredits", {
                    credits: movie.credits.crew,
                    ifCast: false
                  })
                }
              >
                <Text>Show All</Text>
              </TouchableOpacity>
            </View>

            <View>
              <FlatList
                data={movie.credits.crew.slice(0, 3)}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => (
                  <MovieDetailsCreditItem
                    item={item}
                    ifCast={false}
                    onPress={() =>
                      this.props.navigation.push("PeopleDetails", {
                        peopleId: item.id,
                        peopleName: item.name,
                        ifCast: false
                      })
                    }
                  ></MovieDetailsCreditItem>
                )}
              ></FlatList>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
