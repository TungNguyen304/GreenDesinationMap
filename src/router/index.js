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
import ProvideTitle from "../pages/Supplier/ProvideTitle";
import Preview from "../pages/Supplier/Preview";
import NotFound from "../pages/NotFound";
import ProvideCriteria from "../pages/Supplier/ProvideCriteria";
import ViewListImage from "../pages/User/ViewListImage";
import ViewImage from "../pages/User/ViewImage";

export const publicRouters = [
    {path: '/', component: Home},
    {path: '/room/:id', component: Room},
    {path: '/room/:id/viewlistimage', component: ViewListImage},
    {path: '/room/:id/viewimage', component: ViewImage},
    {path: '/account', component: Account},
    {path: '/wishlist', component: WishList},
    {path: '/evaluate/:id', component: Evaluate},
    {path: '/detailwishlist/:id', component: DetailWishList},
    {path: '/host', component: Host},
    {path: '/host/mailbox', component: Mailbox},
    {path: '/host/management', component : Management},
    {path: '/host/management/room/:id', component: Room},
    {path: '/host/management/room/:id/viewlistimage', component: ViewListImage},
    {path: '/host/management/room/:id/viewimage', component: ViewImage},
    {path: '/host/registerservice', component: RegisterService},
    {path: '/host/registerservice/location/:style', component: Location},
    {path: '/host/registerservice/providephotos', component: ProvidePhotos},
    {path: '/host/registerservice/providetitle', component: ProvideTitle},
    {path: '/host/registerservice/providecriteria', component: ProvideCriteria},
    {path: '/host/registerservice/preview', component: Preview},
    {path: '/host/account', component: Account},
    {path: '*', component: NotFound}
]

export const privateRouters = []