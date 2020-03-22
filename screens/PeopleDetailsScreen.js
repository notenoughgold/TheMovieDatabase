import React from "react";
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

export default class PeopleDetailsScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam("peopleName")
  //   };
  // };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      peopleResponse: null
    };
  }
  fetchPeopleDetails(peopleId) {
    this.setState({ isLoading: true });
    fetchPeopleDetailsAsync(peopleId).then(response => {
      this.setState({ isLoading: false, peopleResponse: response });
    });
  }
  componentDidMount() {
    console.log("componentDidMount");
    this.fetchPeopleDetails(this.props.route.params?.peopleId);
  }

  render() {
    const ifCast = this.props.route.params?.ifCast;

    if (this.state.peopleResponse != null) {
      var people = this.state.peopleResponse;
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
        {this.state.peopleResponse != null && (
          <ScrollView>
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
                    flex: 1,
                    borderRadius: 16
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
                <Text numberOfLines={10}>{people.biography}</Text>
                {people.biography.length > 0 && (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Biography", {
                        biography: people.biography
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "grey"
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
                fontSize: 20,
                paddingHorizontal: 16,
                paddingBottom: 8
              }}
            >
              {ifCast ? "Cast in" : "Crew in"}
            </Text>
            <View>
              <FlatList
                data={
                  ifCast ? people.movie_credits.cast : people.movie_credits.crew
                }
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => (
                  <PeopleDetailsCreditItem
                    item={item}
                    ifCast={ifCast}
                    onPress={() =>
                      this.props.navigation.push("MovieDetails", {
                        movieId: item.id,
                        movieTitle: item.title
                      })
                    }
                  ></PeopleDetailsCreditItem>
                )}
              ></FlatList>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
