<?php
namespace rbs\RBS_QUOTATIONS\View;

use rbs\RBS_QUOTATIONS\Model\GalleryPreview as Model;
use rbs\RBS_QUOTATIONS\Config as Config;

if( ! defined( 'ABSPATH' ) ) exit;

class GalleryPreview {
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
              if(empty($this->posts)) return;

              $posts = $this->posts;

              $vc   = Model::get_vc($this->atts,$this->content);

              ob_start();

              echo "<div class='cancom-global-gallery-section'>";

                  if($vc['title'])
                    echo "<div class='cancom-global-gallery-title'>".$vc['title']."</div>";

                  $this->render_post($posts,$vc);

              echo "</div>";

              $return = ob_get_contents();
              ob_end_clean();
              return $return;
      }

      public function render_post($post=null, $vc=''){
            if(!$post) return;

            if(!empty($this->atts))
              $category = $this->atts[Config::$vc_tax_dropdown];

            echo "<div class='cancom-global-gallery-preview' cat='$category' style='background:url(".$vc['preview_img'].")'></div>";
    }

      public function add_posts($posts=array()){
            $this->posts = $posts;
      }

}
