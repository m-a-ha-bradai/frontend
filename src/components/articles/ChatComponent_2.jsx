import React, { useState } from 'react';
import DynamicTableArray from './DynamicTableArray';

const ChatComponent_2 = () => {
const [input, setInput] = useState('');
const [messages, setMessages] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const sendMessage = async () => {
if (!input.trim()) return;
setIsLoading(true);
setError(null);
try {
const result = await fetchGeminiResponse(input);
console.log("Résultat de Gemini :", result);
// Ajouter les messages utilisateur et bot à l'historique
setMessages(prev => [
...prev,
{ role: 'user', text: input },

{ role: 'bot', text: <DynamicTableArray data={result} /> }


]);
setInput('');
} catch (err) {
console.error("Erreur lors de l'envoi du message :", err);
setError("Impossible de contacter l'API Gemini. Vérifiez votre clé APIou le service.");
} finally {
setIsLoading(false);
}
};
const fetchGeminiResponse = async (prompt) => {

const endpoint = `http://localhost:3001/api/chatbot`;
const response = await fetch(endpoint, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
question: prompt
})
});
if (!response.ok) {
let errorData = {};
try {
errorData = await response.json();
} catch (e) {
console.warn("Impossible de parser l'erreur en JSON");
}
throw new Error(`Erreur API ${response.status} :
${errorData.error?.message || 'Erreur inconnue'}`);
}
const data = await response.json();
if (data && data.resultats && Array.isArray(data.resultats) &&
data.resultats.length > 0) {
// Vérifier si le premier résultat est un objet avec une propriété
'reponse'
return JSON.stringify(data.resultats);
} else {


    
return JSON.stringify([{"message": "Aucun résultat trouvé dans laréponse de Gemini."}]);



}
};
return (
<div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
<h1>Chat Gemini</h1>
<textarea
rows={4}
cols={50}
value={input}
onChange={e => setInput(e.target.value)}
placeholder="Pose ta question ici..."
disabled={isLoading}
style={{ width: '100%', padding: '10px', fontSize: '16px' }}
/>
<button
onClick={sendMessage}
disabled={isLoading || !input.trim()}
style={{
marginTop: '10px',
padding: '10px 20px',
fontSize: '16px',
cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer'
}}
>
{isLoading ? 'Envoi en cours...' : 'Envoyer'}
</button>
{error && (
<p style={{ color: 'red', marginTop: '10px' }}>
Erreur : {error}
</p>
)}
<div style={{ marginTop: '30px' }}>
<h3>Historique du chat :</h3>
{messages.map((msg, index) => (
<div
key={index}
style={{
backgroundColor: msg.role === 'user' ? '#e0f7fa' : '#f1f8e9',
textAlign: msg.role === 'user' ? 'right' : 'left',
margin: '10px 0',
padding: '10px',
borderRadius: '10px'
}}
>
<strong>{msg.role === 'user' ? 'Vous' : 'Gemini'} :</strong>
<p style={{ margin: '5px 0' }}>{msg.text}</p>
</div>
))}
{isLoading && <p>Chargement de la réponse...</p>}
</div>
</div>
);
};
export default ChatComponent_2;