import Home from "../pages/Home";
import Room from "../pages/Room";
import Account from "../pages/Account";
import WishList from "../pages/WishList";
import Host from "../pages/Host";

export const publicRouters = [
    {path: '/', component: Home},
    {path: '/room', component: Room},
    {path: '/account', component: Account},
    {path: '/wishlist', component: WishList},
    {path: '/host', component: Host}

]

export const privateRouters = []