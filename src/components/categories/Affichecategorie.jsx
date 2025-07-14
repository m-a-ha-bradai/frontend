import { useMemo } from 'react';
import {
MaterialReactTable,
useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
const Affichecategorie = ({categories}) => {
const columns = useMemo(
() => [

    {
    accessorKey: '_id',
    header: 'ID',
    size: 100,
  },
    {
accessorKey: 'nomcategorie',
header: 'nomcategorie',
size: 100,
},
{
accessorKey: 'imagecategorie', //access nested data with dot notation
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
[categories],
);
const table = useMaterialReactTable({
columns,
data:categories, //data must be memoized or stable (useState, useMemo, defined outsideof this component, etc.)
});
return <MaterialReactTable table={table} />;
};
export default Affichecategorie;