import React from "react";
import { View, Text, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import MovieDetailsCreditItem from "../components/MovieDetailsCreditItem";

export default class AllCreditsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    var str = navigation.getParam("ifCast") ? "Cast" : "Crew";
    return {
      title: str
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const credits = navigation.getParam("credits");
    const ifCast = navigation.getParam("ifCast");

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
                  this.props.navigation.navigate("PeopleDetails", {
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
}
