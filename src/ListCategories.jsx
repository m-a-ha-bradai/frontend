import axios from 'axios';
import {useEffect,useState} from 'react';
function ListCategories() {
const[categories,setCategories]=useState([]);
useEffect(() => {
axios.get("http://localhost:3001/api/categories")
.then((response)=>{setCategories(response.data)})
.catch((err)=>alert('Erreur : Pas de catégories'))
}, []);
return (
<>
<h1>Les catégories</h1>
{
categories && categories.length>0 && categories.map((cat)=>{
return <div key={cat._id}>
{cat.nomcategorie}
</div>
})
}
</>
);
}
export default ListCategories;