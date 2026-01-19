import { motion } from "motion/react";
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

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as any } },
  };

  return (
    <motion.section 
      className="home-section"
      variants={containerVariants}
    >
      <motion.h1 className="home-title" variants={itemVariants}>
        Étudiante en communication
      </motion.h1>
      <motion.p className="home-description" variants={itemVariants}>
        Candy icing sugar plum marshmallow sweet candy canes marzipan muffin
        pastry. Cake apple pie tiramisu gummi bears tootsie roll macaroon
        pudding chocolate. Tootsie roll gingerbread jelly beans marshmallow
        gummies ice cream cotton candy biscuit. Jujubes tart sweet roll lemon
        drops topping cake muffin chees
      </motion.p>
      <motion.div className="home-link-container" variants={itemVariants}>
        <Button 
          variant="border-primary" 
          onClick={() => navigate("/contact")}
          style={{ fontSize: '1rem' }}
        >
          Contactez-moi
        </Button>
        <Button 
          variant="primary" 
          onClick={() => navigate("/projets")}
          style={{ fontSize: '1rem' }}
        >
          Mes projets
        </Button>
      </motion.div>
    </motion.section>
  );
}
