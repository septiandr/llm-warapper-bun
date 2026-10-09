import OpenApi from "openai";

const openai = new OpenApi({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
});

async function main() {
    const myCode = `
    function hitung(a, b) {
        var hasil = a + b;
        return hasil;
    }`;
    console.log("Code to analyze:", myCode);

    const response = await openai.chat.completions.create({
        model: "gemini-3.8-flash",
        messages: [
            {
                role: "system",
                content: "Beri ulasan yang tegas dan konstruktif, berdasarkan hasil, efektivitas kode, clean code, dan struktur. harus ke point dan jelas. Gunakan bahasa Indonesia."
            },
            {
                role: "user",
                content: "Review kode berikut dan berikan kritik yang membangun:\n" + myCode
            }
        ]
    }).then((res) => res).catch((err) => {
        console.error("Error:", err);
        return null;
    });

    if (!response) {
        console.error("Tidak ada respons dari API.");
        return;
    }
    const hasil = response.choices[0]?.message.content;

}

main();