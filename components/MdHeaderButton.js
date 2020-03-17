import { MaterialIcons } from "@expo/vector-icons";
import { HeaderButtons, HeaderButton } from "react-navigation-header-buttons";
import React from "react";

const MaterialHeaderButton = props => (
  <HeaderButton
    {...props}
    IconComponent={MaterialIcons}
    iconSize={24}
    color="black"
  />
);

export const MaterialHeaderButtons = props => {
  return (
    <HeaderButtons
      HeaderButtonComponent={MaterialHeaderButton}
      OverflowIcon={<MaterialIcons name="more-vert" size={24} color="black" />}
      {...props}
    />
  );
};
export { Item } from "react-navigation-header-buttons";
