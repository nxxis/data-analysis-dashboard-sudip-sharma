import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ImageGeneratorAI() {
  const templates = {
    pantsShirtsForSale: `Design a set of unique, high-quality pants and shirt designs intended for sale online:
    - Style: modern streetwear with clean lines, a mix of casual and premium details
    - Audience: young adults (18-35), unisex, fashion-forward
    - Materials: cotton blends, breathable, soft texture
    - Colors: 3 palettes (neutral earth tones; bold contrast; pastel summer)
    - Patterns: offer both solid, subtle texture options and 3 patterned options (geometric, abstract paint-splatter, botanical)
    - Details: include mockup views (front, back), stitched seams, pockets, and subtle branded label placement
    - Deliverables: provide 4 distinct design variations for pants and 4 for shirts, each with a 1024x1024 PNG, transparent background; include a short text description and 3 product keywords
    - Tone: photorealistic product mockup with clean studio lighting; show garments on a neutral mannequin or flat-lay
    - Make each design unique and commercially viable; avoid copyrighted logos or existing brand marks.
    `,
    };


  //const [prompt, setPrompt] = useState(templates.pantsShirtsForSale);
  const [isLoading, setIsLoading] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setError(null);
    {/*if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }
      */}
    setIsLoading(true);
    try {
      const res = await fetch("/generate-image", { // relative URL -> same origin
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: templates.pantsShirtsForSale,
          size: "1024x1024" })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }
      const { image } = await res.json();
      setImageDataUrl(image); // data:image/png;base64,...
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to generate image");
      setImageDataUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Generate custom clothing designs with AI
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleGenerateImage} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Image"}
        </Button>
        <Button variant="ghost" onClick={() => { setImageDataUrl(null); setError(null); }}>
          Clear
        </Button>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {imageDataUrl && (
        <div className="mt-4 border rounded p-2">
          <img src={imageDataUrl} alt="Generated" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
}