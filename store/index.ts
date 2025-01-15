import type { assetType, prices, sortOptions, viewOptions, animationPlayer } from '~/data/dataTypes';
import { filterOptionsDefaultData } from '~/data/data';

interface State {
  isLoggedIn: boolean;
  isFilterPanelExpanded: boolean;
  apiResponse: any;
  apiLoading: {
    loading: boolean;
    type: assetType;
  };
  animationPlayer: animationPlayer,
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
  options: filterOptionsDefaultData,
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
    state.options = filterOptionsDefaultData
  },
  setAnimationPlayer(state: State, payload: 'lottie player' | 'dotlottie player') {
    state.animationPlayer = payload
  }
}

export const actions = {
  async getSearchResults(
    { state, commit }: { state: State, commit: any },
    payload: {
      loadMoreData: boolean,
      asset: assetType,
      query: string,
      price: prices,
      page: number,
      per_page: number,
      sort: sortOptions,
      view: viewOptions
    }): Promise<any> {
    const { loadMoreData } = payload; // loadMoreData is a boolean that determines if the user is loading more data

    const product_type = 'item'
    const { asset, query, price, page, per_page, sort, view } = payload;
    try {
      if (!loadMoreData) {
        // @ts-ignore
        const result = await this.$axios.$get(`/v3/search?query=${query}&product_type=${product_type}&asset=${asset}&price=${price}&sort=${sort}&per_page=${per_page}&page=${page}&view=${view}`)
        if (result.response.items) {
          commit('setApiResponse', result.response.items)
        }
      } else {
        const currentItems = state.apiResponse.data;

        // @ts-ignore
        const result = await this.$axios.$get(`/v3/search?query=${query}&product_type=${product_type}&asset=${asset}&price=${price}&sort=${sort}&per_page=${per_page}&page=${page}&view=${view}`)
        commit('setApiResponse', { ...result.response.items, data: [...currentItems, ...result.response.items.data] })
      }
    } catch (error) {
      console.log('an error occurs: ', error);
    }
  }
}
