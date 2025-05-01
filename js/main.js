// 全局变量
let camera, scene, renderer;
let controls;
let currentLayout = 'heart';
let autoChangeTimer;
let currentMusicIndex = 0;
let musicPlayer;
let poems = {
    morning: [
        "晨曦微露映红霞，清风徐来拂面华",
        "朝露晶莹春意浓，花开几许动人心",
        "晨光熹微晓色新，一夜东风百花春"
    ],
    afternoon: [
        "午后暖阳倾碧空，微风轻拂绿荫中",
        "碧水蓝天云悠悠，花影摇曳醉温柔",
        "细雨斜风作晓寒，淡烟疏柳媚晴滩"
    ],
    evening: [
        "夕阳西下暮色深，彩霞满天醉人心",
        "落霞与孤鹜齐飞，秋水共长天一色",
        "暮色苍茫看劲松，乱云飞渡仍从容"
    ],
    night: [
        "夜深星辰皆入梦，清风明月共婵娟",
        "月上柳梢头，人约黄昏后",
        "星河璀璨夜未央，思绪缱绻诉衷肠"
    ]
};

// 初始化场景
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;

    // 加载图片和音乐
    loadResources();
    
    // 初始化音乐播放器
    initMusicPlayer();
    
    // 设置自动切换布局
    startAutoChange();
    
    // 更新诗词
    updatePoem();
    
    // 事件监听
    window.addEventListener('resize', onWindowResize, false);
    bindEvents();
}

// 加载资源
function loadResources() {
    // 获取图片列表
    fetch('list_images.php')
        .then(response => response.json())
        .then(data => {
            imageList = data;
            createElements();
        })
        .catch(error => console.error('Error loading images:', error));

    // 获取音乐列表
    fetch('list_music.php')
        .then(response => response.json())
        .then(data => {
            musicList = data;
            initMusicPlayer();
        })
        .catch(error => console.error('Error loading music:', error));
}

// 初始化音乐播放器
function initMusicPlayer() {
    musicPlayer = document.getElementById('bgm');
    musicPlayer.addEventListener('ended', playNextSong);
    document.getElementById('toggle-music').addEventListener('click', toggleMusic);
    
    if (musicList.length > 0) {
        musicPlayer.src = 'music/' + musicList[currentMusicIndex];
        musicPlayer.play().catch(e => console.log('Auto-play prevented:', e));
    }
}

// 播放下一首歌
function playNextSong() {
    currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
    musicPlayer.src = 'music/' + musicList[currentMusicIndex];
    musicPlayer.play().catch(e => console.log('Error playing next song:', e));
}

// 切换音乐播放状态
function toggleMusic() {
    if (musicPlayer.paused) {
        musicPlayer.play();
    } else {
        musicPlayer.pause();
    }
}

// 根据时间更新诗词
function updatePoem() {
    const hour = new Date().getHours();
    let timeOfDay;
    
    if (hour >= 5 && hour < 11) timeOfDay = 'morning';
    else if (hour >= 11 && hour < 16) timeOfDay = 'afternoon';
    else if (hour >= 16 && hour < 19) timeOfDay = 'evening';
    else timeOfDay = 'night';
    
    const poemList = poems[timeOfDay];
    const randomPoem = poemList[Math.floor(Math.random() * poemList.length)];
    
    const intro = document.querySelector('.intro');
    if (intro) {
        intro.textContent = randomPoem;
    }
}

// 自动切换布局
function startAutoChange() {
    const layouts = ['heart', 'starry', 'ribbon', 'starlight'];
    let currentIndex = 0;
    
    autoChangeTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % layouts.length;
        switch(layouts[currentIndex]) {
            case 'heart': transform(heartPosition()); break;
            case 'starry': transform(starryPosition()); break;
            case 'ribbon': transform(ribbonPosition()); break;
            case 'starlight': transform(starlightPosition()); break;
        }
    }, 15000);
}

// 绑定事件
function bindEvents() {
    document.querySelector('.heart-btn').addEventListener('click', () => transform(heartPosition()));
    document.querySelector('.starry-btn').addEventListener('click', () => transform(starryPosition()));
    document.querySelector('.ribbon-btn').addEventListener('click', () => transform(ribbonPosition()));
    document.querySelector('.starlight-btn').addEventListener('click', () => transform(starlightPosition()));
}

// 窗口大小调整
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
    renderer.render(scene, camera);
}

// 布局转换函数
function transform(positions) {
    TWEEN.removeAll();
    
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        const target = positions[i];
        
        new TWEEN.Tween(object.position)
            .to({
                x: target.position.x,
                y: target.position.y,
                z: target.position.z
            }, 2000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
            
        new TWEEN.Tween(object.rotation)
            .to({
                x: target.rotation.x,
                y: target.rotation.y,
                z: target.rotation.z
            }, 2000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    }
}

// 初始化
init();
animate(); 