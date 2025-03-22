

// Fungsi untuk mengambil dan memutar audio surah
async function getQuranAudio() {
    const nomor = document.getElementById("nomorSurah").value;
    if (!nomor) {
        alert("Masukkan nomor surah!");
        return;
    }

    const info = document.getElementById("info");
    const audioPlayer = document.getElementById("audioPlayer");

    info.innerHTML = "<p>Memuat...</p>";
    audioPlayer.src = "";

    try {
        const response = await fetch(`/api/quran/${nomor}`);
        const data = await response.json();

        if (data.audio) {
            info.innerHTML = `<h2>${data.asma.id.long}</h2><p>${data.tafsir}</p>`;
            audioPlayer.src = data.audio;
            audioPlayer.play();
        } else {
            alert("Audio tidak ditemukan.");
            info.innerHTML = "";
        }
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        info.innerHTML = "<p>Gagal mengambil data.</p>";
    }
}

// Fungsi untuk berpindah halaman
function togglePage(pageId) {
    document.getElementById("audioPage").classList.add("hidden");
    document.getElementById("surahListPage").classList.add("hidden");
    document.getElementById(pageId).classList.remove("hidden");
}

// Dark Mode Toggle
document.getElementById("toggleDarkMode").addEventListener("click", function () {
    const html = document.documentElement;
    const themeToggle = this.querySelector("i");

    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
        themeToggle.classList.replace("fa-sun", "fa-moon");
    } else {
        html.setAttribute("data-theme", "dark");
        themeToggle.classList.replace("fa-moon", "fa-sun");
    }

    localStorage.setItem("theme", html.getAttribute("data-theme"));
});

// Cek tema yang tersimpan
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
const themeIcon = document.querySelector("#toggleDarkMode i");
themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

// Dropdown Menu Toggle
const dropdownBtn = document.querySelector(".dropbtn");
const dropdownMenu = document.querySelector(".dropdown-content");

dropdownBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Cegah event bubbling
    dropdownMenu.classList.toggle("show"); // Toggle dropdown
});

// Tutup dropdown jika klik di luar
document.addEventListener("click", function (event) {
    if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove("show");
    }
});
