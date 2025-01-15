import { assetType } from "~/data/dataTypes";

export default (context: any, inject: any) => {
  function gotoRoute({ asset, query, queryParams = {} }: { asset: assetType; query: string; queryParams?: any }) {
    console.log('these: ', asset, query, queryParams);
    console.log('context: ', context);

    if (!asset || !query) {
      context.error({ statusCode: 400, message: 'Asset or query is missing' });
      return;
    }

    let path = `/${asset}/${context.$formatText.addHypen(query)}`;
    if (asset === 'lottie-animations') {
      const currentSetPlayer = context.store.state.animationPlayer;
      if (!currentSetPlayer) {
        context.error({ statusCode: 400, message: 'Current set player is missing' });
        return;
      }
      path += `/${context.$formatText.addHypen(currentSetPlayer)}`;
    }

    // Merge queryParams with context.route.query
    const mergedQueryParams = { ...context.route.query, ...queryParams };

    // Remove 'page' query parameter if the asset is different or if other query parameters change
    const previousAsset = context?.from?.path.split("/")[1];
    const currentQueryParams = context.route.query;

    const queryParamsChanged = Object.keys(queryParams).some(key => key !== 'page' && currentQueryParams[key] !== queryParams[key]);

    if (currentQueryParams.page && (asset !== previousAsset || queryParamsChanged)) {
      delete mergedQueryParams.page;
    }

    context.app.router.push({ path, query: mergedQueryParams });
  }

  inject("helpers", { gotoRoute });
};
