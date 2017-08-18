<?php
namespace rbs\RBS_ABOUTME;

if( ! defined( 'ABSPATH' ) ) exit;

class Model {

      public static function get_preview($atts, $content) {
          return Model\GalleryPreview::get_posts($atts,$content);
      }
}
