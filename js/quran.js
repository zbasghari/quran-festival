// ============================================
// Quran Data - Complete Surah Information
// ============================================

const quranData = {
    surahs: [
        { number: 1, name: "الفاتحه", translation: "گشاینده", type: "مکی", verses: 7, juz: 1, revelation: 5 },
        { number: 2, name: "البقره", translation: "گاو", type: "مدنی", verses: 286, juz: 1, revelation: 87 },
        { number: 3, name: "آل‌عمران", translation: "خاندان عمران", type: "مدنی", verses: 200, juz: 3, revelation: 89 },
        { number: 4, name: "النساء", translation: "زنان", type: "مدنی", verses: 176, juz: 4, revelation: 92 },
        { number: 5, name: "المائده", translation: "سفره", type: "مدنی", verses: 120, juz: 6, revelation: 112 },
        { number: 6, name: "الأنعام", translation: "چارپایان", type: "مکی", verses: 165, juz: 7, revelation: 55 },
        { number: 7, name: "الأعراف", translation: "اعراف", type: "مکی", verses: 206, juz: 8, revelation: 39 },
        { number: 8, name: "الأنفال", translation: "غنائم جنگی", type: "مدنی", verses: 75, juz: 9, revelation: 88 },
        { number: 9, name: "التوبه", translation: "توبه", type: "مدنی", verses: 129, juz: 10, revelation: 113 },
        { number: 10, name: "یونس", translation: "یونس", type: "مکی", verses: 109, juz: 11, revelation: 51 },
        { number: 11, name: "هود", translation: "هود", type: "مکی", verses: 123, juz: 11, revelation: 52 },
        { number: 12, name: "یوسف", translation: "یوسف", type: "مکی", verses: 111, juz: 12, revelation: 53 },
        { number: 13, name: "الرعد", translation: "رعد", type: "مدنی", verses: 43, juz: 13, revelation: 96 },
        { number: 14, name: "ابراهیم", translation: "ابراهیم", type: "مکی", verses: 52, juz: 13, revelation: 72 },
        { number: 15, name: "الحجر", translation: "حجر", type: "مکی", verses: 99, juz: 14, revelation: 54 },
        { number: 16, name: "النحل", translation: "زنبور عسل", type: "مکی", verses: 128, juz: 14, revelation: 70 },
        { number: 17, name: "الإسراء", translation: "شب‌گردی", type: "مکی", verses: 111, juz: 15, revelation: 50 },
        { number: 18, name: "الکهف", translation: "غار", type: "مکی", verses: 110, juz: 15, revelation: 69 },
        { number: 19, name: "مریم", translation: "مریم", type: "مکی", verses: 98, juz: 16, revelation: 44 },
        { number: 20, name: "طه", translation: "طه", type: "مکی", verses: 135, juz: 16, revelation: 45 },
        { number: 21, name: "الأنبیاء", translation: "پیامبران", type: "مکی", verses: 112, juz: 17, revelation: 73 },
        { number: 22, name: "الحج", translation: "حج", type: "مدنی", verses: 78, juz: 17, revelation: 103 },
        { number: 23, name: "المؤمنون", translation: "مؤمنان", type: "مکی", verses: 118, juz: 18, revelation: 74 },
        { number: 24, name: "النور", translation: "نور", type: "مدنی", verses: 64, juz: 18, revelation: 102 },
        { number: 25, name: "الفرقان", translation: "فرقان", type: "مکی", verses: 77, juz: 18, revelation: 42 },
        { number: 26, name: "الشعراء", translation: "شعرا", type: "مکی", verses: 227, juz: 19, revelation: 47 },
        { number: 27, name: "النمل", translation: "مورچگان", type: "مکی", verses: 93, juz: 19, revelation: 48 },
        { number: 28, name: "القصص", translation: "داستان‌ها", type: "مکی", verses: 88, juz: 20, revelation: 49 },
        { number: 29, name: "العنکبوت", translation: "عنکبوت", type: "مکی", verses: 69, juz: 20, revelation: 85 },
        { number: 30, name: "الروم", translation: "روم", type: "مکی", verses: 60, juz: 21, revelation: 84 },
        { number: 31, name: "لقمان", translation: "لقمان", type: "مکی", verses: 34, juz: 21, revelation: 57 },
        { number: 32, name: "السجده", translation: "سجده", type: "مکی", verses: 30, juz: 21, revelation: 75 },
        { number: 33, name: "الأحزاب", translation: "احزاب", type: "مدنی", verses: 73, juz: 21, revelation: 90 },
        { number: 34, name: "سبأ", translation: "سبا", type: "مکی", verses: 54, juz: 22, revelation: 58 },
        { number: 35, name: "فاطر", translation: "فاطر", type: "مکی", verses: 45, juz: 22, revelation: 43 },
        { number: 36, name: "یس", translation: "یس", type: "مکی", verses: 83, juz: 22, revelation: 41 },
        { number: 37, name: "الصافات", translation: "صافات", type: "مکی", verses: 182, juz: 23, revelation: 56 },
        { number: 38, name: "ص", translation: "ص", type: "مکی", verses: 88, juz: 23, revelation: 38 },
        { number: 39, name: "الزمر", translation: "زمر", type: "مکی", verses: 75, juz: 23, revelation: 59 },
        { number: 40, name: "غافر", translation: "غافر", type: "مکی", verses: 85, juz: 24, revelation: 60 },
        { number: 41, name: "فصلت", translation: "فصلت", type: "مکی", verses: 54, juz: 24, revelation: 61 },
        { number: 42, name: "الشوری", translation: "شورا", type: "مکی", verses: 53, juz: 25, revelation: 62 },
        { number: 43, name: "الزخرف", translation: "زخرف", type: "مکی", verses: 89, juz: 25, revelation: 63 },
        { number: 44, name: "الدخان", translation: "دود", type: "مکی", verses: 59, juz: 25, revelation: 64 },
        { number: 45, name: "الجاثیه", translation: "زانو زده", type: "مکی", verses: 37, juz: 25, revelation: 65 },
        { number: 46, name: "الأحقاف", translation: "احقاف", type: "مکی", verses: 35, juz: 26, revelation: 66 },
        { number: 47, name: "محمد", translation: "محمد", type: "مدنی", verses: 38, juz: 26, revelation: 95 },
        { number: 48, name: "الفتح", translation: "پیروزی", type: "مدنی", verses: 29, juz: 26, revelation: 111 },
        { number: 49, name: "الحجرات", translation: "حجرات", type: "مدنی", verses: 18, juz: 26, revelation: 106 },
        { number: 50, name: "ق", translation: "ق", type: "مکی", verses: 45, juz: 26, revelation: 34 },
        { number: 51, name: "الذاریات", translation: "بادهای پراکننده", type: "مکی", verses: 60, juz: 26, revelation: 67 },
        { number: 52, name: "الطور", translation: "طور", type: "مکی", verses: 49, juz: 27, revelation: 76 },
        { number: 53, name: "النجم", translation: "ستاره", type: "مکی", verses: 62, juz: 27, revelation: 23 },
        { number: 54, name: "القمر", translation: "ماه", type: "مکی", verses: 55, juz: 27, revelation: 37 },
        { number: 55, name: "الرحمن", translation: "رحمان", type: "مدنی", verses: 78, juz: 27, revelation: 97 },
        { number: 56, name: "الواقعه", translation: "واقعه", type: "مکی", verses: 96, juz: 27, revelation: 46 },
        { number: 57, name: "الحدید", translation: "آهن", type: "مدنی", verses: 29, juz: 27, revelation: 94 },
        { number: 58, name: "المجادله", translation: "مجادله کننده", type: "مدنی", verses: 22, juz: 28, revelation: 105 },
        { number: 59, name: "الحشر", translation: "حشر", type: "مدنی", verses: 24, juz: 28, revelation: 101 },
        { number: 60, name: "الممتحنه", translation: "زن آزموده شده", type: "مدنی", verses: 13, juz: 28, revelation: 91 },
        { number: 61, name: "الصف", translation: "صف", type: "مدنی", verses: 14, juz: 28, revelation: 109 },
        { number: 62, name: "الجمعه", translation: "جمعه", type: "مدنی", verses: 11, juz: 28, revelation: 110 },
        { number: 63, name: "المنافقون", translation: "منافقان", type: "مدنی", verses: 11, juz: 28, revelation: 104 },
        { number: 64, name: "التغابن", translation: "تغابن", type: "مدنی", verses: 18, juz: 28, revelation: 108 },
        { number: 65, name: "الطلاق", translation: "طلاق", type: "مدنی", verses: 12, juz: 28, revelation: 99 },
        { number: 66, name: "التحریم", translation: "تحریم", type: "مدنی", verses: 12, juz: 28, revelation: 107 },
        { number: 67, name: "الملک", translation: "ملک", type: "مکی", verses: 30, juz: 29, revelation: 77 },
        { number: 68, name: "القلم", translation: "قلم", type: "مکی", verses: 52, juz: 29, revelation: 2 },
        { number: 69, name: "الحاقه", translation: "حاقه", type: "مکی", verses: 52, juz: 29, revelation: 78 },
        { number: 70, name: "المعارج", translation: "معارج", type: "مکی", verses: 44, juz: 29, revelation: 79 },
        { number: 71, name: "نوح", translation: "نوح", type: "مکی", verses: 28, juz: 29, revelation: 71 },
        { number: 72, name: "الجن", translation: "جن", type: "مکی", verses: 28, juz: 29, revelation: 40 },
        { number: 73, name: "المزمل", translation: "جامه به خود پیچیده", type: "مکی", verses: 20, juz: 29, revelation: 3 },
        { number: 74, name: "المدثر", translation: "جامه به خود پیچیده", type: "مکی", verses: 56, juz: 29, revelation: 4 },
        { number: 75, name: "القیامه", translation: "قیامت", type: "مکی", verses: 40, juz: 29, revelation: 31 },
        { number: 76, name: "الإنسان", translation: "انسان", type: "مدنی", verses: 31, juz: 29, revelation: 98 },
        { number: 77, name: "المرسلات", translation: "فرستاده شدگان", type: "مکی", verses: 50, juz: 29, revelation: 33 },
        { number: 78, name: "النبأ", translation: "خبر بزرگ", type: "مکی", verses: 40, juz: 30, revelation: 80 },
        { number: 79, name: "النازعات", translation: "کندگان", type: "مکی", verses: 46, juz: 30, revelation: 81 },
        { number: 80, name: "عبس", translation: "عبوس کرد", type: "مکی", verses: 42, juz: 30, revelation: 24 },
        { number: 81, name: "التکویر", translation: "پیچیده شدن", type: "مکی", verses: 29, juz: 30, revelation: 7 },
        { number: 82, name: "الإنفطار", translation: "شکافتن", type: "مکی", verses: 19, juz: 30, revelation: 82 },
        { number: 83, name: "المطففین", translation: "کم فروشان", type: "مکی", verses: 36, juz: 30, revelation: 86 },
        { number: 84, name: "الإنشقاق", translation: "شکافتن", type: "مکی", verses: 25, juz: 30, revelation: 83 },
        { number: 85, name: "البروج", translation: "برج‌ها", type: "مکی", verses: 22, juz: 30, revelation: 27 },
        { number: 86, name: "الطارق", translation: "ستاره", type: "مکی", verses: 17, juz: 30, revelation: 36 },
        { number: 87, name: "الأعلی", translation: "والا", type: "مکی", verses: 19, juz: 30, revelation: 8 },
        { number: 88, name: "الغاشیه", translation: "حادثه", type: "مکی", verses: 26, juz: 30, revelation: 68 },
        { number: 89, name: "الفجر", translation: "فجر", type: "مکی", verses: 30, juz: 30, revelation: 10 },
        { number: 90, name: "البلد", translation: "شهر", type: "مکی", verses: 20, juz: 30, revelation: 35 },
        { number: 91, name: "الشمس", translation: "خورشید", type: "مکی", verses: 15, juz: 30, revelation: 26 },
        { number: 92, name: "اللیل", translation: "شب", type: "مکی", verses: 21, juz: 30, revelation: 9 },
        { number: 93, name: "الضحی", translation: "چاشتگاه", type: "مکی", verses: 11, juz: 30, revelation: 11 },
        { number: 94, name: "الشرح", translation: "گشایش", type: "مکی", verses: 8, juz: 30, revelation: 12 },
        { number: 95, name: "التین", translation: "انجیر", type: "مکی", verses: 8, juz: 30, revelation: 28 },
        { number: 96, name: "العلق", translation: "خون بسته", type: "مکی", verses: 19, juz: 30, revelation: 1 },
        { number: 97, name: "القدر", translation: "قدر", type: "مکی", verses: 5, juz: 30, revelation: 25 },
        { number: 98, name: "البینه", translation: "بینه", type: "مدنی", verses: 8, juz: 30, revelation: 100 },
        { number: 99, name: "الزلزله", translation: "زلزله", type: "مدنی", verses: 8, juz: 30, revelation: 93 },
        { number: 100, name: "العادیات", translation: "تاختن", type: "مکی", verses: 11, juz: 30, revelation: 14 },
        { number: 101, name: "القارعه", translation: "قارعه", type: "مکی", verses: 11, juz: 30, revelation: 30 },
        { number: 102, name: "التکاثر", translation: "زیادتی", type: "مکی", verses: 8, juz: 30, revelation: 16 },
        { number: 103, name: "العصر", translation: "عصر", type: "مکی", verses: 3, juz: 30, revelation: 13 },
        { number: 104, name: "الهمزه", translation: "همزه", type: "مکی", verses: 9, juz: 30, revelation: 32 },
        { number: 105, name: "الفیل", translation: "فیل", type: "مکی", verses: 5, juz: 30, revelation: 19 },
        { number: 106, name: "قریش", translation: "قریش", type: "مکی", verses: 4, juz: 30, revelation: 29 },
        { number: 107, name: "الماعون", translation: "ماعون", type: "مکی", verses: 7, juz: 30, revelation: 17 },
        { number: 108, name: "الکوثر", translation: "کوثر", type: "مکی", verses: 3, juz: 30, revelation: 15 },
        { number: 109, name: "الکافرون", translation: "کافران", type: "مکی", verses: 6, juz: 30, revelation: 18 },
        { number: 110, name: "النصر", translation: "یاری", type: "مدنی", verses: 3, juz: 30, revelation: 114 },
        { number: 111, name: "المسد", translation: "ریسمان", type: "مکی", verses: 5, juz: 30, revelation: 6 },
        { number: 112, name: "الإخلاص", translation: "اخلاص", type: "مکی", verses: 4, juz: 30, revelation: 22 },
        { number: 113, name: "الفلق", translation: "سپیده‌دم", type: "مکی", verses: 5, juz: 30, revelation: 20 },
        { number: 114, name: "الناس", translation: "مردم", type: "مکی", verses: 6, juz: 30, revelation: 21 }
    ],
    
    // Total statistics
    stats: {
        totalSurahs: 114,
        totalVerses: 6236,
        totalJuz: 30,
        makkiSurahs: 86,
        madaniSurahs: 28
    },
    
    // Helper functions
    getSurahByNumber: function(number) {
        return this.surahs.find(s => s.number === number);
    },
    
    getSurahByName: function(name) {
        return this.surahs.find(s => s.name === name || s.translation.includes(name));
    },
    
    getSurahsByJuz: function(juz) {
        return this.surahs.filter(s => s.juz === juz);
    },
    
    getSurahsByType: function(type) {
        return this.surahs.filter(s => s.type === type);
    },
    
    searchSurahs: function(query) {
        query = query.toLowerCase();
        return this.surahs.filter(s => 
            s.name.toLowerCase().includes(query) ||
            s.translation.toLowerCase().includes(query) ||
            s.number.toString() === query
        );
    }
};

