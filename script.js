// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePredictions();
    initializeStatistics();
    initializeAnimations();
    initializeArchives();
    initializeProfile();
    initializeHeroEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Race prediction functionality
function initializePredictions() {
    const raceCards = document.querySelectorAll('.race-card');
    
    raceCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
            showPredictionDetails(this);
        });
    });
}

function showPredictionDetails(raceCard) {
    const prediction = raceCard.querySelector('.prediction');
    const horses = raceCard.querySelectorAll('.horse-prediction');
    
    horses.forEach((horse, index) => {
        setTimeout(() => {
            horse.style.transform = 'translateX(0)';
            horse.style.opacity = '1';
        }, index * 100);
    });
}

// Statistics functionality
function initializeStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Intersection Observer for stat animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateStatNumber(element) {
    const finalValue = element.textContent.replace('%', '');
    const isPercentage = element.textContent.includes('%');
    let currentValue = 0;
    const increment = finalValue / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(currentValue) + (isPercentage ? '%' : '');
    }, 30);
}

// Animation functionality
function initializeAnimations() {
    // Fade in animations for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// Race data management
class RaceData {
    constructor() {
        this.races = this.getSampleRaces();
        this.predictions = this.getSamplePredictions();
    }
    
    getSampleRaces() {
        return [
            {
                id: 1,
                venue: '大井競馬場',
                raceNumber: 1,
                distance: '1200m',
                surface: 'ダート',
                condition: '3歳以上1勝クラス',
                startTime: '15:15',
                horses: [
                    { number: 1, name: 'スピードスター', jockey: '田中太郎', weight: '55kg' },
                    { number: 2, name: 'ゴールドラッシュ', jockey: '山田花子', weight: '54kg' },
                    { number: 3, name: 'ライトニング', jockey: '佐藤次郎', weight: '56kg' },
                    { number: 7, name: 'サンダーボルト', jockey: '鈴木一郎', weight: '55kg' }
                ]
            }
        ];
    }
    
    getSamplePredictions() {
        return [
            {
                raceId: 1,
                predictions: [
                    { position: '◎', horseNumber: 7, confidence: 85 },
                    { position: '○', horseNumber: 3, confidence: 75 },
                    { position: '▲', horseNumber: 1, confidence: 65 }
                ]
            }
        ];
    }
    
    getPredictionForRace(raceId) {
        return this.predictions.find(p => p.raceId === raceId);
    }
}

// Initialize race data
const raceDataManager = new RaceData();

// Utility functions
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

function calculateWinProbability(confidence) {
    return Math.min(Math.max(confidence / 100, 0.1), 0.9);
}

// Update predictions dynamically
function updatePredictions() {
    const raceCards = document.querySelectorAll('.race-card');
    
    raceCards.forEach((card, index) => {
        const raceId = index + 1;
        const prediction = raceDataManager.getPredictionForRace(raceId);
        
        if (prediction) {
            updateRaceCardPrediction(card, prediction);
        }
    });
}

function updateRaceCardPrediction(raceCard, prediction) {
    const horseElements = raceCard.querySelectorAll('.horse-prediction');
    
    prediction.predictions.forEach((pred, index) => {
        if (horseElements[index]) {
            const confidence = pred.confidence;
            const confidenceColor = getConfidenceColor(confidence);
            horseElements[index].style.borderLeftColor = confidenceColor;
        }
    });
}

function getConfidenceColor(confidence) {
    if (confidence >= 80) return '#4caf50';
    if (confidence >= 70) return '#ff9800';
    return '#f44336';
}

// Weather impact calculator
function calculateWeatherImpact(weather, surface) {
    const impacts = {
        'sunny': { dirt: 1.0, turf: 1.0 },
        'cloudy': { dirt: 0.95, turf: 0.98 },
        'rainy': { dirt: 0.8, turf: 0.7 },
        'heavy_rain': { dirt: 0.6, turf: 0.5 }
    };
    
    return impacts[weather] ? impacts[weather][surface] || 1.0 : 1.0;
}

// Course analysis
function analyzeCourse(venue, distance) {
    const courseData = {
        '大井競馬場': {
            specialty: 'ダート',
            favoredDistance: ['1200m', '1400m'],
            characteristics: '内枠有利、逃げ・先行有利'
        },
        '船橋競馬場': {
            specialty: 'ダート',
            favoredDistance: ['1000m', '1200m'],
            characteristics: '小回り、スピード重視'
        },
        '浦和競馬場': {
            specialty: 'ダート',
            favoredDistance: ['800m', '1400m'],
            characteristics: '直線短い、位置取り重要'
        },
        '川崎競馬場': {
            specialty: 'ダート',
            favoredDistance: ['900m', '1600m'],
            characteristics: '直線長い、差し有利'
        }
    };
    
    return courseData[venue] || { specialty: 'unknown', favoredDistance: [], characteristics: 'データ不足' };
}

// Export for use in other modules
window.RaceAnalyzer = {
    calculateWeatherImpact,
    analyzeCourse,
    calculateWinProbability
};

// Archives functionality
function initializeArchives() {
    const archiveItems = document.querySelectorAll('.archive-item');
    
    // Intersection Observer for archive animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    archiveItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Archive management functions
function addPredictionToArchive(raceData, prediction, reasoning) {
    const archiveData = {
        id: Date.now(),
        date: new Date().toLocaleDateString('ja-JP'),
        venue: raceData.venue,
        raceNumber: raceData.raceNumber,
        distance: raceData.distance,
        prediction: prediction,
        reasoning: reasoning,
        status: "結果待ち",
        result: null
    };
    
    // This would typically save to localStorage or send to server
    console.log('Archive data saved:', archiveData);
    return archiveData;
}

function updateArchiveResult(archiveId, result, status) {
    // This would typically update the stored archive data
    const archiveElement = document.querySelector(`[data-archive-id="${archiveId}"]`);
    if (archiveElement) {
        const statusElement = archiveElement.querySelector('.archive-status span');
        statusElement.textContent = status;
        statusElement.className = status === '的中' ? 'status-hit' : 'status-miss';
    }
}

// SEO optimization functions
function generateArchiveMetadata(archiveData) {
    return {
        title: `${archiveData.date} ${archiveData.venue} 第${archiveData.raceNumber}レース AI予想`,
        description: `NANKAN Intelligenceの過去分析記録。AI技術による精密な競馬予想実績。${archiveData.reasoning}`,
        keywords: ['NANKAN Intelligence', 'AI競馬予想', archiveData.venue, `第${archiveData.raceNumber}レース`, '的中実績', 'データ分析']
    };
}

// Auto-update timer
setInterval(() => {
    const now = new Date();
    const timeElements = document.querySelectorAll('.race-info p');
    
    timeElements.forEach(element => {
        if (element.textContent.includes('発走時刻')) {
            const timeText = element.textContent.split('発走時刻: ')[1];
            if (timeText) {
                const [hours, minutes] = timeText.split(':');
                const raceTime = new Date();
                raceTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                
                if (raceTime > now) {
                    const diff = raceTime - now;
                    const minutesLeft = Math.floor(diff / 60000);
                    const secondsLeft = Math.floor((diff % 60000) / 1000);
                    
                    if (minutesLeft < 30) {
                        element.style.color = '#ff6b6b';
                        element.style.fontWeight = 'bold';
                    }
                }
            }
        }
    });
}, 1000);

// Profile functionality
function initializeProfile() {
    const profileCard = document.querySelector('.profile-card');
    const methodItems = document.querySelectorAll('.method-item');
    const badges = document.querySelectorAll('.badge');
    
    // Profile card animation
    if (profileCard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        profileCard.style.opacity = '0';
        profileCard.style.transform = 'translateY(30px)';
        profileCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(profileCard);
    }
    
    // Method items staggered animation
    methodItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });
        
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Badge hover effects
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Profile achievement counter animation
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    if (text.includes('49歳')) {
                        animateNumber(entry.target, 49, '歳');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

// Number animation for profile stats
function animateNumber(element, targetNumber, suffix = '') {
    let currentNumber = 0;
    const increment = targetNumber / 30;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        
        const strongElement = element.querySelector('strong');
        if (strongElement && strongElement.textContent.includes('年齢')) {
            element.innerHTML = element.innerHTML.replace(/\d+/, Math.floor(currentNumber));
        }
    }, 50);
}

