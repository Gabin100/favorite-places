import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map() {
  const region = {
    latitude: -1.9295976,
    longitude: 30.0572044,
    latitudeDelta: 0.922,
    longitudeDelta: 0.0421,
  };

  return <MapView initialRegion={region}></MapView>;
}

export default Map;

const styles = StyleSheet.create({});
