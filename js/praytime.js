// ============================================
// Prayer Times Data and Functions
// ============================================

// Prayer times for major Iranian cities (Sample data - use API for accurate times)
const prayerTimesData = {
    tehran: {
        city: "تهران",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 35.6892,
        longitude: 51.3890,
        fajr: "05:15",
        sunrise: "06:45",
        dhuhr: "12:30",
        asr: "15:45",
        sunset: "18:15",
        maghrib: "18:35",
        isha: "19:55",
        midnight: "00:00",
        lastUpdated: "2024-01-15"
    },
    mashhad: {
        city: "مشهد",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 36.2974,
        longitude: 59.6067,
        fajr: "05:00",
        sunrise: "06:30",
        dhuhr: "12:15",
        asr: "15:30",
        sunset: "18:00",
        maghrib: "18:20",
        isha: "19:40",
        midnight: "23:45",
        lastUpdated: "2024-01-15"
    },
    isfahan: {
        city: "اصفهان",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 32.6546,
        longitude: 51.6680,
        fajr: "05:20",
        sunrise: "06:50",
        dhuhr: "12:35",
        asr: "15:50",
        sunset: "18:20",
        maghrib: "18:40",
        isha: "20:00",
        midnight: "00:05",
        lastUpdated: "2024-01-15"
    },
    shiraz: {
        city: "شیراز",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 29.5918,
        longitude: 52.5836,
        fajr: "05:25",
        sunrise: "06:55",
        dhuhr: "12:40",
        asr: "15:55",
        sunset: "18:25",
        maghrib: "18:45",
        isha: "20:05",
        midnight: "00:10",
        lastUpdated: "2024-01-15"
    },
    tabriz: {
        city: "تبریز",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 38.0667,
        longitude: 46.3000,
        fajr: "05:10",
        sunrise: "06:40",
        dhuhr: "12:25",
        asr: "15:40",
        sunset: "18:10",
        maghrib: "18:30",
        isha: "19:50",
        midnight: "23:55",
        lastUpdated: "2024-01-15"
    },
    qom: {
        city: "قم",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 34.6416,
        longitude: 50.8746,
        fajr: "05:18",
        sunrise: "06:48",
        dhuhr: "12:32",
        asr: "15:47",
        sunset: "18:17",
        maghrib: "18:37",
        isha: "19:57",
        midnight: "00:02",
        lastUpdated: "2024-01-15"
    },
    ahvaz: {
        city: "اهواز",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 31.3183,
        longitude: 48.6706,
        fajr: "05:22",
        sunrise: "06:52",
        dhuhr: "12:37",
        asr: "15:52",
        sunset: "18:22",
        maghrib: "18:42",
        isha: "20:02",
        midnight: "00:07",
        lastUpdated: "2024-01-15"
    },
    yazd: {
        city: "یزد",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 31.8974,
        longitude: 54.3569,
        fajr: "05:23",
        sunrise: "06:53",
        dhuhr: "12:38",
        asr: "15:53",
        sunset: "18:23",
        maghrib: "18:43",
        isha: "20:03",
        midnight: "00:08",
        lastUpdated: "2024-01-15"
    },
    kermanshah: {
        city: "کرمانشاه",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 34.3142,
        longitude: 47.0650,
        fajr: "05:17",
        sunrise: "06:47",
        dhuhr: "12:32",
        asr: "15:47",
        sunset: "18:17",
        maghrib: "18:37",
        isha: "19:57",
        midnight: "00:02",
        lastUpdated: "2024-01-15"
    },
    rasht: {
        city: "رشت",
        country: "ایران",
        timezone: "Asia/Tehran",
        latitude: 37.2808,
        longitude: 49.5832,
        fajr: "05:12",
        sunrise: "06:42",
        dhuhr: "12:27",
        asr: "15:42",
        sunset: "18:12",
        maghrib: "18:32",
        isha: "19:52",
        midnight: "23:57",
        lastUpdated: "2024-01-15"
    }
};

