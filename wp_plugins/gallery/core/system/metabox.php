<?php
namespace rbs\RBS_Gallery;

use \Cuztom_Meta_Box as Cuztom_Meta_Box;

if( ! defined( 'ABSPATH' ) ) exit;

new   MetaBox();

class MetaBox {

      /*
          Any Action Registration goes here
      */
      public function __construct(){
            add_action('init', [$this, 'box']);
            add_filter('manage_'. Config::$post_type . '_posts_columns', [$this, 'posts_columns'], 5);
            add_action('manage_'. Config::$post_type . '_posts_custom_column', [$this, 'posts_custom_columns'], 5, 2);
      }


      /*
          Create your Shortbox Call here
      */
      public function box(){
            if(!class_exists('Cuztom_Meta_Box')) return;
            if(!is_admin()) return;

	      $box = register_cuztom_meta_box(
		      'data',
		      'rbs_gallery',
		      array(
			      'title'  => __('Data', 'cuztom'),
			      'fields' => array(
				      array(
					      'id'    => '_data_example',
					      'label' => 'Example',
					      'type'  => 'text',
				      )
			      )
		      ),
		      'side',
		      'high'
	      );

//	      register_cuztom_meta_box(
//		      'data',
//                Config::$post_type,
//                [
//	                'title'       => __('Data', 'cuztom'),
//	                'description' => __('This a description', 'cuztom'),
//                    'fields' => [
//	                    [
//	                    	'id'    => '_data_example',
//	                        'type'        => 'text',
//	                        'label'       => 'Titel',
//	                    ],
//	                    [
//		                    'id'    => '_data_example',
//	                        'type'        => 'textarea',
//	                        'label'       => 'Beschreibung',
//	                    ],
//                    ]
//                ]
//              );
      }



      /*
          Adds Thumbs to the Admin
      */
      public function posts_columns($defaults){
          $defaults['gallery_post_image'] = __('Beitragsbild');
          return $defaults;
      }


      public function posts_custom_columns($column_name, $id){
              if($column_name === 'gallery_post_image'){

                  $picture = get_post_meta($id,Config::$meta . 'cancom_gallery_img', true );
                  $picture = wp_get_attachment_image_src($picture, 'full');

                  if(!empty($picture)):
                      $picture = $picture[0];
                      echo "<img src='$picture' width=125px height=auto>";
                  endif;
                  //echo the_post_thumbnail( array(125,80) );
              }
      }


}
