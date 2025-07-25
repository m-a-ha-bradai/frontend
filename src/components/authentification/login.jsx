import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../../services/authservice";
import './AuthForm.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const objetuser = {
      email: email,
      password: password
    };

    // Envoi des données de connexion
    signin(objetuser).then((result) => {
      if (result.data.success) { //Si la connexion est réussie
        if (result.data.user.isActive) { // Si le compte est activé
          localStorage.setItem("CC_Token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          localStorage.setItem("refresh_token", result.data.refreshToken);

          if (result.data.user.role === "admin") { 
            navigate('/dashboard'); 
          } else {
            navigate('/articlescard '); 
          }
        } else {
          alert("Compte n'est pas encore activé"); 
        }
      } else {
        alert("Erreur !"); 
      }
    })
    .catch((error) => { 
      alert("Error");
      console.log(error); 
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          
          <div className="input-group">
            <div className="input-label">Email</div>
            <div className="input-wrapper">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'email
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-label">Password</div>
            <div className="input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Mise à jour du mot de passe
                required
              />
            </div>
          </div>

          <button className="button" type="submit">Log In</button>
        </form>

        <Link to="/register">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
