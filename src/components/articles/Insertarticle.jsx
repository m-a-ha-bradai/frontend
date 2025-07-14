import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { fetchscategories } from "../../services/scategorieservice"
import { addarticle } from "../../services/articleservice"
import axios from "axios"
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Insertarticle = ({ show, handleClose, handleAddproduct }) => {
  // initialisation 
  const [articles, setArticles] = useState({
    reference: '',
    designation: '',
    marque: '',
    qtestock: 0,
    prix: 0,
    scategorieID: '',
    imageart: ''
  })

  const [scategories, setScategories] = useState([])
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Ajout d'un état de chargement   

  const loadscategories = async () => {
    try {
      const res = await fetchscategories()
      setScategories(res.data);
      // Sélection automatique de la première catégorie si disponible
      if (res.data.length > 0) {
        setArticles(prev => ({ ...prev, scategorieID: res.data[0]._id }))
      }
    } catch (error) {
      console.error("Erreur chargement catégories:", error);
    }
  }

  useEffect(() => {
    loadscategories()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Activation de l'état de chargement
    
    try {
      // Validation minimale des champs requis
      if (!articles.designation || !articles.prix) {
        throw new Error("La désignation et le prix sont obligatoires");
      }

      const res = await addarticle(articles)
      handleAddproduct(res.data)
      handleClose()
      // Réinitialisation complète du formulaire
      setArticles({
        reference: '',
        designation: '',
        marque: '',
        qtestock: 0,
        prix: 0,
        scategorieID: scategories[0]?._id || '',
        imageart: ''
      })
      setFiles([])
    } catch (error) {
      console.error("Erreur ajout article:", error)
    } finally {
      setIsLoading(false); // Désactivation de l'état de chargement
    }
  };

  // Configuration de FilePond pour l'upload Cloudinary
  const serverOptions = () => ({
  process: (fieldName, file, metadata, load, error, progress, abort) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'esps2026');
    data.append('cloud_name', 'de3yha4xp');
    data.append('public_id', file.name);

    axios.post('https://api.cloudinary.com/v1_1/de3yha4xp/image/upload', data, {
      onUploadProgress: (e) => {
        progress(e.lengthComputable, e.loaded, e.total);
      }
    })
    .then((response) => response.data)  // Récupérer la réponse de Cloudinary
    .then((data) => {
      console.log(data);  // Log pour debugger

      // Mise à jour de l'état en utilisant la ligne exacte demandée
      setArticles({ ...articles, imageart: data.url });

      // Call load to finish the process
      load(data);  
    })
    .catch((err) => {
      console.error('Error uploading file:', err);
      error('Upload failed');  // Affiche un message d'erreur si l'upload échoue
      abort();  // Abandon de l'upload
    });
  }
});

  return (
    <div className="form-container">
      <Modal show={show} onHide={handleClose} size="lg">
        <form className="article-form" onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <h2>Ajouter Article</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="reference">Référence</label>
                <input
                  type="text"
                  id="reference"
                  value={articles.reference}
                  onChange={(e) => setArticles({ ...articles, reference: e.target.value })}
                  className="form-input"
                  placeholder="Entrez référence article"
                />
              </div>

              <div className="form-group">
                <label htmlFor="designation">Désignation*</label>
                <input
                  type="text"
                  id="designation"
                  value={articles.designation}
                  onChange={(e) => setArticles({ ...articles, designation: e.target.value })}
                  className="form-input"
                  placeholder="Entrez la désignation article"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="marque">Marque</label>
                <input
                  type="text"
                  id="marque"
                  value={articles.marque}
                  onChange={(e) => setArticles({ ...articles, marque: e.target.value })}
                  className="form-input"
                  placeholder="Entrez marque"
                />
              </div>

              <div className="form-group">
                <label htmlFor="qtestock">Quantité</label>
                <input
                  type="number"
                  id="qtestock"
                  min="0"
                  value={articles.qtestock}
                  onChange={(e) => setArticles({ ...articles, qtestock: e.target.value })}
                  className="form-input"
                  placeholder="Entrez quantité stock"
                />
              </div>

              <div className="form-group">
                <label htmlFor="prix">Prix*</label>
                <input
                  type="number"
                  required
                  id="prix"
                  min="0"
                  step="0.01"
                  value={articles.prix}
                  onChange={(e) => setArticles({ ...articles, prix: e.target.value })}
                  className="form-input"
                  placeholder="Entrez le prix"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Catégorie</label>
                <select
                  id="category"
                  className="form-control"
                  value={articles.scategorieID}
                  onChange={(e) => setArticles({ ...articles, scategorieID: e.target.value })}
                >
                  {scategories.map((scat) => (
                    <option key={scat._id} value={scat._id}>
                      {scat.nomscategorie}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                  <FilePond
                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    server={serverOptions()}
                    name="file"
                    labelIdle='Glissez-déposez votre image ou <span class="filepond--label-action">Parcourir</span>'
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Insertarticle
