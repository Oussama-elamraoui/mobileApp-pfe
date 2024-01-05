import { StatusBar } from 'expo-status-bar';
import { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Alert} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../components/Button';
import { MaterialIcons } from '@expo/vector-icons';

// npx expo install react-native-maps
// npx expo install expo-sharing
// npx expo install expo-file-system

let locationsOfInterest = [
  {
    title: 'First',
    location: {
      latitude: -27.2,
      longitude: 145,
    },
    description: 'My First Marker',
  },
  {
    title: 'Second',
    location: {
      latitude: -30.2,
      longitude: 150,
    },
    description: 'My Second Marker',
  },
];

const mapJson = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#ffeb3b',
      },
      {
        weight: 3,
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#1f0038',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];
export default function App() {
  const [count, setCount] = useState(0);
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: -0.1263283565640449,
    latitude: 51.493133584533,
  });
  const mapRef = useRef();
  const onRegionChange = (region) => {
    // console.log(region);
  };

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };

  const Newevent = () => {
    let date = new Date().getDate();
    let hours = new Date().getHours(); //Current Hours
    let body = { draggableMarkerCoord, date, hours };
    console.log(body);
    Alert.alert('Added Successfully')
    return fetch(`http://127.0.0.1:8000/Admin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json({}));
  };
  const TwoOptionsAlertFunction = () => {
    //function to make two option alert
    Alert.alert(
       //This is title
      'Hello',
        //This is body text
      'Do you want want to add this accident in the database? ',
      [
        {text: 'Yes', onPress: Newevent},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    );
  }
  const takeSnapshotAndShare = async () => {
    const snapshot = await mapRef.current.takeSnapshot({
      width: 300,
      height: 300,
      result: 'base64',
    });
    const uri = FileSystem.documentDirectory + 'snapshot.png';
    await FileSystem.writeAsStringAsync(uri, snapshot, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await shareAsync(uri);
  };

  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={TwoOptionsAlertFunction}>
        New
        <MaterialIcons name="add-location" size={24} color="grey" /> Accident
      </Button>

      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 51.49313358453546,
          latitudeDelta: 0.23082475388118695,
          longitude: -0.13374416157603264,
          longitudeDelta: 0.19920330494642255,
        }}
        >
  
        <Marker
          draggable
          pinColor="#0000ff"
          coordinate={draggableMarkerCoord}
          onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}>
          <Callout>
            <Text >
              Longitude: {draggableMarkerCoord.longitude}, latitude:{' '}
              {draggableMarkerCoord.latitude}
            </Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 5,
    padding: 16,
    left: '25%',
    width: '50%',
    textAlign: 'center',
  },
});
