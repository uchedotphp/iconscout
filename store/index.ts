import type { assetType, prices, sortOptions, viewOptions } from '~/data/dataTypes';

interface State {
  isLoggedIn: boolean;
  isFilterPanelExpanded: boolean;
  apiResponse: any;
  apiLoading: {
    loading: boolean;
    type: assetType;
  };
  animationPlayer: 'lottie player' | 'dotlottie player',
  options: {
    per_page: number;
    page: number;
    sort: sortOptions;
    asset: assetType;
    query: string;
    view: viewOptions
    price: prices;
    [key: string]: string | number | any;
  };
}

export const state = () => ({
  isLoggedIn: false,
  isFilterPanelExpanded: true,
  animationPlayer: 'lottie player',
  options: {
    asset: 'all-assets',
    price: 'premium',
    view: 'pack',
    sort: 'popular',
    query: '',
    per_page: 20,
    page: 1,
  },
  apiLoading: {
    loading: false,
    type: 'all-assets',
  },
  apiResponse: {
    data: [],
    current_page: 0,
    per_page: 0,
    last_page: 0,
    from: 0,
    to: 0,
    total: 0,
    first_page_url: '',
    last_page_url: '',
    next_page_url: '',
    prev_page_url: '',
  } as any
})

export const getters = {
  apiData: (state: { apiResponse: any }) => state.apiResponse.data,
  totalAssetCount: (state: { apiResponse: any }) => state.apiResponse.total.toLocaleString(),
  isLastPage(state: { apiResponse: any }) {
    return state.apiResponse.current_page === state.apiResponse.last_page
  },
  twoFoldHeight: (state: { apiResponse: any }) => {
    return state.apiResponse.current_page > 2
  },
  restrictGuestUser(state: { isLoggedIn: boolean }, getters: { twoFoldHeight: boolean }) {
    return !state.isLoggedIn && getters.twoFoldHeight
  }
}

export const mutations = {
  toggleFilterPanel(state: State) {
    state.isFilterPanelExpanded = !state.isFilterPanelExpanded
  },

  setAssetType(state: State, payload: string) {
    const categoryMap: { [key: string]: string } = {
      'all-assets': "all",
      "3d-illustrations": "3d",
      'lottie-animations': "lottie",
      illustrations: "illustration",
      icons: "icon",
    };
    const asset = categoryMap[payload];
    state.options.asset = asset as assetType
  },

  setSearchQuery(state: State, payload: string) {
    state.options.query = payload;
  },

  setSort(state: State, payload: sortOptions) {
    state.options.sort = payload;
  },

  toggleLogin(state: State, payload: 'login' | 'logout' | 'signup') {
    state.isLoggedIn = payload === 'login' || payload === 'signup' ? true : false;
  },

  setApiResponse(state: State, payload: any) {
    state.apiResponse = payload
  },

  setApiLoading(state: State, payload: { loading: boolean, type: assetType } = { loading: false, type: 'all-assets' }) {
    state.apiLoading.loading = payload.loading;
    state.apiLoading.type = payload.type;
  },

  setPerPageOption(state: State, payload: number) {
    state.options.per_page = payload
  },

  setPageOption(state: State, payload: number) {
    state.options.page + payload
  },

  updateAnOptionProperty(state: State, payload: { key: string, value: string | number }) {
    state.options[payload.key] = payload.value
  },
  resetOptions(state: State) {
    state.options = {
      asset: 'all-assets',
      price: 'premium',
      view: 'pack',
      sort: 'popular',
      query: '',
      per_page: 20,
      page: 1,
    }
  },
  setAnimationPlayer(state: State, payload: 'lottie player' | 'dotlottie player') {
    state.animationPlayer = payload
  }
}

export const actions = {
  async getSearchResults({ state, commit }: { state: State, commit: any }, payload: { loadMoreData: boolean, asset: assetType } = { loadMoreData: false, asset: 'all-assets' }): Promise<any> {
    const { loadMoreData } = payload; // loadMoreData is a boolean that determines if the user is loading more data
    const { asset } = payload;
    const product_type = 'item'

    try {
      let result;
      if (!loadMoreData) {
        let { query, price, page, per_page, sort, view } = state.options;
        if (asset === 'icons') {
          per_page = 200
        }
        let formatAsset = '3d';
        switch (asset) {
          case 'all-assets':
            formatAsset = '3d';
            break;
          case '3d-illustrations':
            formatAsset = '3d';
            break;
          case 'lottie-animations':
            formatAsset = 'lottie';
            break;
          case 'illustrations':
            formatAsset = 'illustration';
            break;
          case 'icons':
            formatAsset = 'icon';
            break;

          default: formatAsset = '3d';
            break;
        }
        // @ts-ignore
        result = await this.$axios.$get(`/v3/search?query=${query}&product_type=${product_type}&asset=${formatAsset}&price=${price}&sort=${sort}&per_page=${per_page}&page=${page}&view=${view}`)
        if (result.response.items) {
          commit('setApiResponse', result.response.items)
        }
      } else {
        commit('updateAnOptionProperty', { key: 'page', value: state.apiResponse.current_page + 1 })

        const currentItems = state.apiResponse.data;
        let { query, price, page, per_page, sort, view } = state.options;

        if (asset === 'icons') {
          per_page = 200
        }

        let formatAsset = '3d';
        switch (asset) {
          case 'all-assets':
            formatAsset = '3d';
            break;
          case '3d-illustrations':
            formatAsset = '3d';
            break;
          case 'lottie-animations':
            formatAsset = 'lottie';
            break;
          case 'illustrations':
            formatAsset = 'illustration';
            break;
          case 'icons':
            formatAsset = 'icon';
            break;

          default: formatAsset = '3d';
            break;
        }
        // @ts-ignore
        result = await this.$axios.$get(`/v3/search?query=${query}&product_type=${product_type}&asset=${formatAsset}&price=${price}&sort=${sort}&per_page=${per_page}&page=${page}&view=${view}`)
        commit('setApiResponse', { ...result.response.items, data: [...currentItems, ...result.response.items.data] })
      }
      return result.items
    } catch (error) {
      console.log('an error occurs: ', error);
    }
  }
}
