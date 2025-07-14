import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Listarticles from "./components/articles/Listarticles";
import Insertarticle from "./components/articles/Insertarticle";
import Editarticle from "./components/articles/Editarticle";
import Listcategories from "./components/categories/Listcategories";
import Insertcategorie from "./components/categories/Insertcategorie";
import Editcategorie from "./components/categories/Editcategorie";

import Listscategories from "./components/scategories/Listscategories";
import Insertscategorie from "./components/scategories/Insertscategorie";
import Editscategorie from "./components/scategories/Editscategorie";
import Menu from "./components/Menu";


import { CartProvider } from "use-shopping-cart";

import Listarticlescard from "./client/Listarticlescard";
import Cart from "./client/Cart";
import ChatComponent from "./components/articles/ChatComponent";
import ChatComponent_2 from "./components/articles/ChatComponent_2";
import DynamicTableArray from "./components/articles/DynamicTableArray";
import Successpayment from "./client/Successpayment";
import Listarticlespagination from "./components/articles/Listarticlespagination";



function App() {
return (

<>

<CartProvider>

<Router>

<Menu/>


<Routes>
<Route path="/articles" element={<Listarticles/>}/>
<Route path="/articles/add" element={<Insertarticle/>}/>
<Route path="/article/edit/:id" element={<Editarticle/>}/>

<Route path="/categories" exact element={<Listcategories/>}/>
<Route path="/categories/add" element={<Insertcategorie/>}/>
<Route path="/categories/edit/:id" element={<Editcategorie/>}/>

<Route path="/scategories" element={<Listscategories/>}/>
<Route path="/scategories/add" element={<Insertscategorie/>}/>
<Route path="/scategories/edit/:id" element={<Editscategorie/>}/>

<Route path="/articlescard" element={<Listarticlescard />}/>

<Route path='/cart' element={<Cart/>}/>

<Route path="/chat" element={<ChatComponent/>}/>
<Route path="/chat_2" element={<ChatComponent_2/>}/>



<Route path="/dynamictable" element={<DynamicTableArray/>}/>

<Route path="/successPayment" element={<Successpayment/>}/>
<Route path="/artpage" element={<Listarticlespagination/>}/>





</Routes>
</Router>

</CartProvider>

</>
)
}
export default App
