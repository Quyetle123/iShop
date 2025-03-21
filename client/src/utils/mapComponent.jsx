import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationStoreStart } from "../redux/slices/locationStoreSlice";

const containerStyle = {
  width: "100%",
  height: "250px",
  borderRadius: "10px",
  marginTop: "20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
};

const center = { lat: 16.0544, lng: 108.2022 };

// const storeLocations = [
//   {
//     id: 1,
//     name: "Cửa hàng 1 - Hải Châu",
//     lat: 16.047079,
//     lng: 108.20623,
//     address: "123 Đường ABC, Hải Châu, Đà Nẵng",
//   },
//   {
//     id: 2,
//     name: "Cửa hàng 2 - Sơn Trà",
//     lat: 16.0728,
//     lng: 108.237061,
//     address: "456 Đường XYZ, Sơn Trà, Đà Nẵng",
//   },
//   {
//     id: 3,
//     name: "Cửa hàng 3 - Ngũ Hành Sơn",
//     lat: 16.0306,
//     lng: 108.2494,
//     address: "789 Đường LMN, Ngũ Hành Sơn, Đà Nẵng",
//   },
// ];

const MapComponent = () => {
  const dispatch = useDispatch();
  const { locationStores } = useSelector((state) => state.locationStores);
  const locationStoreList = Array.isArray(locationStores.locationStores)
    ? locationStores.locationStores
    : [];
  console.log(locationStoreList);
  useEffect(() => {
    dispatch(fetchLocationStoreStart());
  }, [dispatch]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí: ", error);
        }
      );
    }
  }, []);

  const onLoadMap = useCallback((map) => {
    console.log("Bản đồ đã load", map);
  }, []);

  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyB8DSWBaKWTypyK_ZFMdxlV0qEk8tU5lgU">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || center}
        zoom={12}
        onLoad={onLoadMap}
      >
        {/* Hiển thị các cửa hàng */}
        {locationStoreList.length > 0 &&
          locationStoreList?.map((store) => (
            <Marker
              key={store.id}
              position={{ lat: Number(store.lat), lng: Number(store.lng) }}
              onClick={() => setSelectedStore(store)}
            />
          ))}

        {/* Hiển thị vị trí của người dùng */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}

        {/* Hiển thị thông tin cửa hàng */}
        {selectedStore && (
          <InfoWindow
            position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
            onCloseClick={() => setSelectedStore(null)}
          >
            <div>
              <h4>{selectedStore.name}</h4>
              <p>{selectedStore.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapComponent;
