/*

  So this is the default.js

  Here goes the Magic for the Gallery

  First of all, some Things the Gallery Can already:

  Opacity Animation:
    Prev buttons
    Next buttons
    content
    Images

  Slide Animation
    Thumbnail Animation

*/
var gallery = {

  name              : 'CANCOM Global | CANCOM Gallery |',
  debug             : true,
  preview           : '.cancom-global-gallery-preview',
  gal_wrapper       : '.cancom-global-gallery-wrapper',
  img_section       : '.cancom-global-gallery-img-section',
  img_move          : '.cancom-global-gallery-imgmove',
  thumb_move        : '.cancom-global-gallery-thumbmove',
  thumb_section     : '.cancom-global-gallery-thumbnail-section',
  prev_btn          : '.cancom-global-gallery-prev-btn',
  next_btn          : '.cancom-global-gallery-next-btn',
  close_btn         : '.cancom-global-gallery-close-btn',
  lightbox_left     : '.cancom-global-gallery-lightbox-links',
  lightbox_right    : '.cancom-global-gallery-lightbox-rechts',
  img_wrapper       : '.cancom-global-gallery-imgwrapper',
  thumb_wrapper     : '.cancom-global-gallery-thumbwrapper',
  img               : '.cancom-global-gallery-img',
  thumbnail         : '.cancom-global-gallery-thumb',
  content_section   : '.cancom-global-gallery-content-section',
  content_wrapper   : '.cancom-global-gallery-contentwrapper',
  socialmedias      : '.cancom-global-socialmedia-corp-section',
  socialmedias_wrapper : '.cancom-global-socialmedia-lp-wrapper',
  socialmedias_btn  : '.cancom-global-socialmedia-lp-btn',
  socialmedia_trigger: '.cancom-global-socialmedia-lp-wrapper ul',
  socailmedia_fb_btn : '.cancom-global-socailmedia-share-facebook',
  socailmedia_twitter_btn : '.cancom-global-socailmedia-share-twitter',
  socailmedia_google_btn : '.cancom-global-socailmedia-share-google',
  socailmedia_xing_btn : '.cancom-global-socailmedia-share-xing',
  socailmedia_linkin_btn : '.cancom-global-socailmedia-share-linked',
  socialmedia_fb_url: 'https://www.facebook.com/sharer/sharer.php?u=',
  socialmedia_twitter_url: 'https://www.twitter.com/share?url=',
  socialmedia_google_url: 'https://plus.google.com/share?url=',
  socialmedia_xing_url: 'https://www.xing.com/app/user?op=share;url=',
  socialmedia_linkin_url: 'https://www.linkedin.com/shareArticle?mini=true&amp;url=',
  currentURL        : 'http://'+window.location.hostname + window.location.pathname,
  currentCat        : '',
  galleryOpen       : false,
  gallery_template  : "<div class='cancom-global-gallery-wrapper'>" +

                        "<div class='cancom-global-gallery-img-section'>" +

                          "<div class='cancom-global-gallery-prev-btn' '></div>" +

                          "<div class='cancom-global-gallery-next-btn'></div>" +

                          "<div class='cancom-global-gallery-close-btn'></div>" +

                          "<div class='cancom-global-gallery-imgmove'></div>" +

                          "<div class='cancom-global-socialmedia-corp-section'>" +

                            "<div class='cancom-global-socialmedia-lp-btn'></div>" +

                            "<div class='cancom-global-socialmedia-lp-wrapper'>"+
                                "<ul>"+
                                    "<li><a href=\"\" class=\"cancom-global-socailmedia-share-facebook\" target=\"_blank\"/></li>"+
                                    "<li><a href=\"\" class=\"cancom-global-socailmedia-share-twitter\" target=\"_blank\"/></li>"+
                                    "<li><a href=\"\" class=\"cancom-global-socailmedia-share-google\" target=\"_blank\"/></li>"+
                                    "<li><a href=\"\" class=\"cancom-global-socailmedia-share-xing\" target=\"_blank\"/></li>"+
                                    "<li><a href=\"\" class=\"cancom-global-socailmedia-share-linked\" target=\"_blank\"/></li>"+
                                "</ul>"+
                            "</div>" +

                          "</div>" +

                        "</div>" +

                        "<div class='cancom-global-gallery-border'></div>" +

                        "<div class='cancom-global-gallery-content-section'></div>" +

                        "<div class='cancom-global-gallery-thumbnail-section'>" +

                          "<div class='cancom-global-gallery-lightbox-links'></div>" +

                          "<div class='cancom-global-gallery-lightbox-rechts'></div>" +

                          "<div class='cancom-global-gallery-thumbnail-section-fix'>" +
                            "<div class='cancom-global-gallery-thumbmove'></div>" +

                          "</div>"+

                        "</div>" +

                      "</div>",
  gallery_ready       : false,

  init: function() {
    gallery.afterinit();
    gallery.EventListener();

    if(gallery.debug)
    console.log(this.name + "has been loaded.");
  },

  afterinit: function(){
    $(function(){

        // console.log("gallery share triggered");
        test = gallery_url_import.load(window.location.href);
        if(test) {
          gallery.startgalleryitem(test.category, test.id);
        }
        // console.log(test);
    });

  },

  EventListener: function() {
    $(document).ready( function() { gallery.getimgdata(); });
    $(document).on('click', gallery.preview, function() { gallery.get_data(this); });
    $(document).on('click', gallery.close_btn, function() { gallery.close_gallery(); });
    $(document).on('click', gallery.next_btn, function() { gallery.next_img_fade(); });
    $(document).on('click', gallery.prev_btn, function() { gallery.prev_img_fade(); });
    $(document).on('click', gallery.lightbox_right, function() { gallery.next_img_fade(); });
    $(document).on('click', gallery.lightbox_left, function() { gallery.prev_img_fade(); });
    $(document).on('click', gallery.thumb_wrapper, function() { gallery.clicked_img_fade(this); });
    $(document).on('click', gallery.socialmedias_btn, function(){gallery.share_buttons_display()});
  },

  /*
    This Functions will be started, when someone wants to start the Gallery by URL

    Example:
      www.example.com/?Gallery:items?GALLERYID
      www.example.com/?Gallery:items?180

    First we get all items
    after that we wait 3 sec so everything is loaded and then we start the renderimgbyurl which animates du the GALLERYID item
  */
  startgalleryitem: function(a,b) {

    gallery.get_data(a,b);
    // console.log("galerie startet"+a+b);
    //$(gallery.thumb_wrapper+'[cat='+a+']').trigger("click");
    setTimeout(function() {$(gallery.thumb_wrapper+'[url="?GALLERY:'+a+':'+b+'"]').trigger("click"); /*console.log("items Pick");*/ },2000);


  },

  /*
    Here we add the Class Opacity Animation, so we can differ from Opacity and Slide Animation
  */
  animation_type: function() {

    $.each($(gallery.img_wrapper), function(i,o) {
      $(o).addClass("opacity-animation");
    });

    $.each($(gallery.content_wrapper), function(i,o) {
      $(o).addClass("opacity-animation");
    });

    gallery.gallery_ready = true;
  },

  /*
    Here we get the img paths for the different buttons we have like Thumbnail Button, Prev Button Close Button etc.
  */
  getimgdata: function() {

    var data = { 'action': 'get_ajax_img' };
    jQuery.ajax({
      cache: false,
      url: MyAjax.ajaxurl,
      type: 'GET',
      data: data,
      dataType: 'json',
      success: function(response) {
        r = response.r;
        gallery.preparegalleryfullscreen(r);
        // console.log(response);
        // console.log(r);
      },
      error: function(xhr,desc,err) {
          // console.log(xhr);
          // console.log("Details: " + desc + "\nError:" + err);
      }
    });
  },

  /*
    Here we get our post data for each gallery obj

      title
      description
      picture
      youtube
      url

  */
  get_data: function( a , b ) {
    if(gallery.galleryOpen == false){

        gallery.galleryOpen = true;
        a = $(a);

        category2 = a.selector;

        get_category = $(a).attr('cat');
        gallery.currentCat = $(a).attr('cat');

        b = $(b).length != null ? b : null;

        var data = { 'action': 'get_the_ajax', 'cat': get_category, 'hash' : b, 'category' : category2};
        jQuery.ajax({
          cache: true,
          url: MyAjax.ajaxurl,
          type: 'GET',
          data: data,
          dataType: 'json',
          success: function(response) {
            r = response.r;
            gallery.init_gallery(r);
            // console.log(r);
            // console.log(response);
            // console.log(r);
            gallery.galleryOpen = false;
          },
          error: function(xhr,desc,err) {
              // console.log(xhr);
              // console.log("Details: " + desc + "\nError:" + err);
              gallery.galleryOpen = false;
          }
        });
    }
  },

  /*
    Unfortunately we have to prepare the gallery wrapper with jquery cause the template sucks

    So everytime the Plugin starts the Gallery Section will be added to the Body

    After that we add the buttons

    Obviously everything in display none opacity 0
  */
  preparegalleryfullscreen:function(r) {
    prev_btn        = r['prev-btn'];
    next_btn        = r['next-btn'];
    close_btn       = r['close-btn'];
    lightbox_links  = r['lightbox-links'];
    lightbox_rechts = r['lightbox-rechts'];
    socialmedias    = r['socialmedia'];
    social_btn      = r['socialmedia']['share-btn'];

    $('footer').after(gallery.gallery_template);

    $(gallery.prev_btn).css('background', 'url('+prev_btn+') center center no-repeat');
    $(gallery.next_btn).css('background', 'url('+next_btn+') center center no-repeat');
    $(gallery.close_btn).css('background', 'url('+close_btn+') center center no-repeat');
    $(gallery.lightbox_left).css('background', 'url('+lightbox_links+') center center no-repeat');
    $(gallery.lightbox_right).css('background', 'url('+lightbox_rechts+') center center no-repeat');
    // $(gallery.socialmedias_btn).css('background', 'url('+social_btn+') center center no-repeat');


    // $.each(socialmedias, function(i,o) {
    //   if(i != 'share-btn'){
    //     $(gallery.socialmedias_wrapper).append('<a class="cancom-global-socialmedia-lp-icon" style="background:url('+o+') center center no-repeat;">');
    //   }
    // });
  },

  /*
    Here we set the Gallery Section to "visible"

    After that we start the handler add all items to the correct wrappers
  */
  init_gallery:function(r) {
    // console.log("hi");
    $(gallery.gal_wrapper).velocity({
      opacity : 1
    }, {
      begin: function() { gallery.render_gallery(r); },
      duration: 500 ,
      display: "block",
    });
  },

  /*
    To Close the Gallery this Function will be triggered

    After we faded the Gallery out we delete the Items
  */
  close_gallery:function() {

    $(gallery.gal_wrapper).velocity({
      opacity: 0
    }, {
      // Remove the Elements
      begin: function() { gallery.derender_gallery(); },
      duration: 500,
      display: "none",
    })
  },

  /*
    So Unfortunately they dont want a cool Slide Animation Thats why i have to do this,
    this is a Opacity Animation so no sliding
    All Elements ( Images and Content) are on the Same place ( position : absolute ) when clicked on new item with a next button
    the old gets opacity 0 and the new one fadeIn with opacity 1

    The Thumbnails havbe suprisingly an Slide Animation
  */

  // thumbnail_fade: function() {
  //   if(!$(gallery.thumb_move).hasClass('velocity-animating') && !$(gallery.img_wrapper).hasClass('velocity-animating') && !$(gallery.content_wrapper).hasClass('velocity-animating')){
  //
  //     active_img      = $(gallery.gal_wrapper).find()
  //   }
  // },

  next_img_fade: function() {

    /*
      So first we have to check if we are currently animating
    */
    if (!$(gallery.thumb_move).hasClass('velocity-animating') && !$(gallery.img_wrapper).hasClass('velocity-animating') && !$(gallery.content_wrapper).hasClass('velocity-animating')){
      active_img      = $(gallery.gal_wrapper).find(".active-img");
      active_thumb    = $(gallery.gal_wrapper).find(".active_thumb");
      active_content  = $(gallery.gal_wrapper).find(".active_content");

      // Now we check if the next element isset
      if(active_img.next().length && active_thumb.next().length && active_content.next().length) {

        next_img      = active_img.next();
        next_thumb    = active_thumb.next();
        next_content  = active_content.next();

        // Delete the Active Class of the Old Images
        old_img     = active_img.removeClass("active-img");
        old_thumb   = active_thumb.removeClass("active_thumb");
        old_content = active_content.removeClass("active_content");

        thumbwrapper_margin  = parseInt($(gallery.thumb_wrapper).css("margin")) || parseInt($(gallery.thumb_wrapper).css("margin-top"));
        thumbwrapper_margin  = active_img.index() >= 1 ? thumbwrapper_margin * 2 : thumbwrapper_margin;
        left                 = parseInt($(gallery.thumb_move).css("right")) || 0;
        width                = $(gallery.thumb_wrapper).width();
        animate              = width + left + thumbwrapper_margin;

        // Animate to correct place
        $(gallery.thumb_move).velocity({ right:animate, loop : true }, {
          duration: 1000,
        });

        // Fade old items out
        $(old_img).velocity({opacity : 0}, { duration: 1000 });
        $(old_content).velocity({opacity : 0}, { duration: 1000});

        // Add Active Class to new Items
        next_img.addClass("active-img");
        next_thumb.addClass("active_thumb");
        next_content.addClass("active_content");

        // Fade new Items in
        $(next_img).velocity({ opacity : 1 }, { duration : 1000 });
        $(next_content).velocity({ opacity : 1 }, { duration : 1000 });
      } else {
        /*
        Else only happens if he doesn't find an item
        so it means we have to jump to the first item
        */

        $(".active-img").velocity({ opacity: 0 }, { duration: 1000 });

        $(".active_content").velocity({ opacity: 0}, { duration: 1000 });

        // First remove the Active Classes after that we set active class to first item
        $(gallery.img_wrapper).removeClass("active-img");
        $(gallery.img_move).children().first().addClass("active-img");

        $(gallery.thumb_wrapper).removeClass("active_thumb");
        $(gallery.thumb_move).children().first().addClass("active_thumb");

        $(gallery.content_wrapper).removeClass("active_content");
        $(gallery.content_section).children().first().addClass("active_content");

        // Animate to first item
        $(gallery.thumb_move).velocity({ right: 0 }, {
          duration: 1000,
        });

        $(".active-img").velocity({ opacity: 1 }, { duration: 1000 });

        $(".active_content").velocity({ opacity: 1}, { duration: 1000 });
      }
    }
    gallery.share_button_links();
  },


  /*
    Function for Animation but not finished yet so just ignore
  */
  next_img: function() {

    active_img    = $(gallery.gal_wrapper).find(".active-img");
    active_thumb  = $(gallery.gal_wrapper).find(".active_thumb");

    if(active_img.next().length && active_thumb.next().length) {

      next_img   = active_img.next();
      next_thumb = active_thumb.next();

      old_img    = active_img.removeClass("active-img");
      old_thumb  = active_thumb.removeClass("active_thumb");


      next_img.addClass("active-img");
      next_thumb.addClass("active_thumb");

      left = parseInt($(gallery.img_move).css("left"));
      width = $(window).width();
      animate = width - left;

      $(gallery.img_move).velocity({ left:-animate }, {
        duration: 1000,
      });

    } else {

      $(gallery.img_wrapper).removeClass("active-img");
      $(gallery.img_move).children().first().addClass("active-img");

      $(gallery.thumb_wrapper).removeClass("active_thumb");
      $(gallery.thumb_move).children().first().addClass("active_thumb");

      $(gallery.img_move).css({left: width});
      $(gallery.img_move).velocity({ left: 0 }, {
        duration: 1000,
      });
    }

    getsocialurl = $(active_img).attr('url');

    $.each($('.cancom-global-socialmedia-lp-icon'), function (i,o) {
      // console.log(i);
      // console.log(o);

      $(o).attr('social-url',getsocialurl);
    });
    gallery.share_button_links();
  },

  /*
    this is the Preview Img Fade
    So we get the Preview Img
  */
  prev_img_fade: function() {

    // if velocity is animating return
    if (!$(gallery.thumb_move).hasClass('velocity-animating') && !$(gallery.img_wrapper).hasClass('velocity-animating') && !$(gallery.content_wrapper).hasClass('velocity-animating')){
      active_img      = $(gallery.gal_wrapper).find(".active-img");
      active_thumb    = $(gallery.gal_wrapper).find(".active_thumb");
      active_content  = $(gallery.gal_wrapper).find(".active_content");

      // if no preview item found return
      if(active_img.prev().length && active_thumb.prev().length && active_content.prev().length) {

        next_img      = active_img.prev();
        next_thumb    = active_thumb.prev();
        next_content  = active_content.prev();

        old_img     = active_img.removeClass("active-img");
        old_thumb   = active_thumb.removeClass("active_thumb");
        old_content = active_content.removeClass("active_content");

        thumbwrapper_margin  = parseInt($(gallery.thumb_wrapper).css("margin")) || parseInt($(gallery.thumb_wrapper).css("margin-top"));
        thumbwrapper_margin  = active_img.index() >= 1 ? thumbwrapper_margin * 2 : thumbwrapper_margin;
        left = parseInt($(gallery.thumb_move).css("right")) || 0;
        width = $(gallery.thumb_wrapper).width();
        animate = left - width - thumbwrapper_margin;

        $(gallery.thumb_move).velocity({ right : animate }, {
          duration: 1000,
        });

        $(old_img).velocity({ opacity : 0}, { duration : 1000 });
        $(old_content).velocity({ opacity : 0}, { duration : 1000 });

        next_img.addClass("active-img");
        next_thumb.addClass("active_thumb");
        next_content.addClass("active_content");

        $(next_img).velocity({ opacity : 1}, { duration : 1000 });
        $(next_content).velocity({ opacity : 1 }, { duration : 1000 });

      // So if no preview item found we take the last item
      } else {

        $(".active-img").velocity({ opacity: 0 }, { duration: 1000 });

        $(".active_content").velocity({ opacity: 0 }, { duration: 1000 });

        $(gallery.img_wrapper).removeClass("active-img");
        $(gallery.img_move).children().last().addClass("active-img");

        $(gallery.thumb_wrapper).removeClass("active_thumb");
        $(gallery.thumb_move).children().last().addClass("active_thumb");

        $(gallery.content_wrapper).removeClass("active_content");
        $(gallery.content_section).children().last().addClass("active_content");

        margin = parseInt($(gallery.thumb_wrapper).css("margin")) || parseInt($(gallery.thumb_wrapper).css("margin-top"));

        width = $(gallery.thumb_wrapper).width();

        param = $(gallery.thumb_wrapper).length;

        param_length = (param - 1 ) * (width + (margin * 2));

        // console.log(param);
        // console.log(param_length);

        thumbsection_padding  = parseInt($(gallery.thumb_section).css("padding-left"));

        last_item = param_length;

        $(gallery.thumb_move).velocity({ right: last_item }, {
          duration: 1000,
        });

        $(".active-img").velocity({ opacity: 1 }, { duration : 1000 });
        $(".active_content").velocity({ opacity : 1}, { duration : 1000 });
      }
      getsocialurl = $(active_img).attr('url');

      $.each($('.cancom-global-socialmedia-lp-icon'), function (i,o) {
        // console.log(i);
        // console.log(o);

        $(o).attr('social-url',getsocialurl);
      });
    }
    gallery.share_button_links();
  },

  prev_img: function() {

    active_img    = $(gallery.gal_wrapper).find(".active-img");
    active_thumb  = $(gallery.gal_wrapper).find(".active_thumb");

    if(active_img.prev().length && active_thumb.prev().length) {

      next_img   = active_img.prev();
      next_thumb = active_thumb.prev();

      old_img    = active_img.removeClass("active-img");
      old_thumb  = active_thumb.removeClass("active_thumb");


      next_img.addClass("active-img");
      next_thumb.addClass("active_thumb");

      gallery.share_button_links();

      left = parseInt($(gallery.img_move).css("left"));
      width = $(window).width();
      animate = width + left;

      $(gallery.img_move).velocity({ left:+animate }, {
        duration: 1000,
      });

    } else {

      $(gallery.img_wrapper).removeClass("active-img");
      $(gallery.img_move).children().last().addClass("active-img");

      $(gallery.thumb_wrapper).removeClass("active_thumb");
      $(gallery.thumb_move).children().last().addClass("active_thumb");

      gallery.share_button_links();

      width = $(window).width();

      param = $().length;

      param_length = param * width;

      last_item = param_length - width;

      $(gallery.thumb_move).css({left: param_length});
      $(gallery.thumb_move).velocity({ left: + last_item }, {
        duration: 1000,
      });
    }
  },

  /*
  So these Guys also want to Click on a Thumbnail and jump to it

  Thats why we have this buddy
  */
  clicked_img_fade: function(a) {
    // First we check if we are currently animating
    if (!$(gallery.thumb_move).hasClass('velocity-animating') && !$(gallery.img_wrapper).hasClass('velocity-animating') && !$(gallery.content_wrapper).hasClass('velocity-animating')){
      i_count     = $(a).index();

      // Remove the active class of the old items
      oldimg      = $(gallery.img_wrapper).removeClass("active-img");
      oldthumb    = $(gallery.thumb_wrapper).removeClass("active_thumb");
      oldcontent  = $(gallery.content_wrapper).removeClass("active_content");

      // Add the Active Class to the new Item using indexes
      newimg      = $(gallery.img_wrapper).eq(i_count).addClass("active-img");
      newthumb    = $(gallery.thumb_wrapper).eq(i_count).addClass("active_thumb");
      newcontent  = $(gallery.content_wrapper).eq(i_count).addClass("active_content");

      //
      gallery.share_button_links();

      // Jump / Slide to the new Active Item
      thumbwrapper_margin  = parseInt($(gallery.thumb_wrapper).css("margin")) || parseInt($(gallery.thumb_wrapper).css("margin-top"));
      thumbwrapper_margin  = $(a).index() >= 2 ? (i_count * 2) * (thumbwrapper_margin) : i_count * thumbwrapper_margin;
      width       = $(gallery.thumb_wrapper).width();
      maxlength   = i_count == 0 ? 0 : (i_count * width) + thumbwrapper_margin ;

      $(oldimg).velocity( { opacity : 0 }, { duration: 1000 });
      $(oldcontent).velocity( { opacity : 0 }, { duration: 1000 });

      $(gallery.thumb_move).velocity({ right : maxlength }, { duration : 1000 });

      $(newimg).velocity( { opacity : 1 }, { duration: 1000 });
      $(newcontent).velocity( { opacity : 1 }, { duration: 1000 });

      getsocialurl = $(newimg).attr('url');

      $.each($('.cancom-global-socialmedia-lp-icon'), function (i,o) {
        // console.log(i);
        // console.log(o);

        $(o).attr('social-url',getsocialurl);
      });
    }
  },

  // Ignore Fade Animation is only Important
  clicked_img: function(a) {

    width         = $(window).width();
    i_count       = $(a).index();
    width_length  = width * i_count;

    $(gallery.img_wrapper).removeClass("active-img");
    $(gallery.thumb_wrapper).removeClass("active_thumb");

    $(gallery.img_wrapper).eq(i_count).addClass("active-img");
    $(gallery.thumb_wrapper).eq(i_count).addClass("active_thumb");

    gallery.share_button_links();

    $(gallery.img_move).velocity( {left: -width_length }, { duration: 1000, });
  },

  /*
  So here we have the RenderimgbyUrl Function

  The Function takes the current url and compares it with the different items,
  If one Matches we jump to this item and Activate it Using AddClass
  */
  renderimgbyurl : function(b) {
    if(gallery.gallery_ready) {
      urlcurrent = window.location.href;

      oldimg      = $(gallery.gal_wrapper).find(gallery.img_wrapper).removeClass("active-img");
      oldthumb    = $(gallery.gal_wrapper).find(gallery.thumb_wrapper).removeClass("active_thumb");
      oldcontent  = $(gallery.gal_wrapper).find(gallery.content_wrapper).removeClass("active_content");

      $(gallery.img_wrapper).css("opacity", "0");
      $(gallery.content_wrapper).css("opacity", "0");

      var newimg = $(gallery.gal_wrapper).find(gallery.img_wrapper +'[url="'+urlcurrent+'"]').addClass("active-img");
      var newthumb = $(gallery.gal_wrapper).find(gallery.thumb_wrapper +'[url="'+urlcurrent+'"]').addClass("active_thumb");
      var newcontent = $(gallery.gal_wrapper).find(gallery.content_wrapper +'[url="'+urlcurrent+'"]').addClass("active_content");

      gallery.share_button_links();

      $(newimg).css("opacity", "1");
      $(newcontent).css("opacity","1");

      count = $(newthumb).index();

      thumbwrapper_margin  = parseInt($(gallery.thumb_wrapper).css("margin")) || parseInt($(gallery.thumb_wrapper).css("margin-top"));
      thumbwrapper_margin  = $(newthumb).index() >= 2 ? (count * 2) * (thumbwrapper_margin) : count * thumbwrapper_margin;
      width       = $(gallery.thumb_wrapper).width();
      maxlength   = count == 0 ? 0 : (count * width) + thumbwrapper_margin ;

      $(gallery.thumb_move).velocity({ right : maxlength }, { duration : 1000 });

      getsocialurl = $(newimg).attr('url');

      $.each($('.cancom-global-socialmedia-lp-icon'), function (i,o) {
        // console.log(i);
        // console.log(o);

        $(o).attr('social-url',getsocialurl);
      });

    } else {
      setTimeout(function() {gallery.renderimgbyurl(b);},3000);
    }
  },


  /*
    When we close the gallery we want to delete all the items and it can begin new
  */
  derender_gallery: function() {
    $(gallery.img_wrapper).remove();
    $(gallery.thumb_wrapper).remove();
    $(gallery.content_wrapper).remove();
    $(gallery.thumb_move).css("right", "0px");
  },

  /*
  */
  render_gallery: function(r) {

    $.each(r, function(i,v) {

      title       = v.title;
      description = v.description;
      src         = v.picture[0];
      video       = v.video.length ? v.video : null;
      url         = v.url;

      if(video) {
        thumbnail_yt = "http://img.youtube.com/vi/"+video+"/hqdefault.jpg";
        $(gallery.img_move).append('<div class="cancom-global-gallery-imgwrapper cancom-global-gallery-vidwrapper" url="'+url+'"><div class="cancom-global-gallery-video-wrapper"><div class="cancom-global-gallery-video"><iframe  type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/'+video+'" frameborder="0" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe></div></div></div>');
        $(gallery.thumb_move).append('<div class="cancom-global-gallery-thumbwrapper" url="'+url+'"><div class="cancom-global-gallery-thumb" style="background:url('+thumbnail_yt+') center center no-repeat;"></div></div>');
      } else {
        $(gallery.img_move).append('<div class="cancom-global-gallery-imgwrapper" url="'+url+'"><div class="cancom-global-gallery-img" style="background:url('+src+') center center no-repeat;"></div></div>');
        $(gallery.thumb_move).append('<div class="cancom-global-gallery-thumbwrapper" url="'+url+'"><div class="cancom-global-gallery-thumb" style="background:url('+src+') center center no-repeat;"></div></div>');
      }

        $(gallery.content_section).append('<div class="cancom-global-gallery-contentwrapper" url="'+url+'"><h3 class="cancom-global-gallery-title">'+title+'</h3><div class="cancom-global-gallery-description">'+description+'</div></div>');

      if(i == 0) {
        $(gallery.img_wrapper).addClass('active-img');
        $(gallery.thumb_wrapper).addClass('active_thumb');
        $(gallery.content_wrapper).addClass('active_content');
        gallery.share_button_links();
      }
    });

    gallery.animation_type();
  },

  /*
   * Social Share Buttons Animation
   */
  share_buttons_display: function(){
    $(this.socialmedia_trigger).stop().animate({
        width: 'toggle'
    }, 400);
  },
  /**
   * Change share Link for Social Share Buttons
   */
  share_button_links: function(){
      $(gallery.socailmedia_fb_btn).attr('href', gallery.socialmedia_fb_url+"//"+location.host+$(".active_thumb").attr("url"));
      $(gallery.socailmedia_twitter_btn).attr('href', gallery.socialmedia_twitter_url+"//"+location.host+$(".active_thumb").attr("url"));
      $(gallery.socailmedia_google_btn).attr('href', gallery.socialmedia_google_url+"//"+location.host+$(".active_thumb").attr("url"));
      $(gallery.socailmedia_xing_btn).attr('href', gallery.socialmedia_xing_url+"//"+location.host+$(".active_thumb").attr("url"));
      $(gallery.socailmedia_linkin_btn).attr('href', gallery.socialmedia_linkin_url+"//"+location.host+$(".active_thumb").attr("url"));
  },
};

