export default function (poi = [], action) {
  console.log("#2poi", poi);
  console.log("#2action", action);

  if (action.type == "addInfo") {
    return [...poi, action.desc, action.title];
  } 
  if (action.type == "add.photo") {
      return ([...poi.action.desc,action.title, action.photo])
  }else {
    return poi;
  }
}
