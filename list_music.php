<?php
header('Content-Type: application/json');

$directory = 'music/';
$music = array();

// 检查目录是否存在
if (is_dir($directory)) {
    // 获取所有mp3文件
    $files = glob($directory . '*.mp3');
    
    // 如果没有找到音乐文件，使用默认音乐
    if (empty($files)) {
        $music[] = 'music/default.mp3';
    } else {
        foreach ($files as $file) {
            $music[] = $file;
        }
    }
}

// 如果目录不存在或没有找到音乐文件，使用默认音乐
if (empty($music)) {
    $music[] = 'music/default.mp3';
}

echo json_encode($music);
?> 