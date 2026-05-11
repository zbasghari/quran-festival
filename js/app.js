// App State
let currentSection = 'quran';
let currentSurah = null;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let tasbihCount = 0;
let tasbihTarget = 33;
let currentPhrase = 'سبحان الله';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

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
    loadSurahs();
    loadAudioSurahs();
    initializeAudioPlayer();
    loadRandomHadith();
    initializePrayerTimes();
    initializeTasbih();
    loadBookmarks();
    initializeSearch();
});

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

function openSurah(surah) {
    currentSurah = surah;
    document.getElementById('surahList').classList.add('hidden');
    const reader = document.getElementById('quranReader');
    reader.classList.remove('hidden');
    
    document.getElementById('surahTitle').textContent = `${surah.name} - ${surah.translation}`;
    loadAyat(surah.number);
}

function loadAyat(surahNumber) {
    const container = document.getElementById('ayatContainer');
    container.innerHTML = '';
    
    const ayat = sampleAyat[surahNumber] || generateSampleAyat(surahNumber);
    
    ayat.forEach(ayah => {
        const ayahCard = createAyahCard(ayah, surahNumber);
        container.appendChild(ayahCard);
    });
}

function generateSampleAyat(surahNumber) {
    const surah = quranData.surahs.find(s => s.number === surahNumber);
    const ayat = [];
    
    for (let i = 1; i <= Math.min(5, surah.verses); i++) {
        ayat.push({
            number: i,
            text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ - آیه ${i} از سوره ${surah.name}`,
            translation: `این متن نمونه ترجمه آیه ${i} از سوره ${surah.name} می‌باشد. برای دریافت متن کامل قرآن از API قرآن استفاده کنید.`
        });
    }
    
    return ayat;
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
                <button class="btn-action" onclick="copyAyah('${ayah.text}')">
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
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <p>هنوز هیچ نشانکی اضافه نکرده‌اید</p>
            </div>
        `;
        return;
    }
    
    bookmarks.forEach((bookmark, index) => {
        const item = document.createElement('div');
        item.className = 'bookmark-item';
        item.innerHTML = `
            <div class="bookmark-info">
                <h4>${bookmark.surahName} - آیه ${bookmark.ayah}</h4>
                <p>${new Date(bookmark.timestamp).toLocaleDateString('fa-IR')}</p>
            </div>
            <button class="btn-delete" onclick="deleteBookmark(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(item);
    });
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    loadBookmarks();
}

document.getElementById('clearBookmarks').addEventListener('click', () => {
    if (confirm('آیا مطمئن هستید که می‌خواهید تمام نشانک‌ها را پاک کنید؟')) {
        bookmarks = [];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        loadBookmarks();
    }
});

function copyAyah(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('آیه کپی شد');
    });
}

// Audio Player
function loadAudioSurahs() {
    const select = document.getElementById('audioSurahSelect');
    quranData.surahs.forEach(surah => {
        const option = document.createElement('option');
        option.value = surah.number;
        option.textContent = `${surah.number}. ${surah.name} - ${surah.translation}`;
        select.appendChild(option);
    });
}

function initializeAudioPlayer() {
    const reciterSelect = document.getElementById('reciterSelect');
    const surahSelect = document.getElementById('audioSurahSelect');
    
    reciterSelect.addEventListener('change', updateAudio);
    surahSelect.addEventListener('change', updateAudio);
}

function updateAudio() {
    const reciter = document.getElementById('reciterSelect').value;
    const surah = document.getElementById('audioSurahSelect').value;
    const surahData = quranData.surahs.find(s => s.number == surah);
    
    // Sample audio URL (You should use actual Quran API)
    const audioUrl = `https://server8.mp3quran.net/${reciter}/${String(surah).padStart(3, '0')}.mp3`;
    
    document.getElementById('audioSource').src = audioUrl;
    document.getElementById('audioPlayer').load();
    
    document.getElementById('nowPlaying').innerHTML = `
        <i class="fas fa-music"></i>
        <span>در حال پخش: ${surahData.name} - ${surahData.translation}</span>
    `;
}

// Hadith
function loadRandomHadith() {
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    const hadith = hadiths[randomIndex];
    
    document.querySelector('.hadith-content').textContent = hadith.text;
    document.querySelector('.hadith-source').textContent = `📖 ${hadith.source}`;
    
    // Add translation after Arabic text
    const content = document.querySelector('.hadith-content');
    content.innerHTML = `
        ${hadith.text}
        <br><br>
        <em style="font-size: 1.1rem;">${hadith.translation}</em>
    `;
}

document.getElementById('refreshHadith').addEventListener('click', loadRandomHadith);

// Prayer Times
function initializePrayerTimes() {
    const citySelect = document.getElementById('citySelect');
    citySelect.addEventListener('change', updatePrayerTimes);
    updatePrayerTimes();
}

function updatePrayerTimes() {
    const city = document.getElementById('citySelect').value;
    const times = prayerTimesData[city];
    
    document.getElementById('fajr').textContent = times.fajr;
    document.getElementById('sunrise').textContent = times.sunrise;
    document.getElementById('dhuhr').textContent = times.dhuhr;
    document.getElementById('sunset').textContent = times.sunset;
    document.getElementById('maghrib').textContent = times.maghrib;
    document.getElementById('midnight').textContent = times.midnight;
}

// Tasbih
function initializeTasbih() {
    document.getElementById('tasbihBtn').addEventListener('click', incrementTasbih);
    document.getElementById('resetTasbih').addEventListener('click', resetTasbih);
    document.getElementById('targetSelect').addEventListener('change', updateTarget);
    
    document.querySelectorAll('.phrase-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.phrase-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPhrase = btn.dataset.phrase;
            document.getElementById('currentPhrase').textContent = currentPhrase;
            resetTasbih();
        });
    });
}

function incrementTasbih() {
    if (tasbihCount < tasbihTarget) {
        tasbihCount++;
        document.getElementById('tasbihCount').textContent = tasbihCount;
        
        // Vibrate if supported
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Visual feedback
        const btn = document.getElementById('tasbihBtn');
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
        
        // Alert when target reached
        if (tasbihCount === tasbihTarget) {
            setTimeout(() => {
                alert(`✅ به ${tasbihTarget} بار ${currentPhrase} رسیدید! الحمدلله`);
            }, 200);
        }
    }
}

function resetTasbih() {
    tasbihCount = 0;
    document.getElementById('tasbihCount').textContent = tasbihCount;
}

function updateTarget() {
    tasbihTarget = parseInt(document.getElementById('targetSelect').value);
    document.getElementById('tasbihTarget').textContent = tasbihTarget;
    resetTasbih();
}
