<?php
namespace rbs\RBS_QUOTATIONS;

if( ! defined( 'ABSPATH' ) ) exit;

new   Enqueue();

class Enqueue {
        // Class Variables
        public $plugin_uri    = null;
        public $css_uri       = null;
        public $js_uri        = null;
        // Enqueue Settings
        public $plugin_name          = null;
        public $enque_all_in_backend = false;           // True for enque all Scripts from the Frontend to the Backend


        /*
            Add your Event Listener
        */
        public function __construct(){
              // Setup
              $this->plugin_name  = Config::$plugin_name;
              $this->plugin_uri   = Config::$plugin_path;
              $this->css_uri      = Config::$css_path;
              $this->js_uri       = Config::$js_path;

              // Events
//              add_action('wp_enqueue_scripts', [$this, 'register']);
//              add_action('wp_enqueue_scripts', [$this, 'enqueue']);
//              add_action('wp_enqueue_scripts', [$this, 'backend']);
//              add_action('admin_enqueue_scripts', [$this, 'admin']);
        }



        /*
            Register all your Scripts
            * * * * * * * * * * * * *
            Register all your Scripts so they can be called afterwards
        */
        public function register(){
              wp_register_style($this->plugin_name."_default", $this->css_uri.'/default.css', null, '1.0', 'all');
              wp_register_script($this->plugin_name."_default", $this->js_uri.'/default.js', 'jquery', '1.0', false);

              wp_register_script('velocity', $this->js_uri.'/velocity.min.js', 'jquery', '1.0', false);
              wp_register_script('velocity-ui', $this->js_uri.'/velocity.ui.min.js', 'jquery', '1.0', false);
        }



        /*
            Enqueue on the Page
            * * * * * * * * * * *
            Enqueue your scripts for the Web Front Page.
        */
        public function enqueue(){

            if(run_enque(Config::$short_array[0])):
              wp_enqueue_style($this->plugin_name."_default");

              wp_localize_script($this->plugin_name."_default",'MyAjax', ['ajaxurl' => admin_url('admin-ajax.php')] );
              wp_enqueue_script($this->plugin_name."_default");

              wp_enqueue_script('velocity');
              wp_enqueue_script('velocity-ui');
            endif;
        }

        public function admin(){
            wp_register_script('velocity', $this->js_uri.'/velocity.min.js', 'jquery', '1.0', false);
            wp_register_script('velocity-ui', $this->js_uri.'/velocity.ui.min.js', 'jquery', '1.0', false);

            wp_enqueue_script('velocity');
            wp_enqueue_script('velocity-ui');
        }

        /*
            Enqueue on Backend
            * * * * * * * * * *
            Only enqueue your scripts which are needen for the Backend
        */
        public function backend(){
              // If this flag is true, we will have all the enqueue scripts and styles from the
              if($this->enque_all_in_backend) $this->enqueue();

        }

        /*
          We want to check if the Shortcode isset in the Post otherwise we dont include assets files
        */
        public function checkshort() {

          global $post;

          $content = isset($post->post_content) ? $post->post_content : false;

          if(Config::$multi_short) {

            foreach (Config::$short_array as $key => $shortcode):

              $checkshort = is_a( $post, 'WP_Post' ) && ( has_shortcode( $content, $shortcode )) ? true : false ;

              if($checkshort == true){
                return true;
              }

            endforeach;

          } else {

            $checkshort = is_a( $post, 'WP_Post' ) && ( has_shortcode( $content, Config::$shortcode )) ? true : false ;

          }

          return $checkshort;
        }




}
