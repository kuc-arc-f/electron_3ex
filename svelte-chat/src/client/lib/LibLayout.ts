import LibCookie from './LibCookie';
import LibConfig from "../../lib/LibConfig";
import {link, push} from 'svelte-spa-router';

const LibLayout = {
  /**
   *
   * @param key: any
   *
   * @return
   */  
  startProc : async function() : Promise<any>
  {
    try{
      let ret = false;
      const parsedUrl = new URL(window.location.href);
      if(
          !(parsedUrl.pathname === '/login' ||
          parsedUrl.pathname === '/user/create'
          )
      )
      {
        console.log("LibLayout.pathname=", parsedUrl.pathname);
        if(typeof window === 'undefined'){ return;}
        //const authValue = LibCookie.getCookie(LibConfig.COOKIE_KEY_AUTH);
        const authValue = localStorage.getItem(LibConfig.COOKIE_KEY_AUTH);
        console.log("LibLayout.getCookie=", authValue);
        if(!authValue){
          push('/login');
          return;
        }
      }
      return ret;  
    } catch (e) {
      console.error(e);
    }
  }

}
export default LibLayout;