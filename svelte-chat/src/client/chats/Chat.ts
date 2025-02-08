//import moment from 'moment'
import LibConfig from '../../lib/LibConfig'
import HttpCommon from '../../lib/HttpCommon';
import ApiUtil from '../../lib/ApiUtil';
//
const LibChat = {
  /**
  *
  * @param
  *
  * @return Promise<any>
  */      
  get: async function(id: number): Promise<any>
  {
    try{
      let ret = {};
      let item: any = {
        "id": id
      };
      const json = await ApiUtil.post("/api/chats/get", item);
      //console.log(json);
      if(json.ret === 200) {
        ret = json.data;
        //        console.log(json.data);
      }
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , get');
    }    
  }, 
  /**
  *
  * @param
  *
  * @return
  */
  search: async function(searchKey: string): Promise<any>
  {
    try {
        let items = [];
        const item = {
          seachKey : searchKey,
        }
        const json = await ApiUtil.post("/api/chats/search", item);
        items = json.data
//console.log(json);	      
      return items;
    } catch (e) {
      console.error(e);
    }
  },     
}
export default LibChat;
