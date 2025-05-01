class LoveGame {
    constructor() {
        this.score = 0;
        this.achievements = new Set();
        this.hearts = [];
        this.init();
    }

    init() {
        this.setupHeartCollection();
        this.setupAchievements();
        this.setupMobileEvents();
    }

    setupHeartCollection() {
        setInterval(() => {
            this.createFloatingHeart();
        }, 2000);

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('floating-heart')) {
                this.collectHeart(e.target);
            }
        });
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = '-50px';
        document.body.appendChild(heart);
        this.hearts.push(heart);

        const animation = heart.animate([
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)` }
        ], {
            duration: 5000,
            easing: 'linear'
        });

        animation.onfinish = () => {
            heart.remove();
            this.hearts = this.hearts.filter(h => h !== heart);
        };
    }

    collectHeart(heart) {
        this.score += 10;
        this.updateScore();
        this.checkAchievements();
        
        // 收集动画
        heart.style.transition = 'all 0.5s ease';
        heart.style.transform = 'scale(1.5)';
        heart.style.opacity = '0';
        setTimeout(() => heart.remove(), 500);
        
        // 播放收集音效
        this.playCollectSound();
    }

    setupAchievements() {
        this.achievementsList = {
            'beginner': { score: 100, title: '初心者', description: '收集100分的爱心' },
            'lover': { score: 500, title: '热恋中', description: '收集500分的爱心' },
            'soulmate': { score: 1000, title: '灵魂伴侣', description: '收集1000分的爱心' }
        };
    }

    checkAchievements() {
        for (const [key, achievement] of Object.entries(this.achievementsList)) {
            if (this.score >= achievement.score && !this.achievements.has(key)) {
                this.unlockAchievement(key, achievement);
            }
        }
    }

    unlockAchievement(key, achievement) {
        this.achievements.add(key);
        this.showAchievementNotification(achievement);
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <h3>🎉 解锁成就 🎉</h3>
            <p>${achievement.title}</p>
            <p>${achievement.description}</p>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateScore() {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = `分数: ${this.score}`;
        }
    }

    setupMobileEvents() {
        let touchStartTime;
        let touchStartPosition;

        document.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            touchStartPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            this.createTouchRipple(touchStartPosition.x, touchStartPosition.y);
        });

        document.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration > 500) {
                this.createSpecialEffect(touchStartPosition.x, touchStartPosition.y);
            }
        });
    }

    createTouchRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'touch-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }

    createSpecialEffect(x, y) {
        // 创建特殊效果（例如爱心爆炸）
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.className = 'special-heart';
            heart.innerHTML = '❤️';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            
            const angle = (i / 12) * 2 * Math.PI;
            const velocity = 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(heart);
            
            let position = { x, y };
            let frame = 0;
            
            const animate = () => {
                frame++;
                position.x += vx;
                position.y += vy;
                
                heart.style.left = position.x + 'px';
                heart.style.top = position.y + 'px';
                heart.style.opacity = 1 - frame / 60;
                
                if (frame < 60) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    playCollectSound() {
        const audio = new Audio('music/collect.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
            // 处理自动播放限制
            console.log('无法播放音效，可能需要用户交互');
        });
    }
}

// 初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    window.loveGame = new LoveGame();
}); 