// App State
let currentSection = 'quran';
let currentSurah = null;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let tasbihCount = 0;
let tasbihTarget = 33;
let currentPhrase = 'سبحان الله';
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let quranDataLoaded = null;
let currentAudioPlaylist = [];
let currentPlayingIndex = -1;

// Hadith Collection
const hadiths = [
    {
        text: "خیرکم من تعلم القرآن و علمه",
        translation: "بهترین شما کسی است که قرآن بیاموزد و به دیگران بیاموزاند",
        source: "پیامبر اکرم (ص) - صحیح بخاری"
    },
    {
        text: "من قرأ حرفا من کتاب الله فله به حسنة",
        translation: "هر کس یک حرف از کتاب خدا بخواند برای او یک حسنه است",
        source: "پیامبر اکرم (ص) - جامع ترمذی"
    },
    {
        text: "اقرؤوا القرآن فانه یأتی یوم القیامة شفیعا لاصحابه",
        translation: "قرآن بخوانید که روز قیامت شفیع خوانندگانش خواهد بود",
        source: "پیامبر اکرم (ص) - صحیح مسلم"
    },
    {
        text: "الماهر بالقرآن مع السفرة الکرام البررة",
        translation: "ماهر در قرآن با فرشتگان نیکوکار همراه است",
        source: "پیامبر اکرم (ص) - صحیح بخاری"
    },
    {
        text: "خیر الذکر الخفی و خیر الرزق ما یکفی",
        translation: "بهترین ذکر، ذکر خفی است و بهترین روزی، روزی کافی است",
        source: "امام علی (ع)"
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    loadQuranData();
    loadSurahs();
    loadAudioSurahs();
    initializeAudioPlayer();
    loadRandomHadith();
    initializePrayerTimes();
    initializeTasbih();
    loadBookmarks();
    initializeSearch();
});

// Load Quran Data from JSON
async function loadQuranData() {
    try {
        const response = await fetch('data/quran-data.json');
        quranDataLoaded = await response.json();
    } catch (error) {
        console.error('Error loading Quran data:', error);
        quranDataLoaded = { surahs: {} };
    }
}

// Theme Management
function initializeTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('#themeToggle i').classList.replace('fa-moon', 'fa-sun');
    }
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    const icon = document.querySelector('#themeToggle i');
    if (isDarkMode) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Navigation
function initializeNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
            
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    currentSection = section;
}

// Quran Functions
function loadSurahs() {
    const surahList = document.getElementById('surahList');
    surahList.innerHTML = '';
    
    quranData.surahs.forEach(surah => {
        const card = createSurahCard(surah);
        surahList.appendChild(card);
    });
}

function createSurahCard(surah) {
    const card = document.createElement('div');
    card.className = 'surah-card';
    card.innerHTML = `
        <div class="surah-card-header">
            <div class="surah-number">${surah.number}</div>
            <div class="surah-type">${surah.type}</div>
        </div>
        <h3 class="surah-name">${surah.name}</h3>
        <p class="surah-translation">${surah.translation}</p>
        <div class="surah-info">
            <span><i class="fas fa-list"></i> ${surah.verses} آیه</span>
            <span><i class="fas fa-book"></i> جزء ${surah.juz}</span>
        </div>
    `;
    
    card.addEventListener('click', () => openSurah(surah));
    return card;
}

async function openSurah(surah) {
    currentSurah = surah;
    document.getElementById('surahList').classList.add('hidden');
    const reader = document.getElementById('quranReader');
    reader.classList.remove('hidden');
    
    document.getElementById('surahTitle').textContent = `${surah.name} - ${surah.translation}`;
    
    // Show loading spinner
    document.getElementById('loadingSpinner').classList.remove('hidden');
    document.getElementById('ayatContainer').innerHTML = '';
    document.getElementById('apiNotice').style.display = 'none';
    
    await loadAyat(surah.number);
}

async function loadAyat(surahNumber) {
    const container = document.getElementById('ayatContainer');
    container.innerHTML = '';
    
    // Wait for data to load
    if (!quranDataLoaded) {
        await loadQuranData();
    }
    
    // Get ayat from loaded data
    const surahData = quranDataLoaded.surahs[surahNumber];
    
    if (surahData && surahData.ayahs) {
        const ayahs = surahData.ayahs;
        
        ayahs.forEach(ayah => {
            const ayahCard = createAyahCard(ayah, surahNumber);
            container.appendChild(ayahCard);
        });
        
        // Show API notice if surah has more than 20 verses
        const totalVerses = quranData.surahs.find(s => s.number === surahNumber).verses;
        if (totalVerses > 20) {
            showApiNotice(surahNumber);
        }
    } else {
        // Fallback: Show API message
        showApiNotice(surahNumber);
    }
    
    // Hide loading spinner
    document.getElementById('loadingSpinner').classList.add('hidden');
}

function showApiNotice(surahNumber) {
    const apiNotice = document.getElementById('apiNotice');
    apiNotice.style.display = 'block';
    
    const apiUrl = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,fa.makarem`;
    document.getElementById('apiUrl').textContent = apiUrl;
}

function copyApiUrl() {
    const apiUrl = document.getElementById('apiUrl').textContent;
    navigator.clipboard.writeText(apiUrl).then(() => {
        alert('✅ لینک API کپی شد!');
    });
}

function createAyahCard(ayah, surahNumber) {
    const card = document.createElement('div');
    card.className = 'ayah-card';
    
    const isBookmarked = bookmarks.some(b => b.surah === surahNumber && b.ayah === ayah.number);
    
    card.innerHTML = `
        <div class="ayah-header">
            <div class="ayah-number">آیه ${ayah.number}</div>
            <div class="ayah-actions">
                <button class="btn-action ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${surahNumber}, ${ayah.number})">
                    <i class="fas fa-bookmark"></i>
                </button>
                <button class="btn-action" onclick="copyAyah(\`${ayah.text}\`)">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
        <div class="ayah-text">${ayah.text}</div>
        <div class="ayah-translation">${ayah.translation}</div>
    `;
    
    return card;
}

document.getElementById('btnBack').addEventListener('click', () => {
    document.getElementById('quranReader').classList.add('hidden');
    document.getElementById('surahList').classList.remove('hidden');
});

// Search Function
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterSurahs(query);
    });
}

function filterSurahs(query) {
    const cards = document.querySelectorAll('.surah-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Bookmark Functions
function toggleBookmark(surah, ayah) {
    const index = bookmarks.findIndex(b => b.surah === surah && b.ayah === ayah);
    
    if (index > -1) {
        bookmarks.splice(index, 1);
    } else {
        const surahData = quranData.surahs.find(s => s.number === surah);
        bookmarks.push({
            surah: surah,
            ayah: ayah,
            surahName: surahData.name,
            timestamp: new Date().toISOString()
        });
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    loadAyat(currentSurah.number);
    loadBookmarks();
}

function loadBookmarks() {
    const container = document.getElementById('bookmarksList');
    container.innerHTML = '';
    
    if (bookmarks.length === 0) {
        container.innerHTML = 
