// ============================================
// App State - متغیرهای سراسری
// ============================================

let currentSection = 'quran';
let currentSurah = null;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let tasbihCount = 0;
let tasbihTarget = 33;
let currentPhrase = 'سبحان الله';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// متغیرهای سراسری برای pagination آیات
let currentAyahPage = 1;
let ayahsPerPage = 5;
let totalAyahs = [];
let currentLoadedSurah = null;

// متغیرهای پلیر صوتی
let selectedReciter = 'alafasy';
let isPlaying = false;

// ============================================
// Hadith Collection - مجموعه احادیث
// ============================================

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

// ============================================
// Initialize App - مقداردهی اولیه
// ============================================

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

// ============================================
// Welcome Message - پیام خوش‌آمدگویی
// ============================================

function showWelcomeMessage() {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
        setTimeout(() => {
            alert('🕌 به سایت جشنواره قرآنی خوش آمدید!\n\nاز تمام امکانات سایت استفاده کنید:\n✅ خواندن قرآن\n✅ گوش دادن به تلاوت\n✅ نشانک‌گذاری آیات\n✅ تسبیح دیجیتال\n\nموفق باشید 🤲');
            localStorage.setItem('hasVisited', 'true');
        }, 1000);
    }
}

// ============================================
// Theme Management - مدیریت تم
// ============================================

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
    
    showToast(isDarkMode ? '🌙 حالت شب فعال شد' : '☀️ حالت روز فعال شد');
}