// Prayer names in Persian and Arabic
const prayerNames = {
    fajr: { fa: "اذان صبح", ar: "الفجر", icon: "sun" },
    sunrise: { fa: "طلوع آفتاب", ar: "الشروق", icon: "sunrise" },
    dhuhr: { fa: "اذان ظهر", ar: "الظهر", icon: "sun" },
    asr: { fa: "اذان عصر", ar: "العصر", icon: "cloud-sun" },
    sunset: { fa: "غروب آفتاب", ar: "الغروب", icon: "sunset" },
    maghrib: { fa: "اذان مغرب", ar: "المغرب", icon: "moon" },
    isha: { fa: "اذان عشا", ar: "العشاء", icon: "star" },
    midnight: { fa: "نیمه شب", ar: "نصف الليل", icon: "star" }
};

// Prayer Times API Integration
const prayerTimesAPI = {
    baseURL: 'https://api.aladhan.com/v1',
    
    // Get prayer times by city
    async getByCity(city, country = 'Iran', method = 7) {
        try {
            const response = await fetch(
                `${this.baseURL}/timingsByCity?city=${city}&country=${country}&method=${method}`
            );
            const data = await response.json();
            
            if (data.code === 200) {
                return this.formatResponse(data.data);
            }
            return null;
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            return null;
        }
    },
    
    // Get prayer times by coordinates
    async getByCoordinates(latitude, longitude, method = 7) {
        try {
            const timestamp = Math.floor(Date.now() / 1000);
            const response = await fetch(
                `${this.baseURL}/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}`
            );
            const data = await response.json();
            
            if (data.code === 200) {
                return this.formatResponse(data.data);
            }
            return null;
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            return null;
        }
    },
    
    // Format API response
    formatResponse(data) {
        const timings = data.timings;
        return {
            fajr: this.convertTo12Hour(timings.Fajr),
            sunrise: this.convertTo12Hour(timings.Sunrise),
            dhuhr: this.convertTo12Hour(timings.Dhuhr),
            asr: this.convertTo12Hour(timings.Asr),
            sunset: this.convertTo12Hour(timings.Sunset),
            maghrib: this.convertTo12Hour(timings.Maghrib),
            isha: this.convertTo12Hour(timings.Isha),
            midnight: this.convertTo12Hour(timings.Midnight),
            date: data.date.readable,
            hijri: data.date.hijri.date
        };
    },
    
    // Convert 24-hour to 12-hour format (optional)
    convertTo12Hour(time24) {
        // Remove timezone info if present
        time24 = time24.split(' ')[0];
        return time24; // Keep 24-hour format for Persian users
    },
    
    // Calculation methods
    methods: {
        0: 'Shia Ithna-Ansari',
        1: 'University of Islamic Sciences, Karachi',
        2: 'Islamic Society of North America',
        3: 'Muslim World League',
        4: 'Umm Al-Qura University, Makkah',
        5: 'Egyptian General Authority of Survey',
        7: 'Institute of Geophysics, University of Tehran', // Default for Iran
        8: 'Gulf Region',
        9: 'Kuwait',
        10: 'Qatar',
        11: 'Majlis Ugama Islam Singapura, Singapore',
        12: 'Union Organization islamic de France',
        13: 'Diyanet İşleri Başkanlığı, Turkey',
        14: 'Spiritual Administration of Muslims of Russia'
    }
};

// Calculate next prayer
function getNextPrayer(times) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
        { name: 'fajr', time: times.fajr },
        { name: 'sunrise', time: times.sunrise },
        { name: 'dhuhr', time: times.dhuhr },
        { name: 'asr', time: times.asr },
        { name: 'maghrib', time: times.maghrib },
        { name: 'isha', time: times.isha }
    ];
    
    for (let prayer of prayers) {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerTime = hours * 60 + minutes;
        
        if (prayerTime > currentTime) {
            const diff = prayerTime - currentTime;
            const hoursLeft = Math.floor(diff / 60);
            const minutesLeft = diff % 60;
            
            return {
                name: prayer.name,
                nameFa: prayerNames[prayer.name].fa,
                time: prayer.time,
                timeLeft: `${hoursLeft} ساعت و ${minutesLeft} دقیقه`,
                hoursLeft,
                minutesLeft
            };
        }
    }
    
    // If no prayer left today, return Fajr of tomorrow
    const [hours, minutes] = times.fajr.split(':').map(Number);
    const fajrTime = hours * 60 + minutes;
    const diff = (24 * 60) - currentTime + fajrTime;
    const hoursLeft = Math.floor(diff / 60);
    const minutesLeft = diff % 60;
    
    return {
        name: 'fajr',
        nameFa: prayerNames.fajr.fa,
        time: times.fajr,
        timeLeft: `${hoursLeft} ساعت و ${minutesLeft} دقیقه`,
        hoursLeft,
        minutesLeft,
        tomorrow: true
    };
}

