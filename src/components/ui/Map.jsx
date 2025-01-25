import {
  MapContainer,
  GeoJSON,
  TileLayer,
  Marker,
  Tooltip,
} from "react-leaflet";

import PropTypes from "prop-types";

const Map = ({ center, label, zoom, polygon, data }) => {
  return (
    <MapContainer
      style={{ width: "100%", minHeight: "100%" }}
      center={center ?? [-8.43333, 115.06667]}
      zoom={zoom ?? 10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <Marker position={center ?? [-8.23566, 115.12239]}>
          <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
            {label}
          </Tooltip>
        </Marker>
      )}
      {polygon && <GeoJSON data={polygon} />}
      {data &&
        data.map((item, id) => {
          return (
            <GeoJSON
              key={id}
              data={item.polygon}
              style={() => ({
                color: "#333",
                weight: 2,
                opacity: 1,
                fillColor: item.color,
                fillOpacity: 0.5,
              })}
            >
              <Tooltip
                direction="bottom"
                offset={[0, 20]}
                opacity={1}
                permanent
              >
                {item.polygon.features[0].properties.name}
              </Tooltip>
            </GeoJSON>
          );
        })}
    </MapContainer>
  );
};

Map.propTypes = {
  center: PropTypes.array,
  label: PropTypes.string,
  zoom: PropTypes.number,
  polygon: PropTypes.object,
  data: PropTypes.array,
};

export default Map;
