import "../styles/Home.css";

export default function Home() {
  return (
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
        <a href="/projets" className="home-link">
          Voir mes projets
        </a>
      </div>
    </section>
  );
}
