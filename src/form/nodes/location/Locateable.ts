import NodeLocation from "./NodeLocation";

interface Locateable {
  setLocation(location: NodeLocation): void;
  getLocation(): NodeLocation;
}

export default Locateable;