<script lang="ts">

const test1 = async function(){
  try{
    //https://x.com/k_nakashima/status/1880385285911155100
    //https://x.com/k_nakashima/status/1885310220441969028
    // https://x.com/k_nakashima/status/1877147586072580459
    // const path = 'https://zenn.dev/link/comments/bb96620c14d907';
    const path = 'https://x.com/k_nakashima/status/1877147586072580459';
    const res = await window.myGetOgpApi.getOgpApi(path);
    console.log(res);

    //contextBridge.exposeInMainWorld('myGetOgpApi', {
      //getOgpApi: (a) => ipcRenderer.invoke('get-ogp-api', a),

  //const options = { url: 'https://example.com' };
  /*
  const options = { url: 'https://x.com/k_nakashima/status/1880385285911155100' };

  ogs(options)
    .then(({ result }) => {
      console.log(result);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  */

  }catch(e){ console.log(e) }

}
</script>

<main>
  <h1 class="text-3xl font-bold">Test</h1>
  <hr />
  <button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
  on:click={test1}
>
  Test
</button>  

</main>

<style>
</style>