// Profile data management
class ProfileManager {
    constructor() {
        this.profileData = null;
        this.loadProfileData();
    }
    
    async loadProfileData() {
        try {
            // This would typically fetch from an API or local storage
            this.profileData = {
                name: "アサイトシヒロ",
                age: 49,
                title: "予想開発者",
                specialties: ["人工知能", "機械学習"],
                level: "最高"
            };
        } catch (error) {
            console.error('プロフィールデータの読み込みに失敗しました:', error);
        }
    }
    
    updateProfileDisplay() {
        const nameElement = document.querySelector('.profile-basic h3');
        const titleElement = document.querySelector('.profile-title');
        
        if (nameElement && this.profileData) {
            nameElement.textContent = this.profileData.name;
        }
        
        if (titleElement && this.profileData) {
            titleElement.textContent = `${this.profileData.title}・${this.profileData.age}歳`;
        }
    }
    
    generateProfileSEO() {
        return {
            title: `${this.profileData?.name || 'アサイトシヒロ'} - NANKAN Intelligence 開発者`,
            description: `NANKAN Intelligence創設者。人工知能と機械学習を駆使した南関競馬分析の専門家。49歳のデータサイエンティストによる革新的な予想システム。`,
            keywords: ['NANKAN Intelligence', 'AI競馬分析', 'アサイトシヒロ', '人工知能', '機械学習', 'データサイエンス', '南関競馬']
        };
    }
}

// Initialize profile manager
const profileManager = new ProfileManager();

