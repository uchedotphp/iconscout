import type { shorthandAssetType, prices, sortOptions, viewOptions } from '~/data/dataTypes';

interface State {
  isLoggedIn: boolean;
  isFilterPanelExpanded: boolean;
  apiResponse: any;
  apiLoading: boolean;
  options: {
    per_page: number;
    page: number;
    sort: sortOptions;
    asset: shorthandAssetType;
    query: string;
    view: viewOptions
    price: prices;
    [key: string]: string | number | any;
  };
}

export const state = () => ({
  isLoggedIn: false,
  isFilterPanelExpanded: true,
  options: {
    asset: 'all',
    price: 'premium',
    view: 'pack',
    sort: 'popular',
    query: '',
    per_page: 20,
    page: 1,
  },
  apiLoading: false,
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
  pagesRemaing(state: { apiResponse: any }) {
    return state.apiResponse.last_page - state.apiResponse.current_page
  }
}

export const mutations = {
  toggleFilterPanel(state: State) {
    state.isFilterPanelExpanded = !state.isFilterPanelExpanded
  },

  setAssetType(state: State, payload: string) {
    console.log('payload', payload);

    const categoryMap: { [key: string]: string } = {
      'all-assets': "all",
      "3d-illustrations": "3d",
      'lottie-animations': "lottie",
      illustrations: "illustration",
      icons: "icon",
    };
    const asset = categoryMap[payload];
    state.options.asset = asset as shorthandAssetType
  },

  setSearchQuery(state: State, payload: string) {
    console.log('setting query: ', payload);

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

  setApiLoading(state: State, payload: boolean) {
    state.apiLoading = payload
  },

  setPerPageOption(state: State, payload: number) {
    state.options.per_page = payload
  },

  setPageOption(state: State, payload: number) {
    console.log('setting page: ', payload);
    state.options.page + payload
  },

  updateAnOptionProperty(state: State, payload: { key: string, value: string | number }) {
    state.options[payload.key] = payload.value
  }
}

export const actions = {
  async getSearchResults({ state, commit }: { state: State, commit: any }, payload = { loadMoreData: false }): Promise<any> {
    const { loadMoreData } = payload; // loadMoreData is a boolean that determines if the user is loading more data
    const product_type = 'item'
    console.log('loadMoreData: ', loadMoreData);

    try {
      // let result;
      // if (!loadMoreData) {
      //   const { asset, query, price, page, per_page, sort } = state.options;
      //   const formatAsset = asset === 'all' ? '3d' : asset;
      //   // @ts-ignore
      //   result = await this.$axios.$get(`search?query=${query}&product_type=${product_type}&asset=${formatAsset}&price=${price}&sort=${sort}&per_page=${per_page}&page=${page}`)
      //   if (result.response.items) {
      //     commit('setApiResponse', result.response.items)
      //   }
      // } else {
      //   commit('updateAnOptionProperty', { key: 'page', value: state.apiResponse.current_page + 1 })
      //   const currentItems = state.apiResponse.data;
      //   const { asset, query, price, page, per_page, sort } = state.options;
      //   const formatAsset = asset === 'all' ? '3d' : asset;
      //   // @ts-ignore
      //   result = await this.$axios.$get(`search?query=${query}&product_type=${product_type}&asset=${formatAsset}&price=${price}&sort=${sort}&per_page=${per_page}&page=${page}`)
      //   commit('setApiResponse', { ...state.apiResponse, data: [...currentItems, ...result.response.items.data] })
      // }
      // return response.items
    } catch (error) {
      console.log('an error occurs: ', error);
    }
  },

  async loadMoreResults({ state, commit, dispatch }: { state: any, commit: any, dispatch: any }): Promise<any> {
    try {
      commit('setPageOption', state.options.page + 1)
      const asset = state.options.asset
      const query = state.options.query
      const price = state.options.price
      const sort = state.options.sort
      const product_type = 'item'
      const per_page = state.options.per_page
      const page = state.options.page
      const formatAsset = asset === 'all' ? '3d' : asset;
      // @ts-ignore
      const { response }: any = await this.$axios.$get(`search?query=${query}&product_type=${product_type}&asset=${formatAsset}&price=${price}&sort=${sort}&per_page=${per_page}&page=${page}`)
      commit('setApiResponse', { ...response.items, data: [...state.apiResponse.data, ...response.items.data] })
    } catch (error) {
      console.log('an error occurs: ', error);
    }
  }
}
