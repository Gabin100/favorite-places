import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map() {
  const region = {
    latitude: -1.9730291,
    longitude: 30.091322,
    latitudeDelta: 0.222,
    longitudeDelta: 0.0421,
  };

  return <MapView style={styles.map} initialRegion={region}></MapView>;
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
