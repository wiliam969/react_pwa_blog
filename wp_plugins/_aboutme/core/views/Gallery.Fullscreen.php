<?php
namespace rbs\RBS_ABOUTME\View;

use rbs\RBS_ABOUTME\Model\GalleryPreview as Model;
use rbs\RBS_ABOUTME\Config as Config;

if( ! defined( 'ABSPATH' ) ) exit;

class GalleryFullscreen {
      /*
          Predefine Class Variables
      */
      private $posts   = [];
      private $atts    = null;
      private $content = null;
      private $id      = "x_no_id_set_";


      /*
          The Constructor
      */
      public function __construct($posts=array(),$atts = [],$content = ""){
          $this->posts   = $posts;
          $this->atts    = $atts;
          $this->content = $content;
          $this->id    = md5(uniqid()) . "_" . time();
      }


      public function render(){

              ob_start();

              // echo "<h1> hi there </h1>";

              /*echo "<script>
              var url   = window.location.href;
              var value = url.substring(url.lastIndexOf('?'));
              console.log('-------------------');
              conolse.log(value);
              //gallery.startgalleryitem('',value);
              </script>";*/
              
              $return = ob_get_contents();
              ob_end_clean();
              return $return;
      }

      public function add_posts($posts=array()){
            $this->posts = $posts;
      }

}
