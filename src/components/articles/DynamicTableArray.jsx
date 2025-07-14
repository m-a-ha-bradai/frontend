import React from 'react';
const DynamicTableArray = ({ data }) => {
console.log("Données reçues pour le tableau :", data);
if (!data || data.length === 0) {
return <p>Aucune donnée à afficher.</p>;
}
// Collecter toutes les clés uniques de tous les objets pour les en-têtes
const allKeys = JSON.parse(data).reduce((acc, obj) => {
Object.keys(obj).forEach(key => {
if (!acc.includes(key)) {
acc.push(key);
}
});
return acc;
}, []);
return (
<table style={{ borderCollapse: 'collapse', width: '100%' }} >
<thead>
<tr>
{allKeys.map((key) => (
<th key={key} style={{ border: '1px solid #ddd', padding: '8px',

textAlign: 'left', backgroundColor: '#f2f2f2' }}>

{key}
</th>
))}
</tr>
</thead>
<tbody>
{JSON.parse(data).map((row, rowIndex) => (
<tr key={rowIndex}>
{allKeys.map((key) => (
<td key={key} style={{ border: '1px solid #ddd', padding: '8px'

}}>

{/*       ajout du key       */}

{row[key] === undefined
? ' '
: key === 'imageart'
? <img src={row[key]} alt="Image" style={{ maxWidth: '100px',

maxHeight: '100px' }} />

: typeof row[key] === 'object' && row[key] !== null
? JSON.stringify(row[key])
: row[key]}



{row[key] === undefined
? ' '
: typeof row[key] === 'object' && row[key] !== null
? JSON.stringify(row[key])
: row[key]}


{row[key] === undefined
? ' '
: key === 'imageart'
? <img src={row[key]} alt="Image" style={{ maxWidth: '100px',

maxHeight: '100px' }} />

: typeof row[key] === 'object' && row[key] !== null
? JSON.stringify(row[key])
: row[key]}



</td>
))}
</tr>
))}
</tbody>
</table>
);
};
export default DynamicTableArray;