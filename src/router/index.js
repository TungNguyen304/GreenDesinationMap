import Home from "../pages/User/Home";
import Room from "../pages/User/Room";
import Account from "../pages/User/Account";
import WishList from "../pages/User/WishList";
import Evaluate from "../pages/User/Evaluate";
import Host from "../pages/Supplier/Host";
import Mailbox from "../pages/Supplier/Mailbox";
import Management from "../pages/Supplier/Management";
import RegisterService from "../pages/Supplier/RegisterService";
import DetailWishList from "../pages/User/DetailWishList";
import Location from "../pages/Supplier/Location";
import ProvidePhotos from "../pages/Supplier/ProvidePhotos";

export const publicRouters = [
    {path: '/', component: Home},
    {path: '/room', component: Room},
    {path: '/account', component: Account},
    {path: '/wishlist', component: WishList},
    {path: '/evaluate/:id', component: Evaluate},
    {path: '/detailwishlist/:id', component: DetailWishList},
    {path: '/host', component: Host},
    {path: '/host/mailbox', component: Mailbox},
    {path: '/host/management', component: Management},
    {path: '/host/registerservice', component: RegisterService},
    {path: '/host/registerservice/location', component: Location},
    {path: '/host/registerservice/providephotos', component: ProvidePhotos},
    {path: '/host/account', component: Account}
]

export const privateRouters = []