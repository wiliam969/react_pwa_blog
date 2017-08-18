<?php
namespace rbs\RBS_QUOTATIONS;

if( ! defined( 'ABSPATH' ) ) exit;

/*
    Config for iDH Design Upgrade
*/

class Config {
    /*
        Basic Configurations
    */
    public static $plugin_name    = "RBS_QUOTATIONS";
    public static $cpt            = null;
    public static $cuztom         = true;

    // VC Settings
    public static $vc             = "RBS Allgemein";
    public static $vc_name        = "quotations";
    public static $vc_description = "Darstellung für quotations";

    // Param Name for the VC Tax Dropdown
    public static $vc_tax_dropdown= "rbs_quotations_cat";

    // Here we Define the Shortcode Name of the Plugin
    public static $multi_short    = false;
    public static $shortcode      = "rbs_quotations";
    public static $short_array    = [ '' , '' ];

    public static $meta           = "_rbs_quotations_";

    // Here we define if we want to use a Post Type or a Taxonomy
    public static $is_post_type   = true;
    public static $is_taxonomy    = true;

    // So Here define some Global Path Var, the $*_path are generated so dont edit them but you can edit the *_uri vars
    public static $plugin_path    = null;
    public static $css_path       = null;
    public static $js_path        = null;
    public static $img_path       = null;

    public static $css_uri        = 'assets/css';
    public static $js_uri         = 'assets/js';
    public static $img_uri        = 'assets/img';

    /*
        Post Type Configurations
    */
    public static $post_type      = "rbs_quotations";
    public static $post_type_args = [
                                        'public'              => true,
                                        'has_archive'         => true,
                                        'exclude_from_search' => true,
                                        'show_ui'             => true,
                                        'show_in_menu'        => true,
                                        'show_in_nav_menus'   => false,
                                        'show_in_admin_bar'   => true,
                                        'menu_icon'           => 'dashicons-format-gallery',
                                        'supports'            => array( 'title', 'thumbnail','custom-fields' ),
	                                    'show_in_rest'        => true,
	                                    'rest_base'           => 'quotations'
                                    ];

    public static $post_type_labels= [
                                        'name'            => 'Item',
                                        'singular_name'   => 'Items',
                                        'menu_name'       => 'quotations'
                                    ];



    /*
        Taxonomy Configurations
    */
    public static $tax            = "rbs_quotations_category";
    public static $tax_args       = [
                                        'public'                => true,
                                        'show_in_quick_edit'    => true,
                                        'show_admin_column'     => true,
                                        'show_ui'               => true,
                                        'show_in_menu'          => true,
                                        'show_in_nav_menus'     => false,
                                        'admin_column_sortable' => true,
                                        'admin_column_filter'   => true,
                                        'show_in_rest' => true,
                                    ];
    public static $tax_labels     = [
                                        'name'                       => 'Kategorien / Bereiche',
                                        'singular_name'              => 'Kategorie / Bereich',
                                        'search_items'               => 'Suche ',
                                        'popular_items'              => 'Popular ',
                                        'all_items'                  => 'Alle ',
                                        'parent_item'                => 'Übergeordnet ',
                                        'parent_item_colon'          => 'Übergeordneter Colon',
                                        'edit_item'                  => 'Bearbeiten ',
                                        'update_item'                => 'Aktualisieren ',
                                        'add_new_item'               => 'Neue Kategorie ',
                                        'new_item_name'              => 'Neue Kategorie ',
                                        'separate_items_with_commas' => 'Teile Kategorien mit Kommas ',
                                        'add_or_remove_items'        => 'Hinzufügen oder Löschen von Kategorien',
                                        'choose_from_most_used'      => 'Wähle aus den Populären Kategorien',
                                        'not_found'                  => 'Nicht gefunden ',
                                        'menu_name'                  => 'Kategorien',
                                    ];

    public static function paths($css,$js,$img) {
      Config::$plugin_path = plugin_dir_url(dirname(__FILE__));

      Config::$css_path = Config::$plugin_path.$css;
      Config::$js_path  = Config::$plugin_path.$js;
      Config::$img_path = Config::$plugin_path.$img;
    }

}

Config::paths(Config::$css_uri,Config::$js_uri,Config::$img_uri);
