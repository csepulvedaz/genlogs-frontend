import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

type CustomMapProps = {
  directions: google.maps.DirectionsResult | null;
};

const routeColors = ["#FF0000", "#00FF00", "#0000FF"]; // Red, Green, Blue

const renderRoutesDescription = (routes: google.maps.DirectionsRoute[]) => (
  <ul className="absolute bottom-2 left-2 bg-white p-2 space-y-2">
    {routes.map((direction, index) => (
      <li key={index} className="flex items-center text-xs">
        <span
          className="w-4 h-4 mr-2 inline-block rounded-full"
          style={{ backgroundColor: routeColors[index] }}
        ></span>
        <b>Route {index + 1}</b>: {direction.summary}
      </li>
    ))}
  </ul>
);

const renderRoutes = (
  routes: google.maps.DirectionsRoute[],
  request: google.maps.DirectionsRequest
) =>
  routes.map((route, index) => (
    <DirectionsRenderer
      key={index}
      directions={{
        routes: [route],
        request,
      }}
      options={{
        polylineOptions: {
          strokeColor: routeColors[index],
          strokeWeight: 4,
        },
        suppressMarkers: index !== 0,
      }}
    />
  ));

export default function CustomMap({ directions }: CustomMapProps) {
  const routes = directions?.routes || [];
  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "450px" }}
        zoom={4}
        center={{ lat: 39.8283, lng: -98.5795 }}
      >
        {directions && renderRoutes(routes, directions.request)}
      </GoogleMap>
      {directions && renderRoutesDescription(routes)}
    </div>
  );
}
