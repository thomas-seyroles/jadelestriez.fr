import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import type { Project } from "../types";
import "../styles/Home.css";
import texture_2 from "../assets/images/texture_2.jpg";

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
        <img id="texture1" src={texture_2} alt="" />
        <img id="texture2" src={texture_2} alt="" />
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
          <Link to="/projets" className="home-link">
            Voir mes projets
          </Link>
        </div>
      </section>
    </div>
  );
}
