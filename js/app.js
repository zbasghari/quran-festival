// متغیرهای سراسری برای pagination
let currentAyahPage = 1;
let ayahsPerPage = 5;
let totalAyahs = [];
let currentLoadedSurah = null;

// تابع اصلی بارگذاری آیات
async function loadAyat(surahNumber) {
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
    
    try {
        // دریافت از API
        const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,fa.fooladvand`
        );
        
        const data = await response.json();
        
        if (data.code === 200 && data.data && data.data.length >= 2) {
            const arabicSurah = data.data[0];
            const persianSurah = data.data[1];
            
            // ذخیره تمام آیات
            totalAyahs = [];
            for (let i = 0; i < arabicSurah.ayahs.length; i++) {
                totalAyahs.push({
                    number: arabicSurah.ayahs[i].numberInSurah,
                    text: arabicSurah.ayahs[i].text,
                    translation: persianSurah.ayahs[i].text
                });
            }
            
            // نمایش صفحه اول
            displayAyahPage(1, container, surahNumber);
            
        } else {
            throw new Error('خطا در دریافت داده');
        }
        
    } catch (error) {
        console.error('Error loading ayat:', error);
        // استفاده از داده‌های نمونه
        totalAyahs = sampleAyat[surahNumber] || generateSampleAyat(surahNumber);
        displayAyahPage(1, container, surahNumber);
        showToast('⚠️ از داده‌های نمونه استفاده شد');
    }
}

// نمایش یک صفحه از آیات
function displayAyahPage(pageNumber, container, surahNumber) {
    const startIndex = (pageNumber - 1) * ayahsPerPage;
    const endIndex = startIndex + ayahsPerPage;
    const pageAyahs = totalAyahs.slice(startIndex, endIndex);
    
    if (pageNumber === 1) {
        container.innerHTML = '';
    } else {
        // حذف دکمه بارگذاری قبلی
        const oldButton = container.querySelector('.load-more-container');
        if (oldButton) oldButton.remove();
    }
    
    // نمایش آیات
    pageAyahs.forEach(ayah => {
        const ayahCard = createAyahCard(ayah, surahNumber);
        container.appendChild(ayahCard);
    });
    
    // اضافه کردن دکمه بارگذاری بیشتر
    if (endIndex < totalAyahs.length) {
        const loadMoreContainer = document.createElement('div');
        loadMoreContainer.className = 'load-more-container';
        loadMoreContainer.innerHTML = `
            <button class="btn-load-more" id="loadMoreAyahs">
                <i class="fas fa-arrow-down"></i>
                بارگذاری ${Math.min(ayahsPerPage, totalAyahs.length - endIndex)} آیه بعدی
                <span class="ayah-counter">(${endIndex} از ${totalAyahs.length})</span>
            </button>
        `;
        container.appendChild(loadMoreContainer);
        
        // رویداد کلیک
        document.getElementById('loadMoreAyahs').addEventListener('click', () => {
            currentAyahPage++;
            displayAyahPage(currentAyahPage, container, surahNumber);
            showToast(`✅ ${pageAyahs.length} آیه بیشتر بارگذاری شد`);
        });
    } else {
        // پایان آیات
        const endMessage = document.createElement('div');
        endMessage.className = 'end-of-surah';
        endMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>پایان سوره ${quranData.surahs.find(s => s.number === surahNumber)?.name}</p>
            <p class="surah-stats">تعداد کل آیات: ${totalAyahs.length}</p>
        `;
        container.appendChild(endMessage);
    }
    
    // اسکرول به آیه جدید (فقط برای صفحات بعدی)
    if (pageNumber > 1 && pageAyahs.length > 0) {
        setTimeout(() => {
            const firstNewAyah = container.querySelector(`[data-ayah="${pageAyahs[0].number}"]`);
            if (firstNewAyah) {
                firstNewAyah.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
}

// به‌روزرسانی تابع createAyahCard برای data-attribute
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
                        onclick="copyAyah(\`${ayah.text.replace(/`/g, '')}\`, \`${ayah.translation.replace(/`/g, '')}\`)"
                        title="کپی">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="btn-action" 
                        onclick="shareAyah(\`${ayah.text.replace(/`/g, '')}\`, ${surahNumber}, ${ayah.number})"
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
