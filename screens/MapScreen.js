import * as React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from "react-native";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../enviorment";
import utils from "../utlis/Utils";
import { COLORS, SIZES } from '../constants/index'
import { Ionicons } from '@expo/vector-icons'

const MapScreen = () => {
  const fromLocs = [
    {
      latitude: -33.496722,
      longitude: -70.653055,
    },
  ];

  const mapView = React.useRef();
  const [region, setRegion] = React.useState(null);
  const [toLoc, setToLoc] = React.useState(null);
  const [fromLoc, setFromLoc] = React.useState(null);
  const [angle, setAngle] = React.useState(0);

  const [isReady, setisReady] = React.useState(false)
  const [duration, setDuration] = React.useState('') 

  React.useEffect(() => {
    let initialRegion = {
      latitude: -33.496722,
      longitude: -70.653055,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }

    let destination = {
      latitude: -33.563752,
      longitude: -70.666893
    }
    setRegion(initialRegion)
    setToLoc(destination)
    setFromLoc(fromLocs[0])
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
      >
        {fromLoc && toLoc && (
          <MapViewDirections
            origin={fromLoc}
            destination={toLoc}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            optimizeWaypoints={true}
            
            strokeColor={COLORS.primary}
            onReady={result => {
              setDuration(Math.ceil(result.duration))

              if(!isReady){
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding:{
                    right: SIZES.width * 0.1,
                    bottom: 400,
                    left: SIZES.width * 0.1,
                    top: SIZES.height * 0.1
                  }
                })
                if(result.coordinates.length >= 2){
                  let angle = utils.calculateAngle(result.coordinates)
                  setAngle(angle)
                }
                setisReady(true)
              }
            }}
          />
        )}
        {fromLoc && (
          <Marker
            key={"fromLoc"}
            coordinate={fromLoc}
            tracksViewChanges={false}
            rotation={angle}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        )}
        {toLoc && (
          <Marker
            key={"toLoc"}
            coordinate={toLoc}
            tracksViewChanges={false}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        )}
      </MapView>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons name="hourglass-outline" color={COLORS.primary} size={30} style={{paddingTop: 15, paddingBottom: 15, paddingLeft: 20}}/>
        <View style={{marginLeft: SIZES.padding}}>
          <Text style={{color: COLORS.darkGray, fontSize: 15, fontWeight: "700"}}>Tiempo Esperado de llegada: {duration} Minutos</Text>
        </View>
      </View>

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
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 200,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: "#e9c46a",
    borderWidth: 3,
    borderRadius: 200,
  },
});