// Get current prayer
function getCurrentPrayer(times) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
        { name: 'fajr', time: times.fajr },
        { name: 'sunrise', time: times.sunrise },
        { name: 'dhuhr', time: times.dhuhr },
        { name: 'asr', time: times.asr },
        { name: 'maghrib', time: times.maghrib },
        { name: 'isha', time: times.isha }
    ];
    
    let currentPrayer = prayers[0];
    
    for (let i = 0; i < prayers.length; i++) {
        const [hours, minutes] = prayers[i].time.split(':').map(Number);
        const prayerTime = hours * 60 + minutes;
        
        if (currentTime >= prayerTime) {
            currentPrayer = prayers[i];
        } else {
            break;
        }
    }
    
    return {
        name: currentPrayer.name,
        nameFa: prayerNames[currentPrayer.name].fa,
        time: currentPrayer.time
    };
}

// Format time for display
function formatTime(time) {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
}

// Get Islamic date (Hijri)
function getIslamicDate() {
    // This is a simplified version. Use proper Islamic calendar library for accurate dates
    const today = new Date();
    const islamicMonths = [
        'محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی',
        'جمادی الاول', 'جمادی الثانی', 'رجب', 'شعبان',
        'رمضان', 'شوال', 'ذی‌القعده', 'ذی‌الحجه'
    ];
    
    // Approximate calculation (use proper library for production)
    const hijriYear = 1445;
    const hijriMonth = islamicMonths[6]; // Example
    const hijriDay = 15;
    
    return `${hijriDay} ${hijriMonth} ${hijriYear}`;
}

// Get Persian date
function getPersianDate() {
    const today = new Date();
    return today.toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
}

// Notification for prayer times (requires permission)
async function requestNotificationPermission() {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return false;
}

function scheduleNotification(prayerName, time) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const [hours, minutes] = time.split(':').map(Number);
        const now = new Date();
        const notificationTime = new Date();
        notificationTime.setHours(hours, minutes, 0, 0);
        
        if (notificationTime > now) {
            const timeout = notificationTime - now;
            setTimeout(() => {
                new Notification('🕌 اذان', {
                    body: `وقت ${prayerNames[prayerName].fa} فرا رسیده است`,
                    icon: '/path/to/icon.png',
                    badge: '/path/to/badge.png',
                    vibrate: [200, 100, 200]
                });
            }, timeout);
        }
    }
}

// Qibla direction calculator
function calculateQiblaDirection(latitude, longitude) {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    
    // Convert to radians
    const lat1 = latitude * Math.PI / 180;
    const lat2 = kaabaLat * Math.PI / 180;
    const lng1 = longitude * Math.PI / 180;
    const lng2 = kaabaLng * Math.PI / 180;
    
    // Calculate Qibla direction
    const y = Math.sin(lng2 - lng1);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lng2 - lng1);
    let qibla = Math.atan2(y, x) * 180 / Math.PI;
    
    // Normalize to 0-360
    qibla = (qibla + 360) % 360;
    
    return {
        degrees: Math.round(qibla),
        direction: getCompassDirection(qibla)
    };
}

function getCompassDirection(degrees) {
    const directions = [
        'شمال', 'شمال شرقی', 'شرق', 'جنوب شرقی',
        'جنوب', 'جنوب غربی', 'غرب', 'شمال غربی'
    ];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        prayerTimesData,
        prayerNames,
        prayerTimesAPI,
        getNextPrayer,
        getCurrentPrayer,
        formatTime,
        getIslamicDate,
        getPersianDate,
        calculateQiblaDirection
    };
}

console.log('🕌 Prayer Times Module Loaded');
