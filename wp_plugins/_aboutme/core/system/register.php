<?php
namespace rbs\RBS_ABOUTME;

if( ! defined( 'ABSPATH' ) ) exit;

new   Register();

class Register {
      /*
            Predefine
      */
      public $post_type   = null;


       /*
            Create the Basic Object
       */
       public function __construct(){
            // Dependenciy check
            // if(!$this->check_dependencies()) return false;

            // Any Register Hooks
            if(Config::$is_post_type) add_action('init', [$this, 'register_post_type']);
            if(Config::$is_taxonomy)  add_action('init', [$this, 'register_taxonomy']);
            // add_filter('request', [$this, 'register_post_type_to_rss']);
       }

       /*
          Register Post Type function
       */
       public function register_post_type(){
//            if(!class_exists('Cuztom_Meta_Box')) return;

            // if(!is_admin()) return;
	       $this->post_type = register_cuztom_post_type(Config::$post_type, Config::$post_type_args, Config::$post_type_labels);
       }

       /*
          Register the Associated Taxonomy
       */
       public function register_taxonomy(){
//            if(!class_exists('Cuztom_Meta_Box')) return;
            // if(!is_admin()) return;
            $this->tax      = register_cuztom_taxonomy(Config::$tax, Config::$post_type, Config::$tax_args, Config::$tax_labels);
       }

       /*
            Check dependencies
       */
       public function check_dependencies(){
            if(Config::$cuztom)
              if(!class_exists('\Cuztom_Post_type'))
                return false;

            return true;
       }

       /*
            Add the Post Type to RSS
       */
       public function register_post_type_to_rss($qv){
            if($qv['feed'] && !isset($qv['post_type'])):
                if(!empty($qv['post_type'])):
                    array_push($qv['post_type'], Config::$post_type, 'post');
                else:
                    $qv['post_type'] = [ Config::$post_type, 'post'];
                endif;
            endif;

            return $qv;
       }
}