// console.log("init Gallery");
gallery.init();

gallery_url_import = {

        // Exmaple
        exmple : '//whatever.com/magic/?GALLERY:test:83',

        // Debug mode
        debug  : true,

        // Data Holder
        data  : {
            url      : 'NULL',
            category : 'NULL',
            id       : 'NULL',
        },

        /*
            Load the Adress into the tmep
        */
        load_url : function(url){
            if(url!=='undefined'){
                // console.log("NO URL has been passed though");
                return window.location.href;
            }

            else {
                return url
            }
        },



        /*
            Load Function to do some magic
        */
        load : function(url){
            var that = gallery_url_import
            var url  = url // that.load_url(url) // Hier

            if(that.debug)
            // console.log(url)

            var x = url.split('?')
            // console.log(x)

            // Stop if we dont have our magic
            if(x.length<2){
                // console.log("GALLERY Element doesn't have been found. Stop code splitting");
                return false;
            }

            var params = x[1].split(':');
            if(that.debug) /* console.log(params) */

            if(params.length==3){
                // console.log("GALLERY Element Structure has been found.");
                that.data.url      = url
                that.data.category = params[1]
                that.data.id       = params[2]

                return that.data;
            }
            else {
                // console.log("GALLERY Element doesn't have been found. Stop return.");
                return false;
            }
        }
}
