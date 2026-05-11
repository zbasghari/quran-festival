// Khatam Quran Management
class KhatamManager {
    constructor() {
        this.juzData = this.loadJuzData();
        this.khatamHistory = this.loadHistory();
        this.init();
    }

    loadJuzData() {
        const saved = localStorage.getItem('khatamJuz');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Initialize 30 Juz
        const juzData = [];
        for (let i = 1; i <= 30; i++) {
            juzData.push({
                number: i,
                completed: false,
                completedDate: null
            });
        }
        return juzData;
    }

    loadHistory() {
        const saved = localStorage.getItem('khatamHistory');
        return saved ? JSON.parse(saved) : [];
    }

    saveJuzData() {
        localStorage.setItem('khatamJuz', JSON.stringify(this.juzData));
    }

    saveHistory() {
        localStorage.setItem('khatamHistory', JSON.stringify(this.khatamHistory));
    }

    init() {
        this.renderJuzGrid();
        this.updateStats();
        this.renderHistory();
        this.setupEventListeners();
    }

    renderJuzGrid() {
        const container = document.getElementById('juzGrid');
        container.innerHTML = '';

        this.juzData.forEach(juz => {
            const card = document.createElement('div');
            card.className = `juz-card ${juz.completed ? 'completed' : ''}`;
            card.innerHTML = `
                <div class="juz-number">جزء ${juz.number}</div>
                <div class="juz-info">
                    ${juz.completed ? '✓ خوانده شده' : 'خوانده نشده'}
                </div>
                ${juz.completedDate ? `<div class="juz-date">${new Date(juz.completedDate).toLocaleDateString('fa-IR')}</div>` : ''}
            `;
            
            card.addEventListener('click', () => this.toggleJuz(juz.number));
            container.appendChild(card);
        });
    }

    toggleJuz(juzNumber) {
        const juz = this.juzData[juzNumber - 1];
        
        if (juz.completed) {
            if (confirm(`آیا می‌خواهید جزء ${juzNumber} را به عنوان خوانده نشده علامت بزنید؟`)) {
                juz.completed = false;
                juz.completedDate = null;
            }
        } else {
            juz.completed = true;
            juz.completedDate = new Date().toISOString();
            
            // Show celebration
            this.showCelebration(juzNumber);
        }
        
        this.saveJuzData();
        this.renderJuzGrid();
        this.updateStats();
        this.checkKhatamComplete();
    }

    showCelebration(juzNumber) {
        // Vibrate if supported
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
        
        // Show alert
        const completedCount = this.juzData.filter(j => j.completed).length;
        alert(`🎉 تبریک! جزء ${juzNumber} تکمیل شد.\nتعداد اجزاء خوانده شده: ${completedCount} از 30`);
    }

    checkKhatamComplete() {
        const allCompleted = this.juzData.every(j => j.completed);
        
        if (allCompleted) {
            const khatamDate = new Date().toISOString();
            
            this.khatamHistory.push({
                date: khatamDate,
                juzCount: 30
            });
            
            this.saveHistory();
            this.renderHistory();
            
            // Reset for new khatam
            setTimeout(() => {
                if (confirm('🎊 الحمدلله! ختم قرآن شما تکمیل شد!\n\nآیا می‌خواهید ختم جدیدی شروع کنید؟')) {
                    this.resetKhatam();
                }
            }, 500);
        }
    }

    resetKhatam() {
        if (confirm('آیا مطمئن هستید که می‌خواهید ختم جدیدی شروع کنید؟')) {
            this.juzData = this.juzData.map(juz => ({
                ...juz,
                completed: false,
                completedDate: null
            }));
            
            this.saveJuzData();
            this.renderJuzGrid();
            this.updateStats();
        }
    }

    updateStats() {
        const completedJuz = this.juzData.filter(j => j.completed).length;
        const progress = (completedJuz / 30) * 100;
        
        // Update progress bar
        document.getElementById('khatamProgress').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `${Math.round(progress)}%`;
        
        // Update completed count
        document.getElementById('completedJuz').textContent = `${completedJuz} / 30`;
        
        // Calculate streak
        const streak = this.calculateStreak();
        document.getElementById('streakDays').textContent = `${streak} روز`;
    }

    calculateStreak() {
        const completedDates = this.juzData
            .filter(j => j.completed && j.completedDate)
            .map(j => new Date(j.completedDate).toDateString());
        
        const uniqueDates = [...new Set(completedDates)].sort().reverse();
        
        if (uniqueDates.length === 0) return 0;
        
        let streak = 1;
        const today = new Date().toDateString();
        
        if (uniqueDates[0] !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (uniqueDates[0] !== yesterday.toDateString()) {
                return 0;
            }
        }
        
        for (let i = 0; i < uniqueDates.length - 1; i++) {
            const current = new Date(uniqueDates[i]);
            const next = new Date(uniqueDates[i + 1]);
            const diffDays = Math.floor((current - next) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    renderHistory() {
        const container = document.getElementById('khatamHistory');
        
        if (this.khatamHistory.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book-reader"></i>
                    <p>هنوز ختمی تکمیل نشده است</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        
        this.khatamHistory.reverse().forEach((khatam, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-item-info">
                    <h4>ختم قرآن ${this.khatamHistory.length - index}</h4>
                    <p><i class="fas fa-calendar"></i> ${new Date(khatam.date).toLocaleDateString('fa-IR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</p>
                </div>
                <div class="history-badge">
                    <i class="fas fa-check-circle"></i> تکمیل شده
                </div>
            `;
            container.appendChild(item);
        });
    }

    setupEventListeners() {
        document.getElementById('resetKhatam').addEventListener('click', () => {
            this.resetKhatam();
        });
    }
}

// Initialize Khatam Manager when DOM is loaded
let khatamManager;
document.addEventListener('DOMContentLoaded', () => {
    khatamManager = new KhatamManager();
});
