import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { client, urlFor } from "../sanityClient";
import type { Project } from "../types";
import "../styles/Home.css";
import texture_2 from "../assets/images/texture_2.jpg";
import SEO from "../components/SEO";

export default function Home() {
  const [latestProject, setLatestProject] = useState<Project | null>(null);

  useEffect(() => {
    const query = `*[_type == "projet"] | order(_createdAt desc)[0] {
      _id,
      miniature,
      titre,
      "slug": slug.current,
      galerie
    }`;

    client
      .fetch(query)
      .then((data) => setLatestProject(data))
      .catch(console.error);
  }, []);

  const hasGallery =
    latestProject?.galerie && latestProject.galerie.length >= 2;
  const paddingStyle = hasGallery
    ? { padding: "8rem 6rem 0 4rem" }
    : { padding: 0 };

  return (
    <div className="home-container">
      <SEO
        title="Accueil"
        description="Portfolio de Jade, étudiante en communication spécialisée dans le design et la création digitale. Découvrez mes projets et mon univers."
      />
      <div className="latest-projects" style={paddingStyle}>
        {latestProject && (
          <>
            <div className="latest-project-card">
              {latestProject.miniature && (
                <Link to={`/projets/${latestProject.slug}`}>
                  <img
                    src={urlFor(latestProject.miniature)
                      .width(850)
                      .height(1000)
                      .format("webp")
                      .quality(80)
                      .url()}
                    alt={latestProject.titre || ""}
                    className="latest-project-image"
                  />
                  <h2>{latestProject.titre}</h2>
                </Link>
              )}
            </div>
            {hasGallery &&
              latestProject.galerie!.slice(0, 2).map((item, index) => (
                <div key={item._key || index} className="latest-project-card">
                  <Link to={`/projets/${latestProject.slug}`}>
                    <img
                      src={urlFor(item.image).width(400).url()}
                      alt=""
                      className="latest-project-image"
                    />
                  </Link>
                </div>
              ))}
          </>
        )}
      </div>
      <div className="textures">
        <motion.img
          id="texture1"
          src={texture_2}
          alt=""
          className="texture-image"
          animate={{
            x: [0, 8, -5, 0],
            y: [0, -6, 4, 0],
            filter: ["blur(2px)", "blur(3.5px)", "blur(2.5px)", "blur(2px)"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.img
          id="texture2"
          src={texture_2}
          alt=""
          className="texture-image"
          animate={{
            x: [0, -7, 6, 0],
            y: [0, 5, -4, 0],
            filter: ["blur(2px)", "blur(3px)", "blur(2.8px)", "blur(2px)"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
      <section className="home-section">
        <h1 className="home-title">Étudiante en communication</h1>
        <p className="home-description">
          Candy icing sugar plum marshmallow sweet candy canes marzipan muffin
          pastry. Cake apple pie tiramisu gummi bears tootsie roll macaroon
          pudding chocolate. Tootsie roll gingerbread jelly beans marshmallow
          gummies ice cream cotton candy biscuit. Jujubes tart sweet roll lemon
          drops topping cake muffin chees
        </p>
        <div className="home-link-container">
          <Link to="/contact" className="home-link">
            Contactez-moi
          </Link>
          <Link to="/projets" className="home-btn">
            Mes projets
          </Link>
        </div>
      </section>
    </div>
  );
}
