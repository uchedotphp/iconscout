export default function ({ store, route }) {
  const routeSection = route.path.split("/")[1];
  if (routeSection === route.matched[0]?.path?.split("/")[1]) {
    return;
  }
  store.commit("setApiLoading", { loading: true, type: routeSection });
}
