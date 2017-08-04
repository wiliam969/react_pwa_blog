<?php
namespace rbs\RBS_Gallery\Model;

use rbs\RBS_Gallery\Config as Config;

if( ! defined( 'ABSPATH' ) ) exit;

new GalleryPreview();

class GalleryPreview {

        function __construct() {
          add_action('wp_ajax_get_the_ajax', [$this, 'get_the_ajax']);
          add_action('wp_ajax_nopriv_get_the_ajax', [$this, 'get_the_ajax']);

          add_action('wp_ajax_get_ajax_img', [$this, 'get_ajax_img']);
          add_action('wp_ajax_nopriv_get_ajax_img', [$this, 'get_ajax_img']);
        }

        /*
            Please Register here all your VC Params
        */
        public static function get_posts($atts=array(),$content){
              // Prepare
              $category          = isset($atts[Config::$vc_tax_dropdown]) && !empty($atts[Config::$vc_tax_dropdown]) ? $atts[Config::$vc_tax_dropdown] : "";

              $gallery_arguments = [
                'posts_per_page'   => -1,
              	'orderby'          => 'date',
              	'order'            => 'DESC',
              	'post_type'        => Config::$post_type,
              	'post_status'      => 'publish',
              	'suppress_filters' => true,
                'tax_query' => [
                  [
                    'taxonomy' => Config::$tax,
                    'field' => 'slug',
                    'terms' => $category
                  ]
                ]
              ];

              $posts = get_posts( $gallery_arguments );

              return $posts;
        }

        public static function get_vc($atts = null,$content = null) {
            $preview_img      = isset($atts['cancom_global_gallery_preview']) && !empty($atts['cancom_global_gallery_preview']) ? wp_get_attachment_image_src($atts['cancom_global_gallery_preview']) : "";
            $title            = isset($atts['cancom_global_gallery_title'])   && !empty($atts['cancom_global_gallery_title']) ? $atts['cancom_global_gallery_title'] : "";

            if($preview_img)
              $preview_img = $preview_img[0];

            $vc = [
              'title'       => $title,
              'preview_img' => $preview_img,
            ];

            return $vc;
        }

        public static function get_meta($post = null, $category = null) {

          if($category)
            esc_attr($category);

          $id = $post->ID;

          $picture     = get_post_meta($id,Config::$meta . 'cancom_gallery_img', true );
          $video       = get_post_meta($id,Config::$meta . 'cancom_gallery_yt', true );
          $title       = get_post_meta($id,Config::$meta . 'cancom_gallery_title', true);
          $description = get_post_meta($id,Config::$meta . 'cancom_gallery_description', true);

          $hash        = $id;
          $server_uri  = "";//get_site_url();
          $key         = "?GALLERY:";
          $key2        = ":";

          $url         = $key . $category . $key2 . $hash;

          if($picture)
            $picture = wp_get_attachment_image_src($picture, 'full');

          $meta = [
            'url'           => $url,
            'picture'       => $picture,
            'video'         => $video,
            'title'         => $title,
            'description'   => $description,
          ];

          return $meta;
        }

        /*

          So we are trying to do an ajax req for the gallery because we want to return the meta datas

        */
        public function get_the_ajax() {

          // $post_hash = esc_attr($_GET['hash']);
          //
          // if($post_hash) {
          //
          //   $category = get_post($post_hash);
          //
          //   $atts = [
          //     'posts_per_page'   => -1,
          //     'orderby'          => 'date',
          //     'order'            => 'DESC',
          //     'post_type'        => Config::$post_type,
          //     'post_status'      => 'publish',
          //     'suppress_filters' => true,
          //   ];
          //
          //   $posts = get_posts($atts,$content = null);
          //
          //   $meta_data = [];
          //   foreach ($posts as $post):
          //     $meta = self::get_meta($post);
          //
          //     array_push($meta_data,$meta);
          //   endforeach;
          //
          //   $meta_data = json_encode([ 'success' => true, 'r' => $category ]);
        	// 	die($meta_data);
          //
          // } else {
          $category = esc_attr($_GET['cat']);
          $category2 = esc_attr($_GET['category']);

          if(empty($category))
            $category = $category2;

          $atts = [
            Config::$vc_tax_dropdown => $category,
          ];

          $posts = self::get_posts($atts,$content = null);

          $meta_data = [];
          foreach ($posts as $post):
            $meta = self::get_meta($post,$category);

            array_push($meta_data,$meta);
          endforeach;

      		$meta_data = json_encode([ 'success' => true, 'r' => $meta_data ]);
      		die($meta_data);
          // }
        }

        public function get_ajax_img() {
          $img_paths = null;

          $img_paths = [
            'prev-btn'        => Config::$img_path."/pfeil_links.svg",
            'next-btn'        => Config::$img_path."/pfeil_rechts.svg",
            'close-btn'       => Config::$img_path."/close.svg",
            'lightbox-rechts' => Config::$img_path."/Lightbox_links.svg",
            'lightbox-links'  => Config::$img_path."/Lightbox_rechts.svg",
            'socialmedia'     => [
              'facebook'  => Config::$img_path."/lp/facebook.svg",
              'google'    => Config::$img_path."/lp/google+.svg",
              'linked'    => Config::$img_path."/lp/linked.svg",
              'twitter'   => Config::$img_path."/lp/twitter.svg",
              'xing'      => Config::$img_path."/lp/xing.svg",
              'share-btn' => Config::$img_path."/lp/share_interactive_ccc.svg",
            ],
          ];

          $encoded = json_encode(['success' => true, 'r' => $img_paths]);

          die($encoded);
        }

        /*
            Get the Thumbnail Image
        */
        public static function get_image($id=null, $size='full', $key=0){
              $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($id), $size);
              return isset($thumb[$key]) ? $thumb[$key] : '';
        }
}
