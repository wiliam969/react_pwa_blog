<?php

if( ! defined( 'ABSPATH' ) ) exit;

$dir = __DIR__;

include_once $dir . '/config/config.php';

include_once $dir . '/system/register.php';
include_once $dir . '/system/enqueue.php';
include_once $dir . '/system/metabox.php';
include_once $dir . '/system/shortcode.php';
include_once $dir . '/system/vc.php';
include_once $dir . '/system/model.php';
include_once $dir . '/system/view.php';

// Load Plugin specific files
include_once $dir . '/models/Gallery.Preview.php';

// Load different Views
include_once $dir . '/views/Gallery.Fullscreen.php';
include_once $dir . '/views/Gallery.Preview.php';
