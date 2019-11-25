import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default class AllCreditsScreen extends React.Component {
  static navigationOptions = {
    title: "Biography"
  };

  constructor(props) {
    super(props);
  }

  render() {
    const biography = this.props.navigation.getParam("biography");

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text>{biography}</Text>
        </View>
      </ScrollView>
    );
  }
}
