import { Context } from '@nuxt/types';

export default function (context: Context, inject: any) {
  const secretKey = "OeKo1DtE6LI302PDqeZgi71NlFKHw0Jt";
  const clientId = "79889677993861";

  async function searchApi({ asset, query, price, sort, per_page = 10, page = 1 }: { asset: string, query: string, price: string, sort: string, per_page: number, page: number }) {
    const settings = {
      method: "GET",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      }
    };
    const formatAsset = asset === 'all' ? '3d' : asset;
    const url = `https://api.iconscout.com/v3/search?query=${query}&asset=${formatAsset}&price=${price}&sort=${sort}&per_page=${per_page}&page=${page}`;

    try {
      const response = await fetch(url, settings);
      const res = await response.json();
      return res
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async function downloadApi(item_uuid: string, format: 'svg' | 'png') {
    const url = `items/${item_uuid}/api-download`;
    const settings = {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "format": format
      }),
    };

    try {
      const response = await fetch(url, settings);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} and ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  inject("dataApi", { searchApi, downloadApi });
}
