import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import Constants from "expo-constants";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import MovieDetailsScreen from "./screens/MovieDetailScreen";
import AllCreditsScreen from "./screens/AllCreditScreen";
import PeopleDetailsScreen from "./screens/PeopleDetailsScreen";
import BiographyScreen from "./screens/BiographyScreen";
import MoviesScreen from "./screens/MoviesScreen";
import TvShowsScreen from "./screens/TvShowsScreen";

const MoviesStack = createStackNavigator({
  Movies: MoviesScreen,
  MovieDetails: MovieDetailsScreen,
  AllCredits: AllCreditsScreen,
  PeopleDetails: PeopleDetailsScreen,
  Biography: BiographyScreen
});

MoviesStack.navigationOptions = {
  drawerLabel: "Movies",
  drawerIcon: <MaterialIcons name="movie" size={24}></MaterialIcons>
};

const TvShowsStack = createStackNavigator({
  TvShows: TvShowsScreen
});

TvShowsStack.navigationOptions = {
  drawerLabel: "TV Shows",
  drawerIcon: <MaterialIcons name="tv" size={24}></MaterialIcons>
};
function CustomDrawerContentComponent(props) {
  return (
    <ScrollView>
      <SafeAreaView
        style={{ flex: 1 }}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View
          style={{
            height: 160,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: Constants.statusBarHeight
          }}
        >
          <Image
            style={{ height: 100, width: 100, resizeMode: "contain" }}
            source={require("./assets/images/tmdb-logo.png")}
          />
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
}

const AppDrawerNavigator = createDrawerNavigator(
  {
    Movies: MoviesStack,
    TvShows: TvShowsStack
  },
  {
    contentComponent: CustomDrawerContentComponent
  }
);

const AppContainer = createAppContainer(AppDrawerNavigator);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class LoaderContainer extends React.Component {
  state = { isReady: false };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require("./assets/images/tmdb-logo.png")]);
    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <AppContainer></AppContainer>;
  }
}
export default LoaderContainer;
// App = createAppContainer(AppDrawerNavigator);