// ============================================
// Navigation - ناوبری
// ============================================

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
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
    });
    
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = section;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ============================================
// Quran Functions - توابع قرآن
// ============================================

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// بارگذاری آیات بدون API - فقط از داده‌های محلی
function loadAyat(surahNumber) {
    const container = document.getElementById('ayatContainer');
    if (!container) return;
    
    // ریست کردن pagination
    currentAyahPage = 1;
    currentLoadedSurah = surahNumber;
    
    container.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i>
            <p>در حال بارگذاری آیات...</p>
        </div>
    `;
    
    // استفاده از داده‌های محلی
    setTimeout(() => {
        totalAyahs = sampleAyat[surahNumber] || generateSampleAyat(surahNumber);
        displayAyahPage(1, container, surahNumber);
        
        const surah = quranData.surahs.find(s => s.number === surahNumber);
        if (surah) {
            showToast(`📖 ${totalAyahs.length} آیه از سوره ${surah.name} بارگذاری شد`);
        }
    }, 300);
}

// تولید آیات نمونه
function generateSampleAyat(surahNumber) {
    const surah = quranData.surahs.find(s => s.number === surahNumber);
    if (!surah) return [];
    
    const ayat = [];
    const totalVerses = surah.verses;
    
    // نمونه متن‌های عربی متنوع
    const arabicTemplates = [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ",
        "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ فَصَلِّ لِرَبِّكَ وَانْحَرْ",
        "وَالْعَصْرِ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
        "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ",
        "قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ"
    ];
    
    for (let i = 1; i <= totalVerses; i++) {
        const templateIndex = (surahNumber + i) % arabicTemplates.length;
        
        ayat.push({
            number: i,
            text: `${arabicTemplates[templateIndex]} ﴿${i}﴾`,
            translation: `این متن نمونه ترجمه آیه ${i} از سوره ${surah.name} (${surah.translation}) می‌باشد. این سوره ${surah.type} است و دارای ${surah.verses} آیه می‌باشد و در جزء ${surah.juz} قرآن کریم قرار دارد. برای مشاهده متن دقیق قرآن، می‌توانید از منابع معتبر قرآنی استفاده کنید.`
        });
    }
    
    return ayat;
}

// نمایش صفحه‌بندی آیات
function displayAyahPage(pageNumber, container, surahNumber) {
    const startIndex = (pageNumber - 1) * ayahsPerPage;
    const endIndex = startIndex + ayahsPerPage;
    const pageAyahs = totalAyahs.slice(startIndex, endIndex);
    
    if (pageNumber === 1) {
        container.innerHTML = '';
    } else {
        const oldButton = container.querySelector('.load-more-container');
        if (oldButton) oldButton.remove();
    }
    
    // نمایش آیات
    pageAyahs.forEach(ayah => {
        const ayahCard = createAyahCard(ayah, surahNumber);
        container.appendChild(ayahCard);
    });
    
    // دکمه بارگذاری بیشتر
    if (endIndex < totalAyahs.length) {
        const remainingAyahs = totalAyahs.length - endIndex;
        const nextBatchSize = Math.min(ayahsPerPage, remainingAyahs);
        
        const loadMoreContainer = document.createElement('div');
        loadMoreContainer.className = 'load-more-container';
        loadMoreContainer.innerHTML = `
            <button class="btn-load-more" id="loadMoreAyahs">
                <i class="fas fa-arrow-down"></i>
                بارگذاری ${nextBatchSize} آیه بعدی
                <span class="ayah-counter">(${endIndex} از ${totalAyahs.length})</span>
            </button>
        `;
        container.appendChild(loadMoreContainer);
        
        document.getElementById('loadMoreAyahs').addEventListener('click', () => {
            currentAyahPage++;
            displayAyahPage(currentAyahPage, container, surahNumber);
            showToast(`✅ ${nextBatchSize} آیه بیشتر بارگذاری شد`);
        });
    } else {
        // پایان سوره
        const surah = quranData.surahs.find(s => s.number === surahNumber);
        const endMessage = document.createElement('div');
        endMessage.className = 'end-of-surah';
        endMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>پایان سوره ${surah ? surah.name : surahNumber}</p>
            <p class="surah-stats">تعداد کل آیات: ${totalAyahs.length}</p>
            <button class="btn-back" onclick="document.getElementById('btnBack').click()" style="margin-top: 1rem;">
                <i class="fas fa-arrow-right"></i> بازگشت به لیست سوره‌ها
            </button>
        `;
        container.appendChild(endMessage);
    }
    
    // اسکرول به آیات جدید
    if (pageNumber > 1 && pageAyahs.length > 0) {
        setTimeout(() => {
            const firstNewAyah = container.querySelector(`[data-ayah="${pageAyahs[0].number}"]`);
            if (firstNewAyah) {
                firstNewAyah.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
}

// ساخت کارت آیه
function createAyahCard(ayah, surahNumber) {
    const card = document.createElement('div');
    card.className = 'ayah-card';
    card.setAttribute('data-ayah', ayah.number);
    
    const isBookmarked = bookmarks.some(b => b.surah === surahNumber && b.ayah === ayah.number);
    
    card.innerHTML = `
        <div class="ayah-header">
            <div class="ayah-number">
                <i class="fas fa-bookmark" style="font-size: 0.8rem; margin-left: 0.3rem;"></i>
                آیه ${ayah.number}
            </div>
            <div class="ayah-actions">
                <button class="btn-action ${isBookmarked ? 'bookmarked' : ''}" 
                        onclick="toggleBookmark(${surahNumber}, ${ayah.number})"
                        title="نشانک‌گذاری">
                    <i class="fas fa-bookmark"></i>
                </button>
                <button class="btn-action" 
                        onclick='copyAyahText(${surahNumber}, ${ayah.number})'
                        title="کپی">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="btn-action" 
                        onclick='shareAyahText(${surahNumber}, ${ayah.number})'
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

// دکمه بازگشت
const btnBack = document.getElementById('btnBack');
if (btnBack) {
    btnBack.addEventListener('click', () => {
        const reader = document.getElementById('quranReader');
        const surahList = document.getElementById('surahList');
        
        if (reader && surahList) {
            reader.classList.add('hidden');
            surahList.classList.remove('hidden');
            currentSurah = null;
            totalAyahs = [];
        }
    });
}

// ============================================
// Search Function - جستجو
// ============================================

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
    
    const surahList = document.getElementById('surahList');
    const existingMessage = surahList?.querySelector('.no-results-message');
    
    if (visibleCount === 0 && query !== '') {
        if (!existingMessage && surahList) {
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

// ============================================
// Bookmark Functions - نشانک‌گذاری
// ============================================

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
        
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === 'quran') {
                btn.classList.add('active');
            }
        });
        
        setTimeout(() => {
            openSurah(surah);
            
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

function copyAyahText(surahNumber, ayahNumber) {
    const ayah = totalAyahs.find(a => a.number === ayahNumber);
    if (ayah) {
        const surah = quranData.surahs.find(s => s.number === surahNumber);
        const fullText = `${ayah.text}\n\n${ayah.translation}\n\n📖 ${surah ? surah.name : ''} - آیه ${ayahNumber}\n🕌 سایت جشنواره قرآنی`;
        
        navigator.clipboard.writeText(fullText).then(() => {
            showToast('✅ آیه کپی شد');
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = fullText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('✅ آیه کپی شد');
        });
    }
}

function shareAyahText(surahNumber, ayahNumber) {
    const ayah = totalAyahs.find(a => a.number === ayahNumber);
    if (!ayah) return;
    
    const surah = quranData.surahs.find(s => s.number === surahNumber);
    const shareText = `${ayah.text}\n\n${ayah.translation}\n\n📖 ${surah ? surah.name : ''} - آیه ${ayahNumber}`;
    
    if (navigator.share) {
        navigator.share({
            title: `${surah ? surah.name : ''} - آیه ${ayahNumber}`,
            text: shareText
        }).then(() => {
            showToast('✅ آیه به اشتراک گذاشته شد');
        }).catch(() => {
            copyAyahText(surahNumber, ayahNumber);
        });
    } else {
        copyAyahText(surahNumber, ayahNumber);
    }
}

// برای سازگاری با کدهای قدیمی
function copyAyah(text, translation) {
    const fullText = `${text}\n\n${translation}\n\n📖 قرآن کریم`;
    navigator.clipboard.writeText(fullText).then(() => {
        showToast('✅ متن کپی شد');
    });
}

function shareAyah(text, surahNumber, ayahNumber) {
    const surah = quranData.surahs.find(s => s.number === surahNumber);
    const shareText = `${text}\n\n📖 ${surah ? surah.name : ''} - آیه ${ayahNumber}`;
    
    if (navigator.share) {
        navigator.share({
            title: `${surah ? surah.name : ''} - آیه ${ayahNumber}`,
            text: shareText
        });
    } else {
        copyAyah(text, '');
    }
}

// ============================================
// Audio Player Functions - پخش صوت
// ============================================

function loadAudioSurahs() {
    const select = document.getElementById('audioSurahSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">یک سوره انتخاب کنید...</option>';
    
    quranData.surahs.forEach(surah => {
        const option = document.createElement('option');
        option.value = surah.number;
        option.textContent = `${surah.number}. ${surah.name} - ${surah.translation}`;
        select.appendChild(option);
    });
}

function selectReciter(reciter) {
    selectedReciter = reciter;
    
    document.querySelectorAll('.reciter-card').forEach(card => {
        card.classList.remove('active');
    });
    
    const selectedCard = document.querySelector(`[data-reciter="${reciter}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
    
    const reciterNames = {
        'alafasy': 'مشاری راشد العفاسی',
        'abdulbasit': 'عبدالباسط عبدالصمد'
    };
    
    const currentReciterName = document.getElementById('currentReciterName');
    if (currentReciterName) {
        currentReciterName.textContent = reciterNames[reciter];
    }
    
    const selectedSurah = document.getElementById('audioSurahSelect');
    if (selectedSurah && selectedSurah.value) {
        loadAudioForSurah(parseInt(selectedSurah.value));
    }
    
    showToast(`🎙️ قاری ${reciterNames[reciter]} انتخاب شد`);
}

function loadAudioForSurah(surahNumber) {
    const surah = quranData.surahs.find(s => s.number === surahNumber);
    if (!surah) return;
    
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const currentSurahName = document.getElementById('currentSurahName');
    
    if (!audioPlayer || !audioSource) return;
    
    if (currentSurahName) {
        currentSurahName.innerHTML = `<i class="fas fa-spinner fa-spin"></i> در حال بارگذاری...`;
    }
    
    // URLهای صوتی از CDN معتبر
    const reciterURLs = {
        'alafasy': `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${String(surahNumber).padStart(3, '0')}.mp3`,
        'abdulbasit': `https://download.quranicaudio.com/quran/abdulbaasit_mujawwad/${String(surahNumber).padStart(3, '0')}.mp3`
    };
    
    const audioURL = reciterURLs[selectedReciter];
    
    try {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        
        audioSource.src = audioURL;
        audioPlayer.load();
        
        if (currentSurahName) {
            currentSurahName.textContent = `${surah.name} - ${surah.translation}`;
        }
        
        const audioSurahSelect = document.getElementById('audioSurahSelect');
        if (audioSurahSelect) {
            audioSurahSelect.value = surahNumber;
        }
        
        showToast(`✅ سوره ${surah.name} آماده پخش است`);
        
        console.log('🎧 Audio URL:', audioURL);
        
    } catch (error) {
        console.error('خطا در بارگذاری:', error);
        if (currentSurahName) {
            currentSurahName.textContent = 'خطا در بارگذاری';
        }
        showToast('❌ خطا در بارگذاری صوت');
    }
}

function quickPlaySurah(surahNumber) {
    loadAudioForSurah(surahNumber);
    
    setTimeout(() => {
        const audioBox = document.querySelector('.audio-player-box');
        if (audioBox) {
            audioBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

function startWaveAnimation() {
    const audioPlayer = document.getElementById('audioPlayer');
    const waveBars = document.querySelectorAll('.wave-bar');
    
    if (!audioPlayer || !waveBars.length) return;
    
    audioPlayer.addEventListener('play', () => {
        waveBars.forEach(bar => {
            bar.style.animation = 'wave 1s ease-in-out infinite';
        });
    });
    
    audioPlayer.addEventListener('pause', () => {
        waveBars.forEach(bar => {
            bar.style.animation = 'none';
            bar.style.height = '20px';
        });
    });
    
    audioPlayer.addEventListener('ended', () => {
        waveBars.forEach(bar => {
            bar.style.animation = 'none';
            bar.style.height = '20px';
        });
        showToast('✅ پخش به پایان رسید');
    });
}

function initializeAudioPlayer() {
    loadAudioSurahs();
    startWaveAnimation();
    
    const playbackSpeed = document.getElementById('playbackSpeed');
    const audioPlayer = document.getElementById('audioPlayer');
    
    if (playbackSpeed && audioPlayer) {
        playbackSpeed.addEventListener('change', (e) => {
            audioPlayer.playbackRate = parseFloat(e.target.value);
            showToast(`⚡ سرعت پخش: ${e.target.value}x`);
        });
    }
    
    const audioSurahSelect = document.getElementById('audioSurahSelect');
    if (audioSurahSelect) {
        audioSurahSelect.addEventListener('change', (e) => {
            const surahNumber = parseInt(e.target.value);
            if (surahNumber) {
                loadAudioForSurah(surahNumber);
            }
        });
    }
}

// ============================================
// Hadith Functions - احادیث
// ============================================

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

// ============================================
// Prayer Times Functions - اوقات شرعی
// ============================================

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
        if (timeElements[key] && times[key]) {
            timeElements[key].textContent = times[key];
        }
    });
    
    const cityName = citySelect.options[citySelect.selectedIndex].text;
    showToast(`🕌 اوقات شرعی ${cityName} بارگذاری شد`);
}

// ============================================
// Tasbih Functions - تسبیح دیجیتال
// ============================================

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
    
    loadTasbihState();
}

function incrementTasbih() {
    if (tasbihCount < tasbihTarget) {
        tasbihCount++;
        
        const countDisplay = document.getElementById('tasbihCount');
        if (countDisplay) {
            countDisplay.textContent = tasbihCount;
            countDisplay.style.transform = 'scale(1.2)';
            setTimeout(() => {
                countDisplay.style.transform = 'scale(1)';
            }, 150);
        }
        
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        const btn = document.getElementById('tasbihBtn');
        if (btn) {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 100);
        }
        
        saveTasbihState();
        
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
    const tasbihContainer = document.querySelector('.tasbih-container');
    if (tasbihContainer) {
        tasbihContainer.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            tasbihContainer.style.animation = '';
        }, 500);
    }
    
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
    }
}

// ============================================
// Utility Functions - توابع کمکی
// ============================================

function showToast(message, duration = 3000) {
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

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput && currentSection === 'quran') {
                searchInput.focus();
            }
        }
        
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
        
        if (e.code === 'Space' && currentSection === 'tasbih') {
            e.preventDefault();
            incrementTasbih();
        }
        
        if (e.key === 'Escape') {
            const reader = document.getElementById('quranReader');
            if (reader && !reader.classList.contains('hidden')) {
                document.getElementById('btnBack')?.click();
            }
        }
    });
}

// ============================================
// Export to Global Scope
// ============================================

window.toggleBookmark = toggleBookmark;
window.deleteBookmark = deleteBookmark;
window.goToBookmark = goToBookmark;
window.copyAyah = copyAyah;
window.shareAyah = shareAyah;
window.copyAyahText = copyAyahText;
window.shareAyahText = shareAyahText;
window.selectReciter = selectReciter;
window.quickPlaySurah = quickPlaySurah;
window.loadAudioForSurah = loadAudioForSurah;

console.log('🕌 سایت جشنواره قرآنی آماده است!');
console.log('💡 میانبرهای کیبورد:');
console.log('  Ctrl+K: جستجو');
console.log('  Ctrl+B: نشانک‌ها');
console.log('  Ctrl+T: تسبیح');
console.log('  Space: افزایش شمارنده تسبیح');
console.log('  Escape: بازگشت');
