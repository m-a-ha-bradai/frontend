import React, {Suspense, useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material';
import { fetchscategories } from '../../services/scategorieservice';
import Affichescategorie from './Affichescategorie';
const Listscategories = () => {
const [scategories, setsCategories] = useState([]);
const [error, setError] = useState(null);
const [isPending, setIsPending] = useState(true);
const getscategories = async () => {
try {
const res = await fetchscategories ()
setsCategories(res.data);
} catch (error) {
console.log(error);
setError(error);
}
finally {
setIsPending(false);
}
};
useEffect(() => {
getscategories();
}, []);
const handleAddproduct=(newproduit)=>{
    setsCategories([newproduit,...categories])
}
const handleDeleteProduct = (productId) => {
setsCategories(categories.filter((product) => product._id !== productId))
}
const handleUpdateProduct = (prmod) => {
setsCategories(categories.map((product) =>product._id === prmod._id ? prmod : product));
};
return (
<div >
{isPending ? (
<div>
<CircularProgress color="primary" size={60} />
</div>
) : error ? (
<div>Erreur lors du chargement des scategories</div>
) : (
<div>
<h1><center>Liste des scategories</center></h1>
<Affichescategorie scategories={scategories} />
</div>
)}
</div>
)
}
export default Listscategories