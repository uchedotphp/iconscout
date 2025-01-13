export default function ({ $axios, redirect }) {
  const secretkey = process.env.NUXT_ENV_API_CLIENT_ID;
  const clientid = process.env.NUXT_ENV_API_CLIENT_ID;

  $axios.setHeader("Authorization", `Bearer ${secretkey}`);
  $axios.setHeader("Client-ID", clientid);

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/404')
    } else if (code === 500) {
      redirect('/500')
    }
  })
}
