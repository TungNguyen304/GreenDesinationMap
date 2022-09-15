import Home from "../pages/Home";
import Room from "../pages/Room";
import Account from "../pages/Account";
import WishList from "../pages/WishList";

export const publicRouters = [
    {path: '/', component: Home},
    {path: '/room', component: Room},
    {path: '/account', component: Account},
    {path: '/wishlist', component: WishList},
    

]

export const privateRouters = []