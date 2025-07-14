import React, { useMemo, useState } from 'react';

import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
import { Button } from 'react-bootstrap';
import Editarticle from './Editarticle';

const Affichearticle = ({ articles, handleDeleteProduct, handleUpdateProduct }) => {
  const [show, setShowe] = useState(false);
  const [article, setArticle] = useState({});



//ouverture et de fermeture de la modale
  const handleShow = () => { setShowe(true); };
  const handleClose = () => { setShowe(false); };

  const handleEdit = (art) => {
    setArticle(art);
    console.log(art);
    handleShow();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'imageart',
        header: 'Image',
        Cell: ({ cell }) => (
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}
          >
            <img
              alt=""
              height={100}
              src={cell.getValue()}
              loading="lazy"
              style={{ borderRadius: '20%' }}
            />
          </Box>
        ),
      },
      {
        accessorKey: 'reference',
        header: 'Référence',
        size: 100,
      },
      {
        accessorKey: 'designation',
        header: 'Désignation',
        size: 100,
      },
      {
        accessorKey: 'marque',
        header: 'Marque',
        size: 100,
      },
      {
        accessorKey: 'prix',
        header: 'Prix',
        size: 100,
      },
      {
        accessorKey: 'qtestock',
        header: 'Stock',
        size: 100,
      },
      {
        accessorKey: '_id',
        header: 'actions',
        size: 100,
        Cell: ({ cell, row }) => (
          <div>
            <Button onClick={() => { handleEdit(cell.row.original); }} variant="warning" size="md">
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            {/*espace*/}
            &nbsp;
            <Button onClick={() => { handleDeleteProduct(cell.row.original._id); }} variant="danger" size="md">
              <i className="fa fa-trash" />
            </Button>
          </div>
        ),
      },
    ],
    [articles],
  );

  const table = useMaterialReactTable({
    columns,
    data: articles,
  });

  console.log("Articles dans Affichearticle :", articles);

  return (
    <div>
      <Editarticle
  showe={show}  
  handleclose={handleClose}  
  art={article}
  modifarticle={handleUpdateProduct} 
/>
        
 
        
      
      
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Affichearticle;























//show pour gerer l'affichage 