import React from "react";
import { View, ActivityIndicator, Image, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-navigation";
import { fetchPopularMoviesAsync, getImageLink } from "../data/Repository";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Movies"
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      isLoading: true,
      loadingMore: false,
      error: null,
      moviesList: []
    };
  }

  mergeResponseToOldRes(response, page) {
    if (page === 1) {
      return response.results;
    } else {
      return [...this.state.moviesList, ...response.results];
    }
  }

  async fetchPopularMovies() {
    try {
      var response = await fetchPopularMoviesAsync(this.state.page);
      this.setState({
        moviesList: this.mergeResponseToOldRes(response, this.state.page),
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({ error, isLoading: false });
    }
  }

  loadMore() {
    this.setState(
      (prevState, props) => ({
        page: prevState.page + 1,
        loadingMore: true
      }),
      () => {
        this.fetchPopularMovies();
      }
    );
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.fetchPopularMovies();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        {this.state.isLoading && (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}
        {this.state.moviesList.length > 0 && (
          <FlatList
            numColumns={2}
            data={this.state.moviesList}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => this.buildMoviePoster(item)}
            onEndReached={() => this.loadMore()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderLoadingFooter}
          />
        )}
      </View>
    );
  }
  buildMoviePoster(item) {
    var posterUrl = getImageLink(item.poster_path, 500);
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.push("MovieDetails", {
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
  }

  renderLoadingFooter = () => {
    if (!this.state.loadingMore) return null;

    return (
      <View style={{ paddingVertical: 8 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
}
