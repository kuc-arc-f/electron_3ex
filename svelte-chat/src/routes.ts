import Home from './client/Home.svelte'
import About from './client/About.svelte'
import Login from './client/Login.svelte'
import Signup from './client/Signup.svelte'
import Todo from './client/Todo.svelte'
import Test from './client/Test.svelte'
import Chats from './client/Chats.svelte'
import ChatShow from './client/ChatShow.svelte'
import ChatCreate from './client/ChatCreate.svelte'
import Bookmark from './client/Bookmark.svelte'
import Thread from './client/Thread.svelte'

//console.log("App.svelte");

export const routes = {
  '/': Home,
  '/about': About,
  '/todo': Todo,
  '/test': Test,
  '/bookmark': Bookmark,
  '/chatcreate': ChatCreate,
  '/chatshow': ChatShow,
  '/chats': Chats,
  '/login': Login,
  '/signup': Signup,
  '/thread': Thread,
}
