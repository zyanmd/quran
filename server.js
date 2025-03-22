const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware untuk file statis
app.use(express.static(path.join(__dirname, "public")));

// Endpoint untuk mengambil audio Quran
app.get("/api/quran/:nomor", async (req, res) => {
    const { nomor } = req.params;
    try {
        const url = `https://api.vreden.my.id/api/islami/quranaudio?nomor=${nomor}`;
        const response = await axios.get(url);

        if (response.data && response.data.result) {
            res.json(response.data.result);
        } else {
            res.status(404).json({ message: "Data tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error mengambil data", error: error.message });
    }
});

// Endpoint baru untuk daftar surah
app.get("/api/surah-list", async (req, res) => {
    try {
        const apiUrl = "https://api.vreden.my.id/api/islami/listquran";
        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        };

        const response = await axios.get(apiUrl, { headers });

        if (response.data && response.data.result) {
            res.json(response.data.result);
        } else {
            res.status(404).json({ message: "Data tidak ditemukan atau API berubah." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error mengambil data", error: error.message });
    }
});

// Menyajikan halaman utama
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Ekspor handler agar kompatibel dengan Vercel
module.exports = app;
