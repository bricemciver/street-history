import React, { useMemo } from "react"
import {
  Card,
  CardContent,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core"

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 600,
      width: 300,
      overflowX: "hidden",
      overflowY: "auto",
      borderBottom: "1px solid black",
    },
    home: {
      backgroundColor: theme.palette.background.paper,
    },
    card: {
      width: 300,
    },
    cardButton: {
      whiteSpace: "nowrap",
    },
  })
)

export interface StreetListProps {
  position?: keyof typeof POSITION_CLASSES
  features: any[]
  id: string
  navigate: Function
}

const StreetList = ({ position, features, id, navigate }: StreetListProps) => {
  const classes = useStyles()

  const streetList = useMemo(
    () => (
      <>
        <List className={classes.home}>
          <ListItem
            button
            selected={!id}
            key="home"
            onClick={() => navigate("")}
          >
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.root} component="nav">
          {features
            ? features.map(item => (
                <ListItem
                  button
                  selected={item.id === id}
                  key={item.id}
                  onClick={() => navigate(`?street=${item.id}`)}
                >
                  <ListItemText primary={item.properties.title} />
                </ListItem>
              ))
            : null}
        </List>
        {features
          ? features
              .filter(item => item.id === id)
              .map(item => (
                <Card key={item.id} className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {item.properties.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {item.properties.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
          : null}
      </>
    ),
    [id]
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topleft

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{streetList}</div>
    </div>
  )
}

export default StreetList
