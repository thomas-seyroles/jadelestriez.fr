import contact from "../assets/images/CONTACT.svg";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Contact() {
  return (
    <section>
      <div className="outer-container">
        <div className="inner-container">
          <img src={contact} alt="Contact" />
          <div className="tabs">
            <span>Email</span>
          </div>
          <form action="">
            <input type="text" placeholder="Email" required />
            <textarea
              name="message"
              placeholder="Que voulez-vous me dire ?"
              rows={4}
              required
            ></textarea>
            <button type="submit">Envoyer</button>
          </form>
          <div className="socials">
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>
      </div>
    </section>
  );
}
