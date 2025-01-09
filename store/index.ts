import type { prices, sortOptions, viewOptions } from '~/data/dataTypes';

export const state = () => ({
  isLoggedIn: false as boolean,
  isFilterPanelExpanded: true as boolean,
  options: {
    asset: 'all' as 'all' | '3d' | 'illustration' | 'lottie' | 'icon',
    price: 'premium' as prices,
    // view: 'pack' as viewOptions,
    sort: 'popular' as sortOptions,
    query: '' as string,
    per_page: 20 as number,
    page: 1 as number,
  },
  apiLoading: false as boolean,
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
}

export const mutations = {
  toggleFilterPanel(state: { isFilterPanelExpanded: boolean }) {
    state.isFilterPanelExpanded = !state.isFilterPanelExpanded
  },

  setAssetType(state: { options: { asset: string } }, payload: string) {
    console.log('payload', payload);

    const categoryMap: { [key: string]: string } = {
      'all-assets': "all",
      "3d-illustrations": "3d",
      'lottie-animations': "lottie",
      illustrations: "illustration",
      icons: "icon",
    };
    const asset = categoryMap[payload];
    state.options.asset = asset
  },

  setSearchQuery(state: { options: { query: string } }, payload: string) {
    console.log('setting query: ', payload);

    state.options.query = payload;
  },

  setSort(state: { options: { sort: string } }, payload: sortOptions) {
    state.options.sort = payload;
  },

  logInUser(state: { isLoggedIn: boolean }) {
    state.isLoggedIn = true;
  },

  setApiResponse(state: { apiResponse: any }, payload: any) {
    state.apiResponse = payload
  },

  setApiLoading(state: { apiLoading: boolean }, payload: boolean) {
    state.apiLoading = payload
  },

  setPerPageOption(state: {  options: { per_page: number } }, payload: number) {
    state.options.per_page = payload
  },

  setPageOption(state: {  options: { current_page: number } }, payload: number) {
    state.options.current_page = payload
  }
}

export const actions = {
  async getSearchResults({ state, commit }: { state: any, commit: any }, payload: { per_page: number, page: number }) {
    try {
      const asset = state.options.asset
      const query = state.options.query
      const price = state.options.price
      const sort = state.options.sort
      const product_type = 'item'
      const per_page = state.options.per_page
      const page = state.options.page
      const formatAsset = asset === 'all' ? '3d' : asset;
      console.log('per page: ', per_page);

      const { response }: any = await this.$axios.$get(`search?query=${query}&product_type=${product_type}&asset=${formatAsset}&price=${price}&sort=${sort}&per_page=${per_page}&page=${page}`)
      console.log('after api call: ', response);
      if (response.items) {
        commit('setApiResponse', response.items)
      }
      return response.items

    } catch (error) {
      console.log('an error occurs: ', error);
    }
  },
}
