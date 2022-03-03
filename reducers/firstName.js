export default function (firstname = "", action) {
  // console.log("#2 Ca passe dedans action", action);
  if (action.type === "saveFirstname") {
    return action.firstname;
  } else {
    return firstname;
  }
}
