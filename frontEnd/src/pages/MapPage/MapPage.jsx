import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './MapPage.css';

function MapPage() {

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "YOUR KEY"
    });

    const position ={
      lat: -8.850307,
      lng: 13.296350
    }
  return (
    <div className='map'>
      <h1>Rastreia todos os veiculos aqui!</h1>
      { isLoaded ? (
          <GoogleMap
            mapContainerStyle={{width:'100%', height:'100%'}}
            center={position}
            zoom={15}
          >
            <Marker position={position} options={{
              label:{
                text:" Posição atual",
                className: "map-marker"
              }
              }}/>
          </GoogleMap>
      ) : (
      <></>
      )}
    </div>
  )
}

export default MapPage
