import { motion } from "motion/react";
import Button from "../../ui/Button";
import { Input, Textarea } from "../../ui/Input";

export default function ContactForm() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.form 
      action="" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Input type="text" placeholder="Email" required />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Textarea
          name="message"
          placeholder="Que voulez-vous me dire ?"
          rows={4}
          required
        />
      </motion.div>
      
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="border"
        >
          Envoyer
        </Button>
      </motion.div>
    </motion.form>
  );
}
