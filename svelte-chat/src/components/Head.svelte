<script>
import {link} from 'svelte-spa-router'
import LibLayout from "../client/lib/LibLayout";
LibLayout.startProc();
</script>

<header class="">
  <div class="container">
    <span class="ms-2"><a href="/" use:link>[ Home ]</a>
    </span>
    <span class="ms-2"><a href="/chats" use:link>[ Chats ]</a>
    </span>    
  </div>
  <hr />
</header>

<!--
-->