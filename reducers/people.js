export default function (people = "", action) {
  switch (action.type) {
    case "seeProfile":
      return action.id;
    default:
      return people;
  }
}
