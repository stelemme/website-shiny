import "./map.css";

// mui imports
import { Box, Grid } from "@mui/material";

// leaflet imports
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// Components imports
import Header from "../../components/Header";

// Hooks
import { useShiny } from "../../hooks/useData";

const createClusterCustomIcon = function (cluster) {
  const allMarkers = cluster.getAllChildMarkers();

  const altCounts = {};
  allMarkers.forEach((marker) => {
    const alt = marker.options.alt;
    altCounts[alt] = (altCounts[alt] || 0) + 1;
  });

  const totalMarkers = cluster.getChildCount();

  const trainerlist = ["joaquin", "korneel", "simon", "stef"];

  const altData = {};
  trainerlist.forEach((trainer) => {
    const count = altCounts[trainer] || 0;
    const percentage = Math.round((count / totalMarkers) * 100);
    altData[trainer] = {
      percentage: percentage,
      count: count,
    };
  });

  const joaquinPercentage = altData?.joaquin?.percentage
    ? altData?.joaquin?.percentage
    : 0;
  const korneelPercentage = altData?.korneel?.percentage
    ? joaquinPercentage + altData?.korneel?.percentage
    : joaquinPercentage;
  const simonPercentage = altData?.simon?.percentage
    ? korneelPercentage + altData?.simon?.percentage
    : korneelPercentage;
  const stefPercentage = altData?.stef?.percentage
    ? simonPercentage + altData?.stef?.percentage
    : simonPercentage;

  let iconSize;
  if (totalMarkers < 10) {
    iconSize = 30;
  } else if (totalMarkers < 100) {
    iconSize = 35;
  } else {
    iconSize = 40;
  }
  return L.divIcon({
    html: ` <div title="Joaquin: ${altData?.joaquin?.count}, Korneel: ${
      altData?.korneel?.count
    }, Simon: ${altData?.simon?.count}, Stef: ${
      altData?.stef?.count
    }" class="donut-chart-container">
              <div class="donut-chart" style="--percentage1: ${
                joaquinPercentage + "%"
              }; --percentage2: ${korneelPercentage + "%"}; --percentage3: ${
      simonPercentage + "%"
    }; --percentage4: ${stefPercentage + "%"};"></div>
              <div class="donut-chart-center"></div>
            <div class="text">${totalMarkers}</div>`,
    className: "marker_cluster_wrapper",
    iconSize: L.point(iconSize, iconSize, true),
  });
};

export default function Map() {
  const { data: joaquinLocationsData } = useShiny(
    `geoMapLocations=true&trainer=Joaquin`
  );
  const { data: korneelLocationsData } = useShiny(
    `geoMapLocations=true&trainer=Korneel`
  );
  const { data: simonLocationsData } = useShiny(
    `geoMapLocations=true&trainer=Simon`
  );
  const { data: stefLocationsData } = useShiny(
    `geoMapLocations=true&trainer=Stef`
  );

  const joaquinLocations = joaquinLocationsData?.data;
  const korneelLocations = korneelLocationsData?.data;
  const simonLocations = simonLocationsData?.data;
  const stefLocations = stefLocationsData?.data;

  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="GEO LOCATION MAP"
            subtitle="On the map you can find all the location where shinies have been caught."
          />
        </Box>

        <Grid container>
          <Grid item xs={12} height={"100%"}>
            <MapContainer
              center={[51.080158037454105, 3.7204157561604343]}
              zoom={12}
              style={{ height: "calc(100vh - 200px)", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                detectRetina={true}
              />
              <MarkerClusterGroup
                iconCreateFunction={createClusterCustomIcon}
                maxClusterRadius={30}
              >
                {joaquinLocations?.map((location) => {
                  return (
                    <Marker
                      key={location._id}
                      alt="joaquin"
                      position={location.geoLocation.position}
                      icon={L.divIcon({
                        html: ``,
                        className: "marker marker_joaquin",
                        iconSize: L.point(15, 15, true),
                      })}
                    >
                      <Popup className="popup popup_booking">
                        <div className="popup__title">
                          {location.geoLocation.name}
                        </div>
                        <div className="popup__info">{location.trainer}</div>
                      </Popup>
                    </Marker>
                  );
                })}
                {korneelLocations?.map((location) => {
                  return (
                    <Marker
                      key={location._id}
                      alt="korneel"
                      position={location.geoLocation.position}
                      icon={L.divIcon({
                        html: ``,
                        className: "marker marker_korneel",
                        iconSize: L.point(15, 15, true),
                      })}
                    >
                      <Popup className="popup popup_supplier">
                        <div className="popup__title">
                          {location.geoLocation.name}
                        </div>
                        <div className="popup__info">{location.trainer}</div>
                      </Popup>
                    </Marker>
                  );
                })}
                {simonLocations?.map((location) => {
                  return (
                    <Marker
                      key={location._id}
                      alt="simon"
                      position={location.geoLocation.position}
                      icon={L.divIcon({
                        html: ``,
                        className: "marker marker_simon",
                        iconSize: L.point(15, 15, true),
                      })}
                    >
                      <Popup className="popup popup_supplier">
                        <div className="popup__title">
                          {location.geoLocation.name}
                        </div>
                        <div className="popup__info">{location.trainer}</div>
                      </Popup>
                    </Marker>
                  );
                })}
                {stefLocations?.map((location) => {
                  return (
                    <Marker
                      key={location._id}
                      alt="stef"
                      position={location.geoLocation.position}
                      icon={L.divIcon({
                        html: ``,
                        className: "marker marker_stef",
                        iconSize: L.point(15, 15, true),
                      })}
                    >
                      <Popup className="popup popup_supplier">
                        <div className="popup__title">
                          {location.geoLocation.name}
                        </div>
                        <div className="popup__info">{location.trainer}</div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MarkerClusterGroup>
            </MapContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
