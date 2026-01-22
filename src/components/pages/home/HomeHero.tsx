import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function HomeHero() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <motion.section className="home-section" variants={containerVariants}>
      <motion.h1 className="home-title" variants={itemVariants}>
        <span className="home-title-name">Jade Lestriez</span>
        <br />
        Communication & Design
      </motion.h1>
      <motion.p className="home-description" variants={itemVariants}>
        De l’immersion dans votre brief à la livraison finale, je conçois votre
        image comme un levier stratégique. Mon approche ? Analyser l’ADN de
        votre projet pour transformer une intention en une émotion visuelle
        percutante.
        <br />
        Je cultive une esthétique où rien n'est laissé au hasard. Composition,
        graphisme, direction artistique... j'expérimente sans cesse pour
        maîtriser cette grammaire visuelle qui fait qu'un visuel ne se contente
        pas d'être vu, mais qu'il est ressenti.
        <br />
        Prêt à co-créer votre prochain territoire visuel ?
      </motion.p>
      <motion.div className="home-link-container" variants={itemVariants}>
        <Button
          variant="primary"
          onClick={() => navigate("/projets")}
          style={{ fontSize: "1rem" }}
        >
          Mes projets
        </Button>
        <Button
          variant="border-primary"
          onClick={() => navigate("/contact")}
          style={{ fontSize: "1rem" }}
        >
          Contactez-moi
        </Button>
      </motion.div>
    </motion.section>
  );
}