// Premium section functionality
function scrollToPremium() {
    const premiumSection = document.getElementById('premium');
    if (premiumSection) {
        premiumSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Premium conversion tracking
class ConversionTracker {
    constructor() {
        this.events = [];
        this.initializeTracking();
    }
    
    initializeTracking() {
        // Track premium button clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('premium-btn') || 
                e.target.classList.contains('subscribe-btn') ||
                e.target.classList.contains('cta-primary')) {
                this.trackEvent('premium_interest', {
                    buttonType: e.target.className,
                    timestamp: new Date().toISOString(),
                    section: this.getCurrentSection(e.target)
                });
            }
        });
        
        // Track scroll depth on premium section
        const premiumSection = document.getElementById('premium');
        if (premiumSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackEvent('premium_section_view', {
                            timestamp: new Date().toISOString(),
                            visibilityRatio: entry.intersectionRatio
                        });
                    }
                });
            }, { threshold: [0.25, 0.5, 0.75, 1.0] });
            
            observer.observe(premiumSection);
        }
    }
    
    trackEvent(eventName, data) {
        this.events.push({
            event: eventName,
            data: data
        });
        
        // In a real implementation, send to analytics service
        console.log('Conversion Event:', eventName, data);
    }
    
    getCurrentSection(element) {
        const section = element.closest('section');
        return section ? section.id : 'unknown';
    }
    
    getConversionFunnel() {
        const funnelSteps = {
            pageView: this.events.filter(e => e.event === 'page_view').length,
            premiumView: this.events.filter(e => e.event === 'premium_section_view').length,
            premiumInterest: this.events.filter(e => e.event === 'premium_interest').length,
            subscription: this.events.filter(e => e.event === 'subscription_start').length
        };
        
        return funnelSteps;
    }
}

// A/B Testing for premium features
class ABTestManager {
    constructor() {
        this.variant = this.getVariant();
        this.applyVariant();
    }
    
    getVariant() {
        // Simple A/B test assignment
        return Math.random() < 0.5 ? 'A' : 'B';
    }
    
    applyVariant() {
        if (this.variant === 'B') {
            // Variant B: More aggressive pricing display
            const priceElements = document.querySelectorAll('.price');
            priceElements.forEach(el => {
                if (el.textContent.includes('2,980')) {
                    el.innerHTML = '月額2,980円 <small style="text-decoration: line-through; opacity: 0.7;">3,980円</small>';
                }
            });
            
            // Variant B: Different CTA text
            const ctaButtons = document.querySelectorAll('.cta-primary');
            ctaButtons.forEach(btn => {
                if (btn.textContent === '今すぐ始める') {
                    btn.textContent = '限定価格で開始';
                }
            });
        }
    }
}

// Hero effects functionality
function initializeHeroEffects() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const predictionsSection = document.getElementById('predictions');
    
    // Scroll arrow click handler
    if (scrollArrow && predictionsSection) {
        scrollArrow.addEventListener('click', function() {
            predictionsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Hide scroll arrow when scrolling
        if (scrollArrow) {
            const opacity = Math.max(0, 1 - scrolled / 300);
            scrollArrow.style.opacity = opacity;
        }
    });
    
    // Hero badges entrance animation
    const heroBadges = document.querySelectorAll('.hero-badge');
    heroBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.6s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
}

// Premium content preview
function showPremiumPreview() {
    const modal = document.createElement('div');
    modal.className = 'premium-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>有料版プレビュー</h3>
            <div class="preview-content">
                <h4>実際の買い目例</h4>
                <div class="preview-betting">
                    <div class="bet-preview">
                        <span class="bet-type">3連複</span>
                        <span class="bet-detail">3-8-12 BOX 各500円</span>
                        <span class="expected">期待配当: 4,200円</span>
                    </div>
                    <div class="bet-preview">
                        <span class="bet-type">馬連</span>
                        <span class="bet-detail">3-8 1,000円</span>
                        <span class="expected">期待配当: 2,800円</span>
                    </div>
                </div>
                <p class="preview-note">AI分析による最適な投資配分で回収率142%を実現</p>
            </div>
            <div class="modal-actions">
                <button class="modal-subscribe">今すぐ申し込む</button>
                <button class="modal-close">閉じる</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Initialize conversion tracking and A/B testing
document.addEventListener('DOMContentLoaded', function() {
    const conversionTracker = new ConversionTracker();
    const abTestManager = new ABTestManager();
    
    // Track initial page view
    conversionTracker.trackEvent('page_view', {
        timestamp: new Date().toISOString(),
        variant: abTestManager.variant
    });
});

// Free trial logic
function startFreeTrial() {
    // In a real implementation, this would integrate with payment processor
    alert('無料トライアル機能は実装準備中です。お問い合わせフォームからご連絡ください。');
}

// Email capture for remarketing
function captureEmail() {
    const email = prompt('最新の予想情報をお届けします。メールアドレスを入力してください:');
    if (email && email.includes('@')) {
        // In a real implementation, save to database
        alert('ありがとうございます！最新情報をお送りします。');
        
        // Show special offer
        setTimeout(() => {
            if (confirm('特別オファー: 今すぐ申し込むと初月半額の1,490円でご利用いただけます。詳細を見ますか？')) {
                scrollToPremium();
            }
        }, 2000);
    }
}