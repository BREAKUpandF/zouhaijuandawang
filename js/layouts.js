// 心形布局
function heartPosition() {
    const positions = [];
    const amount = Math.min(imageList.length, 50);
    let count = 0;
    
    // 心形方程参数
    const a = 30;
    const step = (2 * Math.PI) / amount;
    
    for (let i = 0; i < amount; i++) {
        const theta = i * step;
        
        // 心形方程
        const x = 16 * a * Math.pow(Math.sin(theta), 3);
        const y = 13 * a * Math.cos(theta) - 5 * a * Math.cos(2 * theta) - 2 * a * Math.cos(3 * theta) - a * Math.cos(4 * theta);
        
        positions[count] = {
            position: new THREE.Vector3(x * 15, y * 15, 0),
            rotation: new THREE.Euler(0, 0, Math.random() * Math.PI)
        };
        count++;
    }
    
    return positions;
}

// 星空布局
function starryPosition() {
    const positions = [];
    const amount = Math.min(imageList.length, 50);
    
    for (let i = 0; i < amount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 1000 + Math.random() * 1000;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        positions[i] = {
            position: new THREE.Vector3(x, y, z),
            rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
        };
    }
    
    return positions;
}

// 丝带布局
function ribbonPosition() {
    const positions = [];
    const amount = Math.min(imageList.length, 50);
    
    for (let i = 0; i < amount; i++) {
        const t = (i / amount) * Math.PI * 4;
        
        const x = Math.sin(t) * 800;
        const y = Math.cos(t * 2) * 400;
        const z = Math.sin(t * 3) * 600;
        
        positions[i] = {
            position: new THREE.Vector3(x, y, z),
            rotation: new THREE.Euler(t * 0.5, t, t * 0.3)
        };
    }
    
    return positions;
}

// 星光布局
function starlightPosition() {
    const positions = [];
    const amount = Math.min(imageList.length, 50);
    
    for (let i = 0; i < amount; i++) {
        const angle = (i / amount) * Math.PI * 2;
        const radius = 800 + Math.sin(i * 5) * 200;
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(i * 0.5) * 500;
        const z = Math.sin(angle) * radius;
        
        positions[i] = {
            position: new THREE.Vector3(x, y, z),
            rotation: new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)
        };
    }
    
    return positions;
} 