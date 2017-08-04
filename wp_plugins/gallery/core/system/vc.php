<?php
namespace rbs\RBS_Gallery;

if( ! defined( 'ABSPATH' ) ) exit;

new   VisualComposer();

class VisualComposer {

        /*
            Register all Actions
        */
        public function __construct(){
              add_action('vc_before_init', [$this, 'map_shortcodes']);
              add_action('init', [$this, 'inject_dropdown']);
              add_action('init', [$this, 'inject_dropdown2']);
        }


        /*
            Map VisualComposer to Shortcodes
        */
        public function map_shortcodes(){
              // Pre-Check if VisualComposer is avaible.
              if(!is_callable('vc_map')) return;

              // Start Mapping here.
              // Triangle
              vc_map([
                  'name'              => Config::$vc_name,
                  'description'       => Config::$vc_description,
                  'base'              => Config::$short_array[0],
                  'category'          => Config::$vc,
                  // 'admin_enqueue_js'  => [Config::$js_path.'/admin.js'],
                  // 'show_settings_on_create' => true,
                  "icon"         => plugins_url("../assets/icon/icon_gallery.png" , __FILE__),
                  'params' => [
                    [
                      'type'        => 'textfield',
                      'heading'     => 'Titel',
                      'param_name'  => 'cancom_global_gallery_title',
                      'description' => 'Hier können Sie einen Titel hinzufügen',
                      'admin_label' => true,
                    ],
                    [
                      'type'        => 'attach_image',
                      'heading'     => 'Preview Bild',
                      'param_name'  => 'cancom_global_gallery_preview',
                      'description' => 'Hier können Sie ein Preview Bild auswählen',
                      'admin_label' => true
                    ],
                  ]
              ]);


        }


        /*
            Inject Dropdown
        */
        public function inject_dropdown(){
              // Pre-Check if VC is avaible
              if(!is_callable('vc_add_param')) return;

              $terms = get_terms(Config::$tax);
              $final = array();
              $final[] = array(null, 'Keine ' . Config::$tax_labels['singular_name'] . ' ausgewählt - Zeige alle Items');

              if(is_array($terms))
              foreach($terms as $term):
                  $final[] = array($term->slug, $term->name);
              endforeach;


              vc_add_param(Config::$short_array[0], array(
                    "type"       => "dropdown",
                    "heading"    => Config::$tax_labels['singular_name'],
                    "param_name" => Config::$vc_tax_dropdown,
                    "value"      => $final,
                    'admin_label'=> true
                    )
              );
        }

        /*
            Inject Dropdown
        */
        public function inject_dropdown2(){
              // Pre-Check if VC is avaible
              if(!is_callable('vc_add_param')) return;

              $terms = get_terms( "cancom_gallery_category" );
              $final = array();
              $final[] = array(null, 'Keine ' . Config::$tax_labels['singular_name'] . ' ausgewählt -');

              if(isset($terms)) {
                foreach($terms as $term):
                  $final[] = array($term->slug, $term->name);
                endforeach;
              }

              if(shortcode_exists("cancom_widget")) {
                vc_add_param("cancom_widget", array(
                  "type"       => "dropdown",
                  "heading"    => "Gallerie",
                  "param_name" => "boxtype_gallery",
                  "description"=> "Hier können Sie die gewünschte Gallerie Kategorie auswählen",
                  "group"      => "Galleriebox",
                  "value"      => $final,
                  'admin_label'=> true
                  )
                );
              }
        }


}
