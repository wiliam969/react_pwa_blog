<?php
namespace rbs\RBS_ABOUTME;

if( ! defined( 'ABSPATH' ) ) exit;

new   Shortcode();

class Shortcode {

        /*
            Add your Shortcodes here
        */
        public function __construct(){
              add_shortcode(Config::$shortcode,  [$this, 'Gallery']);
              // add_action('template_include',[$this, 'get_url']);
        }

        public function Gallery($atts, $content) {

            $posts = Model::get_preview($atts,$content);

            return View::render_preview($posts,$atts,$content);
        }

        public function get_url($template) {
          // $key = "?GALLERY";
          $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
          $find = strpos($url, '?GALLERY');

          echo "<pre>";
          print_r($url);
          echo "</pre>";

          if( strpos($url, '?GALLERY') !== false) {
            echo "<pre>";
            print_r($find);
            echo "</pre>";
            $template = plugin_dir_path( __FILE__ ) . '../template/gallery.php';
            return $template;
          } else {

          }
        }
}
