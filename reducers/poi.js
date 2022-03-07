export default function (poi = [], action) {
  console.log("#2poi", poi);
  console.log("#2action", action);
  switch (action.type) {
    case "addInfo":
      return [...poi, { desc: action.desc, title: action.title }];
    case "addPhoto":
      let poiCopy = [...poi];
      poiCopy[poiCopy.length - 1].photo = action.photo;
      return poiCopy;
    case "addCoord":
      let poiCopyCoord = [...poi];
      poiCopyCoord[poiCopyCoord.length - 1].lat = action.lat;
      poiCopyCoord[poiCopyCoord.length - 1].lon = action.lon;
      return poiCopyCoord;
    default:
      return poi;
  }
}