// Sample Ayat for demonstration (Surah Al-Fatiha)
const sampleAyat = {
    1: [
        {
            number: 1,
            text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            translation: "به نام خداوند بخشنده مهربان"
        },
        {
            number: 2,
            text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            translation: "ستایش مخصوص خداوندی است که پروردگار جهانیان است"
        },
        {
            number: 3,
            text: "الرَّحْمَٰنِ الرَّحِيمِ",
            translation: "بخشنده مهربان"
        },
        {
            number: 4,
            text: "مَالِكِ يَوْمِ الدِّينِ",
            translation: "فرمانروای روز جزا"
        },
        {
            number: 5,
            text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
            translation: "تنها تو را می‌پرستیم و تنها از تو یاری می‌جوییم"
        },
        {
            number: 6,
            text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
            translation: "ما را به راه راست هدایت کن"
        },
        {
            number: 7,
            text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
            translation: "راه کسانی که بر آنان نعمت دادی، نه کسانی که مورد غضب قرار گرفتند و نه گمراهان"
        }
    ],
    
    // Sample for other popular surahs
    112: [
        {
            number: 1,
            text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
            translation: "بگو او الله یکتا است"
        },
        {
            number: 2,
            text: "اللَّهُ الصَّمَدُ",
            translation: "الله بی‌نیاز است"
        },
        {
            number: 3,
            text: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
            translation: "نه زاده شده و نه زاده است"
        },
        {
            number: 4,
            text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
            translation: "و هیچ کس همتای او نیست"
        }
    ],
    
    113: [
        {
            number: 1,
            text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
            translation: "بگو پناه می‌برم به پروردگار سپیده دم"
        },
        {
            number: 2,
            text: "مِن شَرِّ مَا خَلَقَ",
            translation: "از شر آنچه آفریده است"
        },
        {
            number: 3,
            text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
            translation: "و از شر تاریکی شب هنگامی که فرا رسد"
        },
        {
            number: 4,
            text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
            translation: "و از شر دمندگان در گره‌ها"
        },
        {
            number: 5,
            text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
            translation: "و از شر حسود هنگامی که حسادت ورزد"
        }
    ],
    
    114: [
        {
            number: 1,
            text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
            translation: "بگو پناه می‌برم به پروردگار مردم"
        },
        {
            number: 2,
            text: "مَلِكِ النَّاسِ",
            translation: "فرمانروای مردم"
        },
        {
            number: 3,
            text: "إِلَٰهِ النَّاسِ",
            translation: "معبود مردم"
        },
        {
            number: 4,
            text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
            translation: "از شر وسوسه‌گر پنهان شونده"
        },
        {
            number: 5,
            text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
            translation: "که در سینه‌های مردم وسوسه می‌کند"
        },
        {
            number: 6,
            text: "مِنَ الْجِنَّةِ وَالنَّاسِ",
            translation: "از جن و انس"
        }
    ]
};

