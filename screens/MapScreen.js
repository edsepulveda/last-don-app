import * as React from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../enviorment";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function App() {
  const [origin, setOrigin] = React.useState({
    latitude: -33.496701,
    longitude: -70.653057,
  });
  const [destination, setDestination] = React.useState();
  const mapRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: INITIAL_POSITION.latitudeDelta,
          longitudeDelta: INITIAL_POSITION.longitudeDelta
        }}
        ref={mapRef}
      >
        <Marker coordinate={origin} draggable/>
      </MapView>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          minLength={2}
          placeholder="Origen..."
          fetchDetails={true}
          onPress={(details) => {
            onPlaceSelected(details, "origin");
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "es",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    borderRadius: 10,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: "#888",
    borderWidth: 3,
    marginTop: 10,
  },
});
