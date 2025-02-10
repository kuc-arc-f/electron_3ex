<script lang="ts">
import Head from "../components/Head.svelte";
import {link} from 'svelte-spa-router'
import { onMount } from 'svelte';
import LibConfig from '../lib/LibConfig';
import Chat from './chats/Chat';

let chatId = 0;
let chatData = {id: 0, name: ""};
let recentdisplay = false;

onMount(async () => {
  const key = LibConfig.COOKIE_KEY_LAST_CHAT;
  const value = localStorage.getItem(key);
  if(value){    
    chatId = Number(value);
    console.log("chatId=", value);
    const target = await Chat.get(Number(chatId));
    chatData = target.data;
    console.log(chatData.data);
    const authValue = localStorage.getItem(LibConfig.COOKIE_KEY_AUTH);
    if(authValue) {
      console.log("authValue=", authValue);
      chatId = Number(authValue);
    }

    recentdisplay = true;
  }
});
</script>

<!-- markUp -->
<Head />
<div class="container mx-auto p-4  pb-24">
  <h1 class="text-3xl font-bold">Home</h1>
  <hr class="my-2" />
  {#if recentdisplay}
    <span>userId: {chatId}</span>
    <hr class="my-2" />
    <h3 class="text-1xl text-gray-400">Recent Chat</h3>
    <hr class="my-2" />
    <span class="text-2xl font-bold"><h3 class="py-1">{chatData.name}</h3>
    </span>
    <span>ID: {chatData.id}</span>
     <a use:link href={`/chatshow?id=${chatData.id}`}>
      <button class="btn btn-outline-blue ms-2">Open
      </button>		
    </a>
    <hr />
  {/if}  
</div>

<style>
</style>