// API Integration Helper (for future use)
const quranAPI = {
    baseURL: 'https://api.alquran.cloud/v1',
    
    // Get surah with translation
    async getSurah(number, edition = 'ar.alafasy') {
        try {
            const response = await fetch(`${this.baseURL}/surah/${number}/${edition}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching surah:', error);
            return null;
        }
    },
    
    // Get specific ayah
    async getAyah(surahNumber, ayahNumber, edition = 'ar.alafasy') {
        try {
            const response = await fetch(`${this.baseURL}/ayah/${surahNumber}:${ayahNumber}/${edition}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching ayah:', error);
            return null;
        }
    },
    
    // Get audio URL
    getAudioURL(surahNumber, reciter = 'ar.alafasy') {
        const paddedNumber = String(surahNumber).padStart(3, '0');
        return `https://cdn.islamic.network/quran/audio/128/${reciter}/${paddedNumber}.mp3`;
    },
    
    // Available editions
    editions: {
        arabic: [
            { identifier: 'ar.alafasy', name: 'مشاری العفاسی', language: 'ar', format: 'audio' },
            { identifier: 'ar.abdulbasitmurattal', name: 'عبدالباسط عبدالصمد', language: 'ar', format: 'audio' },
            { identifier: 'ar.minshawi', name: 'محمد صدیق المنشاوی', language: 'ar', format: 'audio' },
            { identifier: 'ar.husary', name: 'محمود خلیل الحصری', language: 'ar', format: 'audio' }
        ],
        persian: [
            { identifier: 'fa.fooladvand', name: 'فولادوند', language: 'fa', format: 'text' },
            { identifier: 'fa.makarem', name: 'مکارم شیرازی', language: 'fa', format: 'text' }
        ]
    }
};

// Juz information
const juzData = {
    1: { start: { surah: 1, ayah: 1 }, end: { surah: 2, ayah: 141 } },
    2: { start: { surah: 2, ayah: 142 }, end: { surah: 2, ayah: 252 } },
    3: { start: { surah: 2, ayah: 253 }, end: { surah: 3, ayah: 92 } },
    4: { start: { surah: 3, ayah: 93 }, end: { surah: 4, ayah: 23 } },
    5: { start: { surah: 4, ayah: 24 }, end: { surah: 4, ayah: 147 } },
    6: { start: { surah: 4, ayah: 148 }, end: { surah: 5, ayah: 81 } },
    7: { start: { surah: 5, ayah: 82 }, end: { surah: 6, ayah: 110 } },
    8: { start: { surah: 6, ayah: 111 }, end: { surah: 7, ayah: 87 } },
    9: { start: { surah: 7, ayah: 88 }, end: { surah: 8, ayah: 40 } },
    10: { start: { surah: 8, ayah: 41 }, end: { surah: 9, ayah: 92 } },
    11: { start: { surah: 9, ayah: 93 }, end: { surah: 11, ayah: 5 } },
    12: { start: { surah: 11, ayah: 6 }, end: { surah: 12, ayah: 52 } },
    13: { start: { surah: 12, ayah: 53 }, end: { surah: 14, ayah: 52 } },
    14: { start: { surah: 15, ayah: 1 }, end: { surah: 16, ayah: 128 } },
    15: { start: { surah: 17, ayah: 1 }, end: { surah: 18, ayah: 74 } },
    16: { start: { surah: 18, ayah: 75 }, end: { surah: 20, ayah: 135 } },
    17: { start: { surah: 21, ayah: 1 }, end: { surah: 22, ayah: 78 } },
    18: { start: { surah: 23, ayah: 1 }, end: { surah: 25, ayah: 20 } },
    19: { start: { surah: 25, ayah: 21 }, end: { surah: 27, ayah: 55 } },
    20: { start: { surah: 27, ayah: 56 }, end: { surah: 29, ayah: 45 } },
    21: { start: { surah: 29, ayah: 46 }, end: { surah: 33, ayah: 30 } },
    22: { start: { surah: 33, ayah: 31 }, end: { surah: 36, ayah: 27 } },
    23: { start: { surah: 36, ayah: 28 }, end: { surah: 39, ayah: 31 } },
    24: { start: { surah: 39, ayah: 32 }, end: { surah: 41, ayah: 46 } },
    25: { start: { surah: 41, ayah: 47 }, end: { surah: 45, ayah: 37 } },
    26: { start: { surah: 46, ayah: 1 }, end: { surah: 51, ayah: 30 } },
    27: { start: { surah: 51, ayah: 31 }, end: { surah: 57, ayah: 29 } },
    28: { start: { surah: 58, ayah: 1 }, end: { surah: 66, ayah: 12 } },
    29: { start: { surah: 67, ayah: 1 }, end: { surah: 77, ayah: 50 } },
    30: { start: { surah: 78, ayah: 1 }, end: { surah: 114, ayah: 6 } }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { quranData, sampleAyat, quranAPI, juzData };
}

console.log('📖 Quran Data Loaded - 114 Surahs Ready');
