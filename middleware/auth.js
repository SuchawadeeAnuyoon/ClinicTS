export default function (context) {
  let token = context.store.getters["me/getToken"];
  if (!token) {
    context.redirect("/login");
  }
}
