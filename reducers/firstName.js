export default function (firstName = "", action) {
  // console.log("#2 Ca passe dedans action", action);
  if (action.type === "savefirstName") {
    return action.firstName;
  } else {
    return firstName;
  }
}
