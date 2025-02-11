<script>
import {link} from 'svelte-spa-router'
import LibLayout from "../client/lib/LibLayout";
LibLayout.startProc();
</script>

<header class="">
  <div class="container">
    <span><a href="/" use:link>[ Home ]</a>
    </span>
    <span><a href="/chats" use:link>[ chats ]</a>
    </span>    
  </div>
  <hr />
</header>

<!--
<span><a href="/about" use:link>[ about ]</a>
</span>    
<span><a href="/thread?id=0" use:link>[ thread ]</a>
</span>    
-->