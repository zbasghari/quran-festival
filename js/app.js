// App State
let currentSection = 'quran';
let currentSurah = null;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let tasbihCount = 0;
let tasbihTarget = 33;
let currentPhrase = 'سبحان الله';
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let audioPlaying = false;

// Hadith Collection
const hadiths = [
    {
        text: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        translation: "بهترین شما کسی است که قرآن بیاموزد و به دیگران بیاموزاند",
        source: "پیامبر اکرم (ص) - صحیح بخاری"
    },
    {
        text: "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ",
        translation: "هر کس یک حرف از کتاب خدا بخواند برای او یک حسنه است و حسنه ده برابر می‌شود",
        source: "پیامبر اکرم (ص) - جامع ترمذی"
    },
    {
        text: "اقْرَؤُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ",
        translation: "قرآن بخوانید که روز قیامت شفیع خوانندگانش خواهد بود",
        source: "پیامبر اکرم (ص) - صحیح مسلم"
    },
    {
        text: "الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ",
        translation: "ماهر در قرآن با فرشتگان نیکوکار و بزرگوار همراه است",
        source: "پیامبر اکرم (ص) - صحیح بخاری"
    },
    {
        text: "خَيْرُ الذِّكْرِ الْخَفِيُّ وَخَيْرُ الرِّزْقِ مَا يَكْفِي",
        translation: "بهترین ذکر، ذکر پنهانی است و بهترین روزی، روزی کافی است",
        source: "امام علی (ع)"
    },
    {
        text: "إِنَّ هَذَا الْقُرْآنَ مَأْدُبَةُ اللَّهِ فَتَعَلَّمُوا مِنْ مَأْدُبَتِهِ مَا اسْتَطَعْتُمْ",
        translation: "این قرآن سفره خدا است، پس از سفره او تا می‌توانید فرا بگیرید",
        source: "پیامبر اکرم (ص)"
    },
    {
        text: "مَن قَرَأَ الْقُرْآنَ وَعَمِلَ بِمَا فِيهِ أُلْبِسَ وَالِدَاهُ تَاجًا يَوْمَ الْقِيَامَةِ",
        translation: "کسی که قرآن بخواند و به آن عمل کند، روز قیامت به پدر و مادرش تاج بزرگواری داده می‌شود",
        source: "پیامبر اکرم (ص) - حاکم نیشابوری"
    },
    {
        text: "أَفْضَلُ الْعِبَادَةِ قِرَاءَةُ الْقُرْآنِ",
        translation: "بهترین عبادت خواندن قرآن است",
        source: "پیامبر اکرم (ص)"
    },
    {
        text: "الْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ",
        translation: "قرآن یا به نفع تو حجت است یا بر علیه تو",
        source: "پیامبر اکرم (ص) - صحیح مسلم"
    },
    {
        text: "لَا حَسَدَ إِلَّا فِي اثْنَتَيْنِ رَجُلٌ آتَاهُ اللَّهُ الْقُرْآنَ فَهُوَ يَقُومُ بِهِ آنَاءَ اللَّيْلِ وَآنَاءَ النَّهَارِ",
        translation: "رشک بردن جز در دو مورد جایز نیست: مردی که خدا قرآن به او داده و شب و روز آن را می‌خواند",
        source: "پیامبر اکرم (ص) - صحیح بخاری"
    }
];

// Tasbih Phrases with meanings
const tasbihPhrases = {
    'سبحان الله': 'منزه است خداوند',
    'الحمدلله': 'ستایش مخصوص خداست',
    'الله اکبر': 'خدا بزرگتر است',
    'لا اله الا الله': 'هیچ معبودی جز الله نیست'
};

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
    setupKeyboardShortcuts();
    showWelcomeMessage();
});

// Welcome Message
function showWelcomeMessage() {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
        setTimeout(() => {
            alert('🕌 به سایت جشنواره قرآنی خوش آمدید!\n\nاز تمام امکانات سایت استفاده کنید:\n✅ خواندن قرآن\n✅ گوش دادن به تلاوت\n✅ نشانک‌گذاری آیات\n✅ تسبیح دیجیتال\n\nموفق باشید 🤲');
            localStorage.setItem('hasVisited', 'true');
        }, 1000);
    }
}

