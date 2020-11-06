import React, { useMemo } from "react"
import { GeoJSON, useMap } from "react-leaflet"
import { Feature } from "geojson"
import { LeafletEvent } from "leaflet"

export interface StreetFeatureProps {
  item: Feature
}

const StreetFeature = ({ item }) => {
  const leafletMap = useMap()
  const eventHandlers = useMemo(() => ({
    add: (event: LeafletEvent) => {
      leafletMap.flyToBounds(event.target.getBounds())
    }
  }), [leafletMap])

  return <GeoJSON eventHandlers={eventHandlers} key={item.id} data={item} />
}

export default StreetFeature
