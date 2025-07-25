import React, {Suspense, useEffect, useState } from 'react'
import Affichearticle from './Affichearticle';
import { CircularProgress } from '@mui/material';
import { fetcharticles  , deletearticle } from '../../services/articleservice';


import Insertarticle from './Insertarticle';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Listarticles = () => {
const [articles, setArticles] = useState([]);
const [error, setError] = useState(null);
const [isPending, setIsPending] = useState(true);


//affichage
const [show, setShow] = useState(false);

 //Récupération des articles
const getarticles = async () => {
try {
const res = await fetcharticles()
setArticles(res.data);

//
console.log("Articles reçus :", res.data);


} catch (error) {
console.log(error);
setError(error);
}
finally {
setIsPending(false);
}
};
//charge des donnees
useEffect(() => {
getarticles();
}, []);
//ajoute nouvel article
const handleAddproduct=(newproduit)=>{
    setArticles([newproduit,...articles])
}


////////// on ferme le formulaire 
const handleClose = () => {
    setShow(false);
};


//Suppression article
const handleDeleteProduct = async(productId) => {
try {
if(window.confirm("confirmer la suppression"))
{
await deletearticle(productId)
.then(res=> setArticles(articles.filter((product) => product._id !== productId)))
}
} catch (error) {
Console.log(error)
}
}



const handleUpdateProduct = (prmod) => {
setArticles(articles.map((product) =>product._id === prmod._id ? prmod : product));
};





return (
<div >
{isPending ? (
<div>
<CircularProgress color="primary" size={60} />
</div>
) : error ? (
<div>Erreur lors du chargement des articles</div>
) : (
<div>
<h1><center>Liste des articles</center></h1>
 
 {/* ajout du boutton */ }
 
 <Button variant="contained" style={{ backgroundColor: 'black', justifyContent: 'center', color: 'white' }} onClick={() => setShow(true)}>
  <i className="fa-solid fa-plus-square"></i> Nouveau<Link to="/articles/add"/>
</Button>

  {/*   boutton pour imprimer   */ }

<button type="button" onClick={()=>window.print()}>imprimer emploi</button>

<Affichearticle articles={articles} handleDeleteProduct={handleDeleteProduct}
handleUpdateProduct={handleUpdateProduct}/>
</div>
)}
{show && <Insertarticle show={show}   handleClose={handleClose}   handleAddproduct={handleAddproduct}  /> }
</div>


)
}
export default Listarticles