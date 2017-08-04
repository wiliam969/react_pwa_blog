<?php

if( ! defined( 'ABSPATH' ) ) exit;

class Cuztom_Field_File extends Cuztom_Field
{
	var $_supports_ajax			= true;
	var $_supports_bundle		= true;

	var $css_classes 		  	= array( 'cuztom-hidden', 'cuztom-input' );
	var $image_mime					= array('image_svg+xml', 'image_jpg', 'image_jpeg', 'image_png');

	function _output( $value )
	{
		$output = '';

		if( ! empty( $value ) )
		{
			$attachment = self::get_attachment_by_url( $value );
			$mime = '';

			if( is_object( $attachment ) )
			{
				$mime = str_replace( '/', '_', $attachment->post_mime_type );
				$name = $attachment->post_title;
			}

			$file  = '<span class="cuztom-mime mime-' . $mime . '"><a target="_blank" href="' . $value . '">' . $name . '</a></span>';
			$file .= in_array($mime, $this->image_mime) ? "<img src='$value' style='max-width:500px; width:auto; height:auto; '>" : "";
		}
		else
		{
			$file = '';
		}

		$output .= '<input type="hidden" ' . $this->output_name() . ' ' . $this->output_id() . ' ' . $this->output_css_class() . ' value="' . ( ! empty( $value ) ? $value : '' ) . '" />';
		$output .= sprintf( '<input id="upload-file-button" type="button" class="button js-cuztom-upload" data-cuztom-media-type="file" value="%s" />', __( 'Datei auswählen', 'cuztom' ) );
		$output .= ( ! empty( $value ) ? sprintf( '<a href="#" class="js-cuztom-remove-media cuztom-remove-media">%s</a>', __( 'Datei entfernen', 'cuztom' ) ) : '' );

		$output .= '<span class="cuztom-preview">' . $file . '</span>';

		$output .= $this->output_explanation();

		return $output;
	}


	/**
	 * Get attachment by given url
	 *
	 * @param  string 			$url
	 * @return integer
	 */
	function get_attachment_by_url( $url )
	{
		global $wpdb;

		$attachment = $wpdb->get_row( $wpdb->prepare( "SELECT ID,post_title,post_mime_type FROM " . $wpdb->prefix . "posts" . " WHERE guid=%s;", $url ) );

		return $attachment;
	}
}
