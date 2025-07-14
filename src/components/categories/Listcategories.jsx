import React, {Suspense, useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material';
import { fetchcategories } from '../../services/categorieservice';
import Affichecategorie from './Affichecategorie';
const Listcategories = () => {
const [categories, setCategories] = useState([]);
const [error, setError] = useState(null);
const [isPending, setIsPending] = useState(true);
const getcategories = async () => {
try {
const res = await fetchcategories ()
setCategories(res.data);
} catch (error) {
console.log(error);
setError(error);
}
finally {
setIsPending(false);
}
};
useEffect(() => {
getcategories();
}, []);
const handleAddproduct=(newproduit)=>{
    setCategories([newproduit,...categories])
}
const handleDeleteProduct = (productId) => {
setCategories(categories.filter((product) => product._id !== productId))
}
const handleUpdateProduct = (prmod) => {
setCategories(categories.map((product) =>product._id === prmod._id ? prmod : product));
};
return (
<div >
{isPending ? (
<div>
<CircularProgress color="primary" size={60} />
</div>
) : error ? (
<div>Erreur lors du chargement des categories</div>
) : (
<div>
<h1><center>Liste des categories</center></h1>
<Affichecategorie categories={categories} />
</div>
)}
</div>
)
}
export default Listcategories