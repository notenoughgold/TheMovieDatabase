import React from "react";
import { View, Text, FlatList } from "react-native";

export default class TvShowsScreen extends React.Component {
  static navigationOptions = {
    title: "TV Shows"
  };

  render() {
    return (
      <View>
        <View style={{ marginStart: 16, marginTop: 16 }}>
          <Text
            style={{
              fontSize: 16
            }}
          >
            Popular Movies
          </Text>
        </View>
      </View>
    );
  }
}
