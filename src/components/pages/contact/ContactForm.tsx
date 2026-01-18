import { motion } from "motion/react";
import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import Button from "../../ui/Button";
import { Input, Textarea } from "../../ui/Input";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !message) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      toast.success("Message envoyé avec succès!");
      setEmail("");
      setMessage("");
    } catch (error) {
      // Log de l'erreur détaillée pour le développeur
      console.error("Erreur détaillée lors de l'envoi:", error);
      
      // Message simple pour l'utilisateur
      toast.error("Une erreur est survenue lors de l'envoi. Veuillez réessayer ou me contacter directement par email.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Textarea
          name="message"
          placeholder="Que voulez-vous me dire ?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="border"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer"}
        </Button>
      </motion.div>
    </motion.form>
  );
}
