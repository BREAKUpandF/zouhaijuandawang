<?php
header('Content-Type: application/json');

$directory = 'img/';
$images = array();

// 检查目录是否存在
if (is_dir($directory)) {
    // 获取所有png文件
    $files = glob($directory . '*.png');
    
    // 如果没有找到图片，使用默认图片
    if (empty($files)) {
        $images[] = 'img/default.png';
    } else {
        foreach ($files as $file) {
            $images[] = $file;
        }
    }
}

// 如果目录不存在或没有找到图片，使用默认图片
if (empty($images)) {
    $images[] = 'img/default.png';
}

echo json_encode($images);
?> 