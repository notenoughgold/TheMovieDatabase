import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Image } from "react-native";
import Constants from "expo-constants";
import { AppLoading, SplashScreen } from "expo";
import { Asset } from "expo-asset";
import {
  NavigationContainer,
  useNavigation,
  DarkTheme,
  DefaultTheme,
  useTheme
} from "@react-navigation/native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import MovieDetailsScreen from "./screens/MovieDetailScreen";
import AllCreditsScreen from "./screens/AllCreditScreen";
import PeopleDetailsScreen from "./screens/PeopleDetailsScreen";
import BiographyScreen from "./screens/BiographyScreen";
import MoviesScreen from "./screens/MoviesScreen";
import TvShowsScreen from "./screens/TvShowsScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createStackNavigator();

function MoviesStack() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Movies">
      <Stack.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <MaterialIcons
                color={colors.text}
                size={24}
                name="menu"
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          )
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={({ route }) => ({
          title: route.params.movieTitle,
          id: route.params.movieId
        })}
      ></Stack.Screen>
      <Stack.Screen
        name="AllCredits"
        component={AllCreditsScreen}
        options={({ route }) => ({
          title: route.params.ifCast ? "Cast" : "Crew",
          credits: route.params.credits
        })}
      ></Stack.Screen>
      <Stack.Screen
        name="PeopleDetails"
        component={PeopleDetailsScreen}
        options={({ route }) => ({
          title: route.params.peopleName,
          peopleId: route.params.peopleId,
          ifCast: route.params.ifCast
        })}
      ></Stack.Screen>
      <Stack.Screen
        name="Biography"
        component={BiographyScreen}
        options={{ title: "Biography" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function TvShowsStack() {
  return (
    <Stack.Navigator initialRouteName="TvShows">
      <Stack.Screen name="TvShows" component={TvShowsScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
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
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

function NavContainer() {
  const scheme = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={scheme === "light" ? DefaultTheme : DarkTheme}
      >
        <Drawer.Navigator
          initialRouteName="Movies"
          drawerContent={props => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Movies"
            component={MoviesStack}
            options={{
              drawerLabel: "Movies",
              drawerIcon: ({ focused, color, size }) => (
                <MaterialIcons color={color} size={size} name={"movie"} />
              )
            }}
          />
          <Drawer.Screen
            name="TvShows"
            component={TvShowsStack}
            options={{
              drawerLabel: "TV Shows",
              drawerIcon: ({ focused, color, size }) => (
                <MaterialIcons color={color} size={size} name={"tv"} />
              )
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

class LoaderContainer extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false
  };
  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    if (!this.state.isAppReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require("./assets/images/tmdb-logo.png")}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }

    return <NavContainer />;
  }

  _cacheSplashResourcesAsync = async () => {
    const image = require("./assets/images/tmdb-logo.png");
    return Asset.fromModule(image).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [require("./assets/images/tmdb-logo.png")];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    this.setState({ isAppReady: true });
  };
}

export default LoaderContainer;
