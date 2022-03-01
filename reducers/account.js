export default function (account = {}, action) {
  switch (action.type) {
    case "personnalInfo":
      return { ...account, ...action.personnalInfo };
    default:
      return account;
  }
}
