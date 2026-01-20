import { motion } from "motion/react";
import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import Button from "../../ui/Button";
import { Input, Textarea } from "../../ui/Input";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; message?: string } = {};
    let isValid = true;

    // Validation Email
    // "chiffres, lettres min et maj et symbole autorisés" + @ + "caractères autorisés dans le domaine mail" + . + "2 à 4 caractères lettre min uniquement"
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
    if (!email) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
      isValid = false;
    }

    // Validation Message
    if (!message.trim()) {
      newErrors.message = "Le message ne peut pas être vide";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs avant d'envoyer");
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
          type="text" 
          placeholder="Email" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          disabled={isSubmitting}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Textarea
          name="message"
          placeholder="Que voulez-vous me dire ?"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          rows={4}
          disabled={isSubmitting}
          className={errors.message ? "input-error" : ""}
        />
        {errors.message && <span className="field-error">{errors.message}</span>}
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
