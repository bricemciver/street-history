import React from "react"
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet"
import { graphql } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { makeStyles } from "@material-ui/core/styles"
import StreetList from "../components/StreetList"

import "leaflet/dist/leaflet.css"
import StreetFeature from "../components/StreetFeature"

export const query = graphql`
  {
    allGeojsonJson(sort: { fields: id }) {
      edges {
        node {
          type
          id
          properties {
            title
            description
            link
          }
          geometry {
            type
            geometries {
              type
              coordinates
            }
          }
        }
      }
    }
  }
`
const useStyles = makeStyles({
  root: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  list: {
    width: "100%",
    maxWidth: 300,
  },
})

const IndexPage = ({ data, location, navigate }) => {
  const { mapboxApiKey } = useSiteMetadata()

  const features = data.allGeojsonJson.edges.map(item => item.node)
  const params = new URLSearchParams(location.search)

  const classes = useStyles()
  return typeof window !== "undefined" ? (
    <MapContainer
      className={classes.root}
      zoomControl={false}
      scrollWheelZoom={false}
      center={[38.972572, -94.715879]}
      zoom={13}
      zoomSnap={0}
      zoomDelta={0.25}
      boundsOptions={{padding: [16, 16]}}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxApiKey}`}
        attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        tileSize={512}
        zoomOffset={-1}
      />
      <ZoomControl position="bottomright" />
      {features
        ? features
            .filter(item =>
              params.has("street") ? item.id === params.get("street") : false
            )
            .map(item => <StreetFeature key={item.id} item={item} />)
        : null}
      <StreetList
        features={features}
        id={params.get("street") || ''}
        navigate={navigate}
      />
    </MapContainer>
  ) : null
}

export default IndexPage
