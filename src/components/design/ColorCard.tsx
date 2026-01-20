import { toast } from "sonner";
import "../../styles/pages/Design.css"; // Reuse existing styles or create new ones if needed

interface ColorCardProps {
  color: string;
  label: string;
}

export default function ColorCard({ color, label }: ColorCardProps) {

  // Helper function to resolve CSS variables to hex/rgb values if possible,
  // or just use the variable string itself if we can't easily resolve it here without context.
  // For copying, we probably want the actual value.
  // However, since we are passing things like "var(--color-primary)",
  // we might want to get the computed style.
  
  const handleCopy = async () => {
    try {
      // Create a temporary element to resolve the color variable
      const tempEl = document.createElement("div");
      tempEl.style.color = color;
      document.body.appendChild(tempEl);
      const computedColor = getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);

      // Convert rgb to hex for nicer copying if needed, or just copy the computed rgb string
      // Let's copy the variable name if it starts with var, AND the computed value?
      // The prompt asks to copy the "code hexa".
      // Let's try to convert the computed rgb to hex.
      
      const rgbToHex = (rgb: string) => {
        const result = rgb.match(/\d+/g);
        if (!result) return rgb;
        return "#" + result.map(x => parseInt(x).toString(16).padStart(2, '0')).join('').toUpperCase();
      };

      const hexValue = rgbToHex(computedColor);
      
      await navigator.clipboard.writeText(hexValue);
      toast.success(`Couleur copiée : ${hexValue}`);
    } catch (err) {
      console.error("Failed to copy color", err);
      toast.error("Erreur lors de la copie");
    }
  };

  return (
    <div 
      className="color-card" 
      onClick={handleCopy} 
      title="Click to copy Hex code"
      style={{ cursor: "pointer", position: "relative" }}
    >
      <div
        className="color-preview"
        style={{ 
          backgroundColor: color,
          border: label === '--color-background' ? '1px solid var(--gray-200)' : 'none'
        }}
      >
      </div>
      <div className="color-info">
        <code>{label}</code>
      </div>
    </div>
  );
}
