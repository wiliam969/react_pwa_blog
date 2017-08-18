<?php
namespace rbs\RBS_QUOTATIONS;

if( ! defined( 'ABSPATH' ) ) exit;

class View {

    public static function render_preview($posts,$atts,$content) {
      $view =  new View\GalleryPreview($posts,$atts,$content);
      return $view->render();
    }

    public static function get_fullscreen($atts,$content) {
      $view = new View\GalleryFullscreen($atts,$content);

      return $view->render();
    }
}
