<svelte:head>
<title>Posts</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import {location, querystring} from 'svelte-spa-router';
import {link} from 'svelte-spa-router'
import { onMount } from 'svelte';
import LibConfig from '../lib/LibConfig';
import LibCommon from '../lib/LibCommon';
import CrudIndex from './chats/CrudIndex';
import LibCookie from '../lib/LibCookie';
import ChatPost from './chats/ChatPost';
import Chat from './chats/Chat';
import ModalPost from './ChatShow/ModalPost.svelte';
import Head from "../components/Head.svelte";
import SideBar from "../components/SideBar.svelte";
const MODE_HOME = "home";
const MODE_THREAD = "thread";
const MODE_BOOKMARK = "bookmark";

let params: any;
let data: any, chat_posts: any[] = [] , chat: any = {id: 0, name:""},
post_id = 0, modal_display = false, mTimeoutId: any = 0, user:any = {}, lastCreateTime: string = "";
let id = 0;
let items = [], itemsAll = [], itemPage = 1, perPage: number = 100;
//
onMount(() => {
  console.log("#onMount");
  const idValue = $querystring.replace("id=", '');
  id = Number(idValue);
console.log("idValue=", idValue);
  startProc();
});
/**
*
* @param
*
* @return
*/
const startProc= async function() {
    try{
        const key = LibConfig.COOKIE_KEY_LAST_CHAT;
        localStorage.setItem(key, String(id));
        itemsAll = await ChatPost.getList(id);
        items = await CrudIndex.getPageList(itemsAll.data, itemPage, perPage);
        console.log(itemsAll);
        const chatData = await Chat.get(Number(id));
        //console.log(chatData.data);
        chat = chatData.data;
    } catch (e) {
    console.error(e);
    }
}
/**
*
* @param
*
* @return
*/
async function addItem(){
  try {
    const result = await ChatPost.addItem(id);
console.log(result);        
    items = await ChatPost.getList(id);
console.log(items);  
    startProc();
    const elem = document.querySelector<HTMLInputElement>('#body');
    if(elem) { elem.value = ""; }
  } catch (error) {
    console.error(error);
  }    
}
/**
 *
 * @param
 *
 * @return
 */
const clickClear = async function() {
    try{
        const searchKey = document.querySelector<HTMLInputElement>('#searchKey');
        // @ts-ignore
        if(searchKey) {
            searchKey.value = "";
        }
        items = await ChatPost.getList(id);
    } catch (e) {
        console.error(e);
        throw new Error('Error , clickClear');
    }    
}
/**
*
* @param
*
* @return
*/
async function clickSearch(){
    try {
        const searchKey = document.querySelector<HTMLInputElement>('#searchKey');
        const skey = searchKey?.value;
console.log("search:", skey);
        //@ts-ignore
        const target = await ChatPost.search(id, skey);
        items = target.data;
console.log(items);
        chat_posts = items;
    } catch (error) {
        console.error(error);
    }    
}

/**
 *
 * @param
 *
 * @return
 */
const parentGetList = async function (chat_id: number) {
  try {
console.log("parentGetList=", id);
      const target  = await ChatPost.getList(Number(id));
      items = target.data;
      modal_display = false;
      //console.log(items);
  } catch (e) {
      console.error(e);
  }    
}

const parentDialogClose = async function () {
  try {
    modal_display = false;
  } catch (e) {
      console.error(e);
  }    
}

/**
 *
 * @param
 *
 * @return
 */
 const parentShow = function (id: number)
{
    try {
console.log("parentShow=", id)
        post_id = id;
        modal_display = true;
        /* 
        modal_display = false;
        const timer = 100;
        setTimeout(() => {
            console.log("parentShow=", id);
            modal_display = true;
        }
        , timer);
        */
    } catch (e) {
        console.log(e);
    }
}
/**
*
* @param
*
* @return
*/ 
const parentUpdateList = async function(page: number) {
  console.log("parentUpdateList=", page);
  itemPage = page;
  items = await CrudIndex.getPageList(itemsAll, page, perPage);
  console.log(items);
}
</script>

<!-- MarkUp -->

<div class="bg-gray-50 font-sans">
  <!-- Fixed Header -->
  <header class="fixed top-0 left-0 right-0 bg-white border-b border-gray-400 h-[48px] flex items-center justify-center z-10">
    <a use:link href="/">
      <h1 class="text-lg font-medium text-gray-700">Home</h1>
    </a>
  </header>
  <div class="flex h-screen mt-[48px]">
    <SideBar mode={MODE_HOME} id={id} />
    <!-- メインコンテンツ -->
    <main class="flex-1 bg-gray-50 p-4">
      <!-- ヘッダー -->
      <header class="flex items-center justify-between p-4 bg-white shadow-md rounded-md mb-4">
          <div class="relative flex-grow">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z"></path></svg>
              </div>
              <input type="text" 
              id="searchKey"
              class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Key">
          </div>
          <div class="flex items-center space-x-4 ml-4">
              <button class="p-2 btn-outline-blue"
              on:click={clickSearch} >
                Search
              </button>
          </div>

      </header>

      <!-- コンテンツエリア -->
      <div class="bg-white rounded-md shadow-md p-4">
        <h1 class="text-xl font-semibold mb-2">{chat.name}</h1>
        <!-- ダッシュボードの内容をここに追加 
        <span>ID: {id} </span>
        -->
        <div class="row">
            <div class="col-sm-9">
            <textarea class="input_textarea" name="body" id="body" rows="3" />
            </div>
            <div class="col-sm-3">
                <button class="mt-2 btn" on:click={addItem} >
                Post</button>
            </div>
        </div>
      </div>
      <!-- List -->
      {#each items as item}
      <div class="bg-white rounded-md shadow-md p-4 mt-4">
        <div>
          <h5 class="text-1xl font-bold">{item.user_name}</h5>
          <hr class="my-1" />
          <p>{@html LibCommon.replaceBrString(item.body)}</p>
          <p>{LibCommon.converDateString(item.createdAt)} , ID: {item.id}
          </p>
          <button on:click={parentShow(item.id)}
          class="btn-outline-blue">Show</button>
        </div>
      </div>
      {/each}

      <div class="bg-white rounded-md shadow-md p-4 my-2">
        <!-- Modal -->
        {#if modal_display}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <ModalPost post_id={post_id} parentGetList={parentGetList} 
            parentDialogClose={parentDialogClose} />
          </div>
        </div>
        {/if}            
      </div>

    </main>
  </div>
</div>
<!-- CSS -->
<style>
  .chat_show_modal_wrap #open_post_show { display: none ;}

</style>
<!--
<PaginateBox  itemPage={itemPage} parentUpdateList={parentUpdateList} /> 
-->
