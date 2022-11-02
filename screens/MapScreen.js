import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { data } from "../constants/data";
import { COLORS } from "../constants";
import { StatusBar } from "expo-status-bar";

const MapScreen = () => {

  const initialRegion = {
    latitude: -33.496722,
    longitude: -70.653055,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const edgePaddidngValue = 10;
  const edgePadding = {
    top: edgePaddidngValue,
    right: edgePaddidngValue,
    bottom: edgePaddidngValue,
    left: edgePaddidngValue,
  };
  const mapView = React.useRef();


  return (
    <View style={styles.container}>
      <StatusBar/>
      <MapView
        ref={mapView}
        style={styles.map}
        initialRegion={initialRegion}
        mapPadding={edgePadding}
        loadingEnabled={true}
        loadingIndicatorColor={COLORS.primary}
        
      >
        <Marker coordinate={initialRegion}/>

        {data.map((val) =>{
          return(
            <Marker key={val.id} coordinate={val.coords} title={val.description} pinColor={COLORS.primary}/>
          )
        })}

      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1
  },
});
