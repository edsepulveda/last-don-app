import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../enviorment";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { COLORS, SIZES } from "../constants";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";
import { Ionicons } from '@expo/vector-icons'


//MAPVIEW
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapScreenV2() {
  //Estados y Referencias
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const mapRef = useRef();

  //Variables
  const edgePaddidngValue = 90
  const edgePadding = {
    top: edgePaddidngValue,
    right: edgePaddidngValue,
    bottom: edgePaddidngValue,
    left: edgePaddidngValue,

  }


  //Funciones
  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };


  const traceRoute = () =>{
    if(origin && destination){
      setShowDirections(true)
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding})
    }
  }


  const onTraceRoute = (args) =>{
    if(args){
      setDistance(args.distance)
      setDuration(args.duration)
    }
    
  }


  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -33.4727092,
            longitude: -70.7699164,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {origin && <Marker coordinate={origin}/>}
          {destination && <Marker coordinate={destination} />}
          {showDirections && origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_API_KEY}
              strokeWidth={5}
              strokeColor={COLORS.primary}
              onReady={onTraceRoute}

            />
          )}
        </MapView>
      </View>
      <View style={styles.searchContainer}>
        <Text>Origen</Text>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          fetchDetails={true}
          onPress={(data, details) => {
            const position = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setOrigin(position);
            moveTo(position);
            console.log(origin);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "es",
          }}
        />
        <Text>Destino</Text>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            const position = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setDestination(position);
            moveTo(position);
            console.log(destination);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "es",
          }}
        />
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Marcar Ruta</Text>
        </TouchableOpacity>
      </View>
      
      {duration && distance ? <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white}}>
        <Ionicons name="stopwatch-outline" color={COLORS.primary} size={30} style={{paddingTop: 15, paddingBottom: 15, paddingLeft: 20}}/>
        <View style={{marginLeft: SIZES.padding}}>
          <Text style={{color: COLORS.darkGray, fontSize: 15, fontWeight: "700"}}>Distancia: {distance.toFixed(2)} Kilometros</Text>
          <Text style={{color: COLORS.darkGray, fontSize: 15, fontWeight: "700"}}>Tiempo Esperado de llegada: {Math.ceil(duration)} Minutos</Text>
        </View>
      </View>: null}

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c4c4c4",
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
    shadowOffset: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    right: 20,
    borderRadius: 20,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginTop: 16,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "700",
    color: COLORS.white,
  },
});
