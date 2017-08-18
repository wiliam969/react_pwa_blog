<?php
namespace rbs\RBS_Gallery;

if( ! defined( 'ABSPATH' ) ) exit;

new   MetaBox();

class MetaBox {

      /*
          Any Action Registration goes here
      */
      public function __construct(){
            add_action('init', [$this, 'box']);
            add_action('init', [$this, 'register_api']);
            add_filter('manage_'. Config::$post_type . '_posts_columns', [$this, 'posts_columns'], 5);
            add_action('manage_'. Config::$post_type . '_posts_custom_column', [$this, 'posts_custom_columns'], 5, 2);
      }


      /*
          Create your Shortbox Call here
      */
      public function box(){
	      register_cuztom_meta_box(
		      'meta_box_id',
		      'rbs_gallery',
		      array(
			      'title'     => 'Fuck info',
			      'fields'    => array(
			      	[
				      'id'           => 'fick_die_hader',
				      'label'        => 'Author',
				      'description'  => 'Just a little description',
				      'type'         => 'text'
                    ],
			      )
		      )
	      );
      }

      public function register_api() {
	      register_rest_field(
		      'rbs_gallery',
		      'meta_data',
		      [
			      'get_callback' =>
				      function( $object, $field_name, $request ) {
					      $meta = get_post_meta( $object['id']);

					      return $meta;
				      },
			      'update_callback' => null,
			      'schema' => null,
		      ]
	      );
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
