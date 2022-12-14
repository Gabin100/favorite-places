import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

import OutlinedButton from "../Ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getAddress, getMapPreview } from "../../util/location";

function LocationPicker({ onPickLocation }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      setPickedLocation({
        lat: route.params.latitude,
        lng: route.params.longitude,
      });
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({ ...pickedLocation, address: address });
      }
    }
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Allow", onPress: async () => await requestPermission() },
        ]
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const userLocation = await getCurrentPositionAsync();
    setPickedLocation({
      lat: userLocation.coords.latitude,
      lng: userLocation.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picker yet.</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
