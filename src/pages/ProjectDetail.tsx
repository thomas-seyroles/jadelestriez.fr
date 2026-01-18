import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { client, urlFor } from "../sanityClient";
import SEO from "../components/SEO";
import type { Project } from "../types";
import "../styles/ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(!!slug);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      return;
    }

    const query = `*[_type == "projet" && slug.current == $slug][0]{
      _id,
      layout,
      titre,
      soustitre,
      description_principale,
      description_secondaire,
      features_list,
      image_principale,
      galerie,
      categorie->{
        nom,
        "slug": slug.current
      }
    }`;

    client
      .fetch(query, { slug })
      .then((data) => {
        setProjectData(data);
        setLoading(false);
        console.log("Données du projet:", data);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch du projet:", err);
        setError("Erreur lors du chargement du projet");
        setLoading(false);
      });
  }, [slug]);

  const layout = projectData?.layout || null;

  if (loading) {
    return (
      <>
        <SEO title="Chargement..." description="Chargement du projet" />
        <div className="project-detail-loading">
          <p>Chargement...</p>
        </div>
      </>
    );
  }

  if (!slug) {
    return (
      <>
        <SEO title="Erreur" description="Slug manquant" />
        <div className="project-detail-error">
          <p>Erreur : Slug manquant</p>
        </div>
      </>
    );
  }

  if (error || !projectData) {
    return (
      <>
        <SEO title="Erreur" description="Projet non trouvé" />
        <div className="project-detail-error">
          <p>Erreur : {error || "Projet non trouvé"}</p>
        </div>
      </>
    );
  }

  // Layout editorial_split
  if (layout === "editorial_split") {
    return (
      <>
        <SEO
          title={projectData.titre || "Projet"}
          description={projectData.description_principale || "Détails du projet"}
        />
        <div className="project-detail editorial-split">
          {/* Flèche de retour en haut à gauche */}
          <Link to={`/projets#${slug}`} className="project-back-link">
            <FaChevronLeft />
          </Link>

          {/* Catégorie en haut à droite */}
          {projectData.categorie && (
            <div className="project-category">
              {projectData.categorie.nom.toUpperCase()}
            </div>
          )}

          {/* Header avec titre, sous-titre et textes descriptifs */}
          <header className="project-editorial-header">
            <div className="project-header-left">
              {projectData.titre && (
                <h1 className="project-title">{projectData.titre}</h1>
              )}
              {projectData.soustitre && (
                <h2 className="project-subtitle">{projectData.soustitre}</h2>
              )}
            </div>
            <div className="project-header-texts">
              {projectData.description_principale && (
                <div className="project-description-text">
                  {projectData.description_principale}
                </div>
              )}
              {projectData.description_secondaire && (
                <div className="project-description-text">
                  {projectData.description_secondaire}
                </div>
              )}
            </div>
          </header>

          {/* Section principale avec image et galerie */}
          <div className="project-detail-content">
            {/* Section gauche - Image principale */}
            <div className="project-main-image-section">
              {projectData.image_principale && (
                <img
                  src={urlFor(projectData.image_principale).width(1200).height(600).format("webp").quality(90).url()}
                  alt={projectData.titre || ""}
                  className="project-main-image"
                />
              )}
            </div>

            {/* Section droite - Galerie et textes */}
            <section className="project-gallery-section">
              {projectData.galerie && projectData.galerie.length > 0 && (
                <>
                  {/* div > img */}
                  {projectData.galerie[0] && (
                    <div className="gallery-item">
                      <img
                        src={urlFor(projectData.galerie[0].image).format("webp").width(800).quality(80).url()}
                        alt={projectData.galerie[0].label || ""}
                        className="gallery-image"
                      />
                    </div>
                  )}

                  {/* div > img + txt */}
                  {projectData.galerie[1] && (
                    <div className="gallery-item-with-text">
                      <img
                        src={urlFor(projectData.galerie[1].image).width(800).url()}
                        alt={projectData.galerie[1].label || ""}
                        className="gallery-image"
                      />
                      {projectData.description_principale && (
                        <div className="project-description-text">
                          {projectData.description_principale}
                        </div>
                      )}
                    </div>
                  )}

                  {/* div > img + txt */}
                  {projectData.galerie[2] && (
                    <div className="gallery-item-with-text">
                      <img
                        src={urlFor(projectData.galerie[2].image).width(800).url()}
                        alt={projectData.galerie[2].label || ""}
                        className="gallery-image"
                      />
                      {projectData.description_secondaire && (
                        <div className="project-description-text">
                          {projectData.description_secondaire}
                        </div>
                      )}
                    </div>
                  )}

                  {/* div > img + img */}
                  {projectData.galerie[3] && projectData.galerie[4] && (
                    <div className="gallery-item-double">
                      <img
                        src={urlFor(projectData.galerie[3].image).width(800).url()}
                        alt={projectData.galerie[3].label || ""}
                        className="gallery-image"
                      />
                      <img
                        src={urlFor(projectData.galerie[4].image).width(800).url()}
                        alt={projectData.galerie[4].label || ""}
                        className="gallery-image"
                      />
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </>
    );
  }

  // Layout complex_features
  if (layout === "complex_features") {
    return (
      <>
        <SEO
          title={projectData.titre || "Projet"}
          description={projectData.description_principale || "Détails du projet"}
        />
        <div className="project-detail complex-features">
          {/* Flèche de retour en haut à gauche */}
          <Link to={`/projets#${slug}`} className="project-back-link">
            <FaChevronLeft />
          </Link>

          {/* Catégorie en haut à droite */}
          {projectData.categorie && (
            <div className="project-category">
              {projectData.categorie.nom.toUpperCase()}
            </div>
          )}

          <div className="project-detail-content">
            {/* Section gauche - Image principale */}
            <div className="project-main-image-section">
              {projectData.image_principale && (
                <img
                  src={urlFor(projectData.image_principale).width(1200).url()}
                  alt={projectData.titre || ""}
                  className="project-main-image"
                />
              )}
            </div>

            {/* Section droite - Galerie et textes */}
            <section className="project-gallery-section">
              {projectData.galerie && projectData.galerie.length > 0 && (
                <>
                  {/* div > img */}
                  {projectData.galerie[0] && (
                    <div className="gallery-item">
                      <img
                        src={urlFor(projectData.galerie[0].image).width(800).url()}
                        alt={projectData.galerie[0].label || ""}
                        className="gallery-image"
                      />
                    </div>
                  )}

                  {/* div > img + txt */}
                  {projectData.galerie[1] && (
                    <div className="gallery-item-with-text">
                      <img
                        src={urlFor(projectData.galerie[1].image).width(800).url()}
                        alt={projectData.galerie[1].label || ""}
                        className="gallery-image"
                      />
                      {projectData.description_principale && (
                        <div className="project-description-text">
                          {projectData.description_principale}
                        </div>
                      )}
                    </div>
                  )}

                  {/* div > img + txt */}
                  {projectData.galerie[2] && (
                    <div className="gallery-item-with-text">
                      <img
                        src={urlFor(projectData.galerie[2].image).width(800).url()}
                        alt={projectData.galerie[2].label || ""}
                        className="gallery-image"
                      />
                      {projectData.description_secondaire && (
                        <div className="project-description-text">
                          {projectData.description_secondaire}
                        </div>
                      )}
                    </div>
                  )}

                  {/* div > img + img */}
                  {projectData.galerie[3] && projectData.galerie[4] && (
                    <div className="gallery-item-double">
                      <img
                        src={urlFor(projectData.galerie[3].image).width(800).url()}
                        alt={projectData.galerie[3].label || ""}
                        className="gallery-image"
                      />
                      <img
                        src={urlFor(projectData.galerie[4].image).width(800).url()}
                        alt={projectData.galerie[4].label || ""}
                        className="gallery-image"
                      />
                    </div>
                  )}
                </>
              )}
            </section>
          </div>

          {/* Informations en bas à gauche */}
          <div className="project-info-bottom">
            {projectData.titre && (
              <h1 className="project-title">{projectData.titre}</h1>
            )}
            {projectData.soustitre && (
              <h2 className="project-subtitle">{projectData.soustitre}</h2>
            )}
            {projectData.features_list && projectData.features_list.length > 0 && (
              <ul className="project-features-list">
                {projectData.features_list.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    );
  }

  // Layout par défaut ou autres layouts
  return (
    <>
      <SEO
        title={projectData.titre || "Projet"}
        description={projectData.description_principale || "Détails du projet"}
      />
      <div className="project-detail-default">
        <h1>Layout du projet</h1>
        <p>{layout || "Aucun layout défini"}</p>
      </div>
    </>
  );
}

