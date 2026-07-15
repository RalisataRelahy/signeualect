import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReportService } from "../../../services/ReportService";
import { useAuth } from "../../../hooks/UseAuth";
import { Toast } from "../../../components/Toast/Toast";
import type { ReportCategory } from "../../../types";
import "./CreateReport.css";

/**
 * Page permettant à un citoyen de créer un nouveau signalement.
 */
export function CreateReport() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ReportCategory>("water");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await ReportService.createReport({
        title,
        description,
        category,
        city,
        district
      }, user.uid);
      
      setToastMessage("Signalement créé avec succès !");
      setTimeout(() => {
        navigate("/citizen/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error);
      setToastMessage("Erreur lors de la création du signalement.");
      setLoading(false);
    }
  };

  return (
    <div className="create-report-container">
      <h1 className="text-primary mb-6">Nouveau Signalement</h1>
      
      <div className="form-card">
        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <div className="form-group">
            <label htmlFor="title">Titre du signalement</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Ex: Coupure d'eau courante"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Catégorie</label>
            <select 
              id="category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value as ReportCategory)}
              required
              className="custom-select"
            >
              <option value="water">Eau</option>
              <option value="electricity">Électricité</option>
              <option value="both">Eau et électricité</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="city">Ville</label>
              <input 
                type="text" 
                id="city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Ex: Antananarivo"
                required 
              />
            </div>
            <div className="form-group flex-1">
              <label htmlFor="district">Quartier</label>
              <input 
                type="text" 
                id="district" 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)} 
                placeholder="Ex: Analakely"
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (détails de la coupure)</label>
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={5}
              placeholder="Veuillez décrire le problème..."
              required
              className="custom-textarea"
            />
          </div>

          <button type="submit" className="btn-primary mt-4" disabled={loading}>
            {loading ? "Création en cours..." : "Soumettre le signalement"}
          </button>
        </form>
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} type={toastMessage.includes("Erreur") ? "error" : "success"} />}
    </div>
  );
}
