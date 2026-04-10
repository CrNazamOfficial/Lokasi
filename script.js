const CHAT_API = "https://api-inference.huggingface.co/models/meta-llama/Llama-3-8b";
const CHAT_TOKEN = "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"; // Ganti dengan token HuggingFace Anda

// Image API (Gunakan Replicate API yang Anda berikan)
const IMAGE_API = "https://api.replicate.com/v1/predictions";
const IMAGE_TOKEN = "r8_eUhqqPiGQCkddkDbRpH2LrIsreyegbT0jG2w0";

document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = document.getElementById("chatPrompt").value;
  const chatBox = document.getElementById("chatBox");

  // Tambahkan input user ke chat
  chatBox.innerHTML += `<p><strong>Anda:</strong> ${prompt}</p>`;

  // Kirim ke chat API
  const response = await fetch(CHAT_API, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CHAT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const data = await response.json();
  const reply = data[0].generated_text;

  // Tambahkan reply ke chat
  chatBox.innerHTML += `<p><strong>AI:</strong> ${reply}</p>`;
  document.getElementById("chatPrompt").value = "";
});

document.getElementById("imageForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = document.getElementById("imagePrompt").value;
  const imageResult = document.getElementById("imageResult");

  // Kirim ke Replicate API
  const response = await fetch(IMAGE_API, {
    method: "POST",
    headers: {
      "Authorization": `Token ${IMAGE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c772de353fd5525936f44966877036c7ea5", // Ganti dengan versi model Replicate
      input: { prompt },
    }),
  });

  const data = await response.json();
  const imageUrl = data.output[0];

  // Tampilkan gambar
  imageResult.innerHTML = `<img src="${imageUrl}" alt="Generated Image" />`;
  document.getElementById("imagePrompt").value = "";
});
