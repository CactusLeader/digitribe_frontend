export default function (account = {}, action) {
  switch (action.type) {
    case "addPersonnalInfo":
      // console.log("action.personnalInfo", action.personnalInfo);
      return { ...account, ...action.personnalInfo };
    case "addInterests":
      // console.log("interestsids", action.selectedInterests);
      return { ...account, interestIds: action.selectedInterests };
    default:
      return account;
  }
}
