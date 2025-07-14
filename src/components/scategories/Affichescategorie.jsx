import { useMemo } from 'react';
import {
MaterialReactTable,
useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
const Affichescategorie = ({scategories}) => {
const columns = useMemo(
() => [

{
    accessorKey: '_id',
    header: 'ID',
    size: 100,
  },


{
accessorKey: 'nomscategorie',
header: 'nomscategorie',
size: 100,
},


{
accessorKey: 'imagescategorie', //access nested data with dot notation
header: 'Image',
Cell: ({ cell}) => (
<Box
sx={{
display: 'flex', alignItems: 'center', gap: '1rem',
}}
>
<img
alt="" height={100}
src={cell.getValue()} loading="lazy"
style={{ borderRadius: '20%' }}
/>
</Box>),
},


],
[scategories],
);
const table = useMaterialReactTable({
columns,
data:scategories, //data must be memoized or stable (useState, useMemo, defined outsideof this component, etc.)
});
return <MaterialReactTable table={table} />;
};
export default Affichescategorie;