// Theme Management
function initializeTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Visual feedback
    showToast(isDarkMode ? '🌙 حالت شب فعال شد' : '☀️ حالت روز فعال شد');
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
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = section;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Quran Functions
function loadSurahs() {
    const surahList = document.getElementById('surahList');
    if (!surahList) return;
    
    surahList.innerHTML = '';
    
    quranData.surahs.forEach(surah => {
        const card = createSurahCard(surah);
        surahList.appendChild(card);
    });
}

function createSurahCard(surah) {
    const card = document.createElement('div');
    card.className = 'surah-card';
    card.setAttribute('data-surah', surah.number);
    
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
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
    
    return card;
}

function openSurah(surah) {
    currentSurah = surah;
    
    const surahList = document.getElementById('surahList');
    const reader = document.getElementById('quranReader');
    
    if (surahList && reader) {
        surahList.classList.add('hidden');
        reader.classList.remove('hidden');
        
        const surahTitle = document.getElementById('surahTitle');
        if (surahTitle) {
            surahTitle.textContent = `سورۀ ${surah.name} - ${surah.translation}`;
        }
        
        loadAyat(surah.number);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// جایگزین تابع loadAyat در app.js
async function loadAyat(surahNumber) {
    const container = document.getElementById('ayatContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">در حال بارگذاری آیات...</div>';
    
    try {
        // استفاده از API واقعی قرآن
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,fa.fooladvand`);
        const data = await response.json();
        
        if (data.code === 200 && data.data && data.data.length >= 2) {
            container.innerHTML = '';
            
            const arabicSurah = data.data[0];
            const persianSurah = data.data[1];
            
            // نمایش آیات
            for (let i = 0; i < arabicSurah.ayahs.length; i++) {
                const arabicAyah = arabicSurah.ayahs[i];
                const persianAyah = persianSurah.ayahs[i];
                
                const ayahData = {
                    number: arabicAyah.numberInSurah,
                    text: arabicAyah.text,
                    translation: persianAyah.text
                };
                
                const ayahCard = createAyahCard(ayahData, surahNumber);
                container.appendChild(ayahCard);
            }
            
            showToast(`✅ ${arabicSurah.ayahs.length} آیه بارگذاری شد`);
        } else {
            throw new Error('خطا در دریافت داده');
        }
        
    } catch (error) {
        console.error('Error loading ayat:', error);
        
        // در صورت خطا، از داده‌های نمونه استفاده کن
        container.innerHTML = '';
        const ayat = sampleAyat[surahNumber] || generateSampleAyat(surahNumber);
        
        ayat.forEach(ayah => {
            const ayahCard = createAyahCard(ayah, surahNumber);
            container.appendChild(ayahCard);
        });
        
        showToast('⚠️ از داده‌های نمونه استفاده شد');
    }
}

function generateSampleAyat(surahNumber) {
    const surah = quranData.surahs.find(s => s.number === surahNumber);
    if (!surah) return [];
    
    const ayat = [];
    const maxAyat = Math.min(10, surah.verses);
    
    // نمونه متن‌های عربی متنوع برای هر سوره
    const arabicSamples = [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "اللَّهُ الصَّمَدُ",
        "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
        "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
        "وَالْعَصْرِ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
        "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ"
    ];
    
    for (let i = 1; i <= maxAyat; i++) {
        // استفاده از شماره سوره برای ایجاد تنوع
        const sampleIndex = (surahNumber + i - 1) % arabicSamples.length;
        
        ayat.push({
            number: i,
            text: `${arabicSamples[sampleIndex]} ﴿${i}﴾`,
            translation: `این متن نمونه ترجمه آیه ${i} از سوره ${surah.name} (${surah.translation}) می‌باشد. این سوره ${surah.type} است و ${surah.verses} آیه دارد. برای مشاهده متن کامل و دقیق قرآن کریم، از API قرآن استفاده کنید.`
        });
    }
    
    return ayat;
}

function generateArabicSample(ayahNumber) {
    const samples = [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "الرَّحْمَٰنِ الرَّحِيمِ",
        "مَالِكِ يَوْمِ الدِّينِ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
        "غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
        "فَصَلِّ لِرَبِّكَ وَانْحَرْ"
    ];
    
    return samples[ayahNumber % samples.length] + ` ﴿${ayahNumber}﴾`;
}

function createAyahCard(ayah, surahNumber) {
    const card = document.createElement('div');
    card.className = 'ayah-card';
    card.setAttribute('data-ayah', ayah.number);
    
    const isBookmarked = bookmarks.some(b => b.surah === surahNumber && b.ayah === ayah.number);
    
    card.innerHTML = `
        <div class="ayah-header">
            <div class="ayah-number">آیه ${ayah.number}</div>
            <div class="ayah-actions">
                <button class="btn-action ${isBookmarked ? 'bookmarked' : ''}" 
                        onclick="toggleBookmark(${surahNumber}, ${ayah.number})"
                        title="نشانک‌گذاری">
                    <i class="fas fa-bookmark"></i>
                </button>
                <button class="btn-action" 
                        onclick="copyAyah(\`${ayah.text}\`, \`${ayah.translation}\`)"
                        title="کپی">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="btn-action" 
                        onclick="shareAyah(\`${ayah.text}\`, ${surahNumber}, ${ayah.number})"
                        title="اشتراک‌گذاری">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
        </div>
        <div class="ayah-text">${ayah.text}</div>
        <div class="ayah-translation">${ayah.translation}</div>
    `;
    
    return card;
}

// Back button handler
const btnBack = document.getElementById('btnBack');
if (btnBack) {
    btnBack.addEventListener('click', () => {
        const reader = document.getElementById('quranReader');
        const surahList = document.getElementById('surahList');
        
        if (reader && surahList) {
            reader.classList.add('hidden');
            surahList.classList.remove('hidden');
            currentSurah = null;
        }
    });
}

// Search Function
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            filterSurahs(query);
        }, 300);
    });
    
    // Clear search on Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            filterSurahs('');
        }
    });
}

function filterSurahs(query) {
    const cards = document.querySelectorAll('.surah-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const surahNumber = card.getAttribute('data-surah');
        
        if (query === '' || text.includes(query) || surahNumber === query) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no results
    const surahList = document.getElementById('surahList');
    const existingMessage = surahList.querySelector('.no-results-message');
    
    if (visibleCount === 0 && query !== '') {
        if (!existingMessage) {
            const message = document.createElement('div');
            message.className = 'no-results-message empty-state';
            message.innerHTML = `
                <i class="fas fa-search"></i>
                <p>سوره‌ای با عبارت "${query}" یافت نشد</p>
            `;
            surahList.appendChild(message);
        }
    } else if (existingMessage) {
        existingMessage.remove();
    }
}

// Bookmark Functions
function toggleBookmark(surah, ayah) {
    const index = bookmarks.findIndex(b => b.surah === surah && b.ayah === ayah);
    
    if (index > -1) {
        bookmarks.splice(index, 1);
        showToast('🔖 نشانک حذف شد');
    } else {
        const surahData = quranData.surahs.find(s => s.number === surah);
        bookmarks.push({
            surah: surah,
            ayah: ayah,
            surahName: surahData ? surahData.name : `سوره ${surah}`,
            timestamp: new Date().toISOString()
        });
        showToast('✅ نشانک اضافه شد');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    if (currentSurah) {
        loadAyat(currentSurah.number);
    }
    
    loadBookmarks();
}

function loadBookmarks() {
    const container = document.getElementById('bookmarksList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (bookmarks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <p>هنوز هیچ نشانکی اضافه نکرده‌اید</p>
                <p style="font-size: 0.9rem; color: var(--text-light); margin-top: 0.5rem;">
                    برای افزودن نشانک، روی آیکون نشانک در کنار آیات کلیک کنید
                </p>
            </div>
        `;
        return;
    }
    
    // Sort bookmarks by date (newest first)
    const sortedBookmarks = [...bookmarks].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    sortedBookmarks.forEach((bookmark, index) => {
        const originalIndex = bookmarks.findIndex(b => 
            b.surah === bookmark.surah && b.ayah === bookmark.ayah
        );
        
        const item = document.createElement('div');
        item.className = 'bookmark-item';
        
        const date = new Date(bookmark.timestamp);
        const formattedDate = date.toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        item.innerHTML = `
            <div class="bookmark-info">
                <h4><i class="fas fa-book-open"></i> ${bookmark.surahName} - آیه ${bookmark.ayah}</h4>
                <p><i class="fas fa-calendar"></i> ${formattedDate}</p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn-action" onclick="goToBookmark(${bookmark.surah}, ${bookmark.ayah})" title="مشاهده">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-delete" onclick="deleteBookmark(${originalIndex})">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function deleteBookmark(index) {
    if (confirm('آیا مطمئن هستید که می‌خواهید این نشانک را حذف کنید؟')) {
        const bookmark = bookmarks[index];
        bookmarks.splice(index, 1);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        loadBookmarks();
        
        if (currentSurah) {
            loadAyat(currentSurah.number);
        }
        
        showToast('🗑️ نشانک حذف شد');
    }
}

function goToBookmark(surahNumber, ayahNumber) {
    const surah = quranData.surahs.find(s => s.number === surahNumber);
    if (surah) {
        switchSection('quran');
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === 'quran') {
                btn.classList.add('active');
            }
        });
        
        // Open surah
        setTimeout(() => {
            openSurah(surah);
            
            // Scroll to ayah after a delay
            setTimeout(() => {
                const ayahCard = document.querySelector(`[data-ayah="${ayahNumber}"]`);
                if (ayahCard) {
                    ayahCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    ayahCard.style.background = 'var(--accent-color)';
                    ayahCard.style.transition = 'background 0.3s';
                    
                    setTimeout(() => {
                        ayahCard.style.background = '';
                    }, 2000);
                }
            }, 600);
        }, 100);
    }
}

const clearBookmarksBtn = document.getElementById('clearBookmarks');
if (clearBookmarksBtn) {
    clearBookmarksBtn.addEventListener('click', () => {
        if (bookmarks.length === 0) {
            showToast('⚠️ هیچ نشانکی برای حذف وجود ندارد');
            return;
        }
        
        if (confirm(`آیا مطمئن هستید که می‌خواهید تمام ${bookmarks.length} نشانک را حذف کنید؟`)) {
            bookmarks = [];
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            loadBookmarks();
            
            if (currentSurah) {
                loadAyat(currentSurah.number);
            }
            
            showToast('🗑️ تمام نشانک‌ها حذف شدند');
        }
    });
}

function copyAyah(text, translation) {
    const fullText = `${text}\n\n${translation}\n\n📖 قرآن کریم - سایت جشنواره قرآنی`;
    
    navigator.clipboard.writeText(fullText).then(() => {
        showToast('✅ آیه کپی شد');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = fullText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('✅ آیه کپی شد');
    });
}

function shareAyah(text, surahNumber, ayahNumber) {
    const surah = quranData.surahs.find(s => s.number === surahNumber);
    const shareText = `${text}\n\n📖 ${surah.name} - آیه ${ayahNumber}\n🕌 سایت جشنواره قرآنی`;
    
    if (navigator.share) {
        navigator.share({
            title: `${surah.name} - آیه ${ayahNumber}`,
            text: shareText
        }).then(() => {
            showToast('✅ آیه به اشتراک گذاشته شد');
        }).catch(() => {
            copyAyah(text, '');
        });
    } else {
        copyAyah(text, '');
    }
}

// Audio Player
function loadAudioSurahs() {
    const select = document.getElementById('audioSurahSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">انتخاب سوره...</option>';
    
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
    const audioPlayer = document.getElementById('audioPlayer');
    
    if (reciterSelect) {
        reciterSelect.addEventListener('change', updateAudio);
    }
    
    if (surahSelect) {
        surahSelect.addEventListener('change', updateAudio);
    }
    
    if (audioPlayer) {
        audioPlayer.addEventListener('play', () => {
            audioPlaying = true;
        });
        
        audioPlayer.addEventListener('pause', () => {
            audioPlaying = false;
        });
        
        audioPlayer.addEventListener('ended', () => {
            audioPlaying = false;
            showToast('✅ تلاوت به پایان رسید');
        });
        
        audioPlayer.addEventListener('error', () => {
            showToast('⚠️ خطا در بارگذاری صدا');
        });
    }
}

// جایگزینی کامل تابع updateAudio
async function updateAudio() {
    const reciterSelect = document.getElementById('reciterSelect');
    const surahSelect = document.getElementById('audioSurahSelect');
    
    if (!reciterSelect || !surahSelect) return;
    
    const reciter = reciterSelect.value;
    const surahNumber = parseInt(surahSelect.value);
    
    if (!reciter || !surahNumber) {
        showToast('⚠️ لطفا قاری و سوره را انتخاب کنید');
        return;
    }
    
    const surah = quranData.surahs.find(s => s.number === surahNumber);
    if (!surah) return;
    
    // نمایش لودینگ
    const nowPlaying = document.getElementById('nowPlaying');
    if (nowPlaying) {
        nowPlaying.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>در حال بارگذاری...</span>
        `;
    }
    
    // لیست URLهای ممکن
    const possibleURLs = [
        // منبع اصلی
        `https://server8.mp3quran.net/${getReciterCode(reciter)}/${String(surahNumber).padStart(3, '0')}.mp3`,
        
        // منبع جایگزین 1
        `https://cdn.islamic.network/quran/audio/128/${getAPIReciterCode(reciter)}/${String(surahNumber).padStart(3, '0')}.mp3`,
        
        // منبع جایگزین 2 (پیش‌فرض: العفاسی)
        `https://server8.mp3quran.net/afs/${String(surahNumber).padStart(3, '0')}.mp3`
    ];
    
    // امتحان کردن URLها
    let audioLoaded = false;
    
    for (let i = 0; i < possibleURLs.length; i++) {
        const url = possibleURLs[i];
        console.log(`🎧 Trying URL ${i + 1}:`, url);
        
        const success = await loadAudioSource(url, surah, reciter, i === possibleURLs.length - 1);
        
        if (success) {
            audioLoaded = true;
            break;
        }
    }
    
    if (!audioLoaded) {
        showToast('❌ متاسفانه صوت این سوره در دسترس نیست');
        if (nowPlaying) {
            nowPlaying.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <span>خطا در بارگذاری صوت</span>
            `;
        }
    }
}

// تابع بارگذاری منبع صوتی
function loadAudioSource(url, surah, reciter, isLastAttempt) {
    return new Promise((resolve) => {
        const audioSource = document.getElementById('audioSource');
        const audioPlayer = document.getElementById('audioPlayer');
        
        if (!audioSource || !audioPlayer) {
            resolve(false);
            return;
        }
        
        // متوقف کردن پخش قبلی
        audioPlayer.pause();
        
        // تنظیم منبع جدید
        audioSource.src = url;
        audioPlayer.load();
        
        // تایمر timeout
        const timeout = setTimeout(() => {
            console.log('⏱️ Timeout for:', url);
            resolve(false);
        }, 5000); // 5 ثانیه timeout
        
        // رویداد موفقیت
        const onSuccess = () => {
            clearTimeout(timeout);
            console.log('✅ Audio loaded:', url);
            
            const nowPlaying = document.getElementById('nowPlaying');
            if (nowPlaying) {
                nowPlaying.innerHTML = `
                    <i class="fas fa-music"></i>
                    <span>آماده پخش: ${surah.name} - ${surah.translation} | قاری: ${getReciterName(reciter)}</span>
                `;
            }
            
            showToast(`🎧 ${surah.name} آماده پخش است`);
            audioPlayer.removeEventListener('loadeddata', onSuccess);
            audioPlayer.removeEventListener('error', onError);
            resolve(true);
        };
        
        // رویداد خطا
        const onError = () => {
            clearTimeout(timeout);
            console.log('❌ Audio error:', url);
            audioPlayer.removeEventListener('loadeddata', onSuccess);
            audioPlayer.removeEventListener('error', onError);
            resolve(false);
        };
        
        audioPlayer.addEventListener('loadeddata', onSuccess, { once: true });
        audioPlayer.addEventListener('error', onError, { once: true });
    });
}

// کدهای قاریان برای سرورهای مختلف
function getReciterCode(reciter) {
    const codes = {
        'abdulbasit': 'bst',
        'minshawi': 'mns',
        'husary': 'hsr',
        'afasy': 'afs',
        'sudais': 'sds',
        'ghamadi': 's_gmd',
        'shuraim': 'shr',
        'ajmi': 'ajm',
        'tablawi': 'tbl'
    };
    return codes[reciter] || 'afs';
}

function getAPIReciterCode(reciter) {
    const codes = {
        'abdulbasit': 'ar.abdulbasitmurattal',
        'minshawi': 'ar.minshawi',
        'husary': 'ar.husary',
        'afasy': 'ar.alafasy',
        'sudais': 'ar.abdurrahmaansudais',
        'ghamadi': 'ar.saadalghamadi',
        'shuraim': 'ar.shaatree',
        'ajmi': 'ar.ahmedajamy',
        'tablawi': 'ar.tablaway'
    };
    return codes[reciter] || 'ar.alafasy';
}

function getReciterName(reciter) {
    const names = {
        'abdulbasit': 'عبدالباسط عبدالصمد',
        'minshawi': 'محمد صدیق المنشاوی',
        'husary': 'محمود خلیل الحصری',
        'afasy': 'مشاری راشد العفاسی',
        'sudais': 'عبدالرحمن السدیس',
        'ghamadi': 'سعد الغامدی',
        'shuraim': 'سعود الشریم',
        'ajmi': 'احمد العجمی',
        'tablawi': 'محمد محمود الطبلاوی'
    };
    return names[reciter] || 'مشاری راشد العفاسی';
}

// Hadith Functions
function loadRandomHadith() {
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    const hadith = hadiths[randomIndex];
    
    const hadithContent = document.querySelector('.hadith-content');
    
    if (hadithContent) {
        hadithContent.innerHTML = `
            <p style="font-size: 1.4rem; line-height: 2.2; margin-bottom: 1.5rem; text-align: justify;">
                ${hadith.text}
            </p>
            <p style="font-size: 1.1rem; line-height: 1.8; font-style: italic; opacity: 0.95;">
                ${hadith.translation}
            </p>
        `;
    }
    
    const hadithSource = document.querySelector('.hadith-source');
    if (hadithSource) {
        hadithSource.innerHTML = `<i class="fas fa-book"></i> ${hadith.source}`;
    }
}

const refreshHadithBtn = document.getElementById('refreshHadith');
if (refreshHadithBtn) {
    refreshHadithBtn.addEventListener('click', () => {
        loadRandomHadith();
        showToast('🔄 حدیث جدید بارگذاری شد');
    });
}

// Prayer Times Functions
function initializePrayerTimes() {
    const citySelect = document.getElementById('citySelect');
    if (citySelect) {
        citySelect.addEventListener('change', updatePrayerTimes);
        updatePrayerTimes();
    }
}

function updatePrayerTimes() {
    const citySelect = document.getElementById('citySelect');
    if (!citySelect) return;
    
    const city = citySelect.value;
    const times = prayerTimesData[city];
    
    if (!times) return;
    
    const timeElements = {
        fajr: document.getElementById('fajr'),
        sunrise: document.getElementById('sunrise'),
        dhuhr: document.getElementById('dhuhr'),
        sunset: document.getElementById('sunset'),
        maghrib: document.getElementById('maghrib'),
        midnight: document.getElementById('midnight')
    };
    
    Object.keys(timeElements).forEach(key => {
        if (timeElements[key]) {
            timeElements[key].textContent = times[key];
        }
    });
    
    const cityName = citySelect.options[citySelect.selectedIndex].text;
    showToast(`🕌 اوقات شرعی ${cityName} بارگذاری شد`);
}

// Tasbih Functions
function initializeTasbih() {
    const tasbihBtn = document.getElementById('tasbihBtn');
    const resetBtn = document.getElementById('resetTasbih');
    const targetSelect = document.getElementById('targetSelect');
    const phraseButtons = document.querySelectorAll('.phrase-btn');
    
    if (tasbihBtn) {
        tasbihBtn.addEventListener('click', incrementTasbih);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetTasbih);
    }
    
    if (targetSelect) {
        targetSelect.addEventListener('change', updateTarget);
    }
    
    phraseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            phraseButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPhrase = btn.dataset.phrase;
            
            const phraseDisplay = document.getElementById('currentPhrase');
            if (phraseDisplay) {
                phraseDisplay.textContent = currentPhrase;
            }
            
            resetTasbih();
            showToast(`📿 ${currentPhrase}`);
        });
    });
    
    // Load saved tasbih state
    loadTasbihState();
}

function incrementTasbih() {
    if (tasbihCount < tasbihTarget) {
        tasbihCount++;
        
        const countDisplay = document.getElementById('tasbihCount');
        if (countDisplay) {
            countDisplay.textContent = tasbihCount;
            
            // Animate count
            countDisplay.style.transform = 'scale(1.2)';
            setTimeout(() => {
                countDisplay.style.transform = 'scale(1)';
            }, 150);
        }
        
        // Vibrate if supported
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Visual feedback on button
        const btn = document.getElementById('tasbihBtn');
        if (btn) {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 100);
        }
        
        // Save state
        saveTasbihState();
        
        // Check if target reached
        if (tasbihCount === tasbihTarget) {
            setTimeout(() => {
                playCompletionEffect();
                
                if (confirm(`✅ تبریک! به ${tasbihTarget} بار ${currentPhrase} رسیدید!\n\nالحمدلله 🤲\n\nآیا می‌خواهید از نو شروع کنید؟`)) {
                    resetTasbih();
                }
            }, 200);
        }
    }
}

function resetTasbih() {
    tasbihCount = 0;
    
    const countDisplay = document.getElementById('tasbihCount');
    if (countDisplay) {
        countDisplay.textContent = tasbihCount;
    }
    
    saveTasbihState();
    showToast('🔄 تسبیح ریست شد');
}

function updateTarget() {
    const targetSelect = document.getElementById('targetSelect');
    if (!targetSelect) return;
    
    tasbihTarget = parseInt(targetSelect.value);
    
    const targetDisplay = document.getElementById('tasbihTarget');
    if (targetDisplay) {
        targetDisplay.textContent = tasbihTarget;
    }
    
    resetTasbih();
    saveTasbihState();
    showToast(`🎯 هدف: ${tasbihTarget} بار`);
}

function saveTasbihState() {
    const state = {
        count: tasbihCount,
        target: tasbihTarget,
        phrase: currentPhrase
    };
    localStorage.setItem('tasbihState', JSON.stringify(state));
}

function loadTasbihState() {
    const saved = localStorage.getItem('tasbihState');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            tasbihCount = state.count || 0;
            tasbihTarget = state.target || 33;
            currentPhrase = state.phrase || 'سبحان الله';
            
            const countDisplay = document.getElementById('tasbihCount');
            if (countDisplay) countDisplay.textContent = tasbihCount;
            
            const targetDisplay = document.getElementById('tasbihTarget');
            if (targetDisplay) targetDisplay.textContent = tasbihTarget;
            
            const targetSelect = document.getElementById('targetSelect');
            if (targetSelect) targetSelect.value = tasbihTarget;
            
            const currentPhraseDisplay = document.getElementById('currentPhrase');
            if (currentPhraseDisplay) currentPhraseDisplay.textContent = currentPhrase;
            
            // Update active phrase button
            document.querySelectorAll('.phrase-btn').forEach(btn => {
                if (btn.dataset.phrase === currentPhrase) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        } catch (e) {
            console.error('Error loading tasbih state:', e);
        }
    }
}

function playCompletionEffect() {
    // Visual celebration
    const tasbihContainer = document.querySelector('.tasbih-container');
    if (tasbihContainer) {
        tasbihContainer.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            tasbihContainer.style.animation = '';
        }, 500);
    }
    
    // Vibrate pattern
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
    }
}

// Utility Functions
function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Vazirmatn', sans-serif;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput && currentSection === 'quran') {
                searchInput.focus();
            }
        }
        
        // Ctrl/Cmd + B: Go to bookmarks
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            switchSection('bookmarks');
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.section === 'bookmarks') {
                    btn.classList.add('active');
                }
            });
        }
        
        // Ctrl/Cmd + T: Go to tasbih
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            switchSection('tasbih');
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.section === 'tasbih') {
                    btn.classList.add('active');
                }
            });
        }
        
        // Space: Increment tasbih (only in tasbih section)
        if (e.code === 'Space' && currentSection === 'tasbih') {
            e.preventDefault();
            incrementTasbih();
        }
        
        // Escape: Go back if in reader
        if (e.key === 'Escape') {
            const reader = document.getElementById('quranReader');
            if (reader && !reader.classList.contains('hidden')) {
                document.getElementById('btnBack')?.click();
            }
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .loading {
        text-align: center;
        padding: 3rem;
        color: var(--text-light);
        font-size: 1.2rem;
    }
    
    .loading::after {
        content: '...';
        animation: dots 1.5s infinite;
    }
    
    @keyframes dots {
        0%, 20% {
            content: '.';
        }
        40% {
            content: '..';
        }
        60%, 100% {
            content: '...';
        }
    }
`;
document.head.appendChild(style);

// Export functions to global scope for onclick handlers
window.toggleBookmark = toggleBookmark;
window.deleteBookmark = deleteBookmark;
window.goToBookmark = goToBookmark;
window.copyAyah = copyAyah;
window.shareAyah = shareAyah;

console.log('🕌 سایت جشنواره قرآنی آماده است!');
console.log('💡 میانبرهای کیبورد:');
console.log('  Ctrl+K: جستجو');
console.log('  Ctrl+B: نشانک‌ها');
console.log('  Ctrl+T: تسبیح');
console.log('  Space: افزایش شمارنده تسبیح');
console.log('  Escape: بازگشت');
