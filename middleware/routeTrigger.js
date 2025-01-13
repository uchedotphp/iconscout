export default function ({ store, route }) {
  const routeSection = route.path.split("/")[1];
  store.commit("setApiLoading", { loading: true, type: routeSection });
}
