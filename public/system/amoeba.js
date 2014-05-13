/*global jQuery:false */
/*global Modernizr:false */
/*global skrollr:false */
/*jshint unused:false*/

'use strict';

(function (jQuery) {

  jQuery(window).scroll(function(){
    if (jQuery(this).scrollTop() > 100) {
      jQuery('.scrollup').fadeIn();
      } else {
        jQuery('.scrollup').fadeOut();
      }
    });
    jQuery('.scrollup').click(function(){
      jQuery('html, body').animate({ scrollTop: 0 }, 1000);
        return false;
    });
  
  // local scroll
  if(jQuery('.navbar').localScroll) {
    jQuery('.navbar').localScroll({hash:true, offset: {top: 0},duration: 800, easing:'easeInOutExpo'});
  }

  
  // portfolio
/*
    if(jQuery('.isotopeWrapper').length){

        var jQuerycontainer = jQuery('.isotopeWrapper');
        var jQueryresize = jQuery('.isotopeWrapper').attr('id');
        // initialize isotope
        
        jQuerycontainer.isotope({
            itemSelector: '.isotopeItem',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: jQuerycontainer.width() / jQueryresize
            }


            
        });

        jQuery('#filter a').click(function(){



            jQuery('#filter a').removeClass('current');
            jQuery(this).addClass('current');
            var selector = jQuery(this).attr('data-filter');
            jQuerycontainer.isotope({
                filter: selector,
                animationOptions: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    queue: false
                }
            });
            return false;
        });
        
        
        jQuery(window).smartresize(function(){
            jQuerycontainer.isotope({
                // update columnWidth to a percentage of container width
                masonry: {
                    columnWidth: jQuerycontainer.width() / jQueryresize
                }
            });
        });
    }  
*/

  // fancybox
    /*
      jQuery('.fancybox').fancybox();
    */


  if (typeof Modernizr !== 'undefined' && Modernizr.mq('screen and (max-width:1024px)')) {
      jQuery('body').toggleClass('body');
      
  } else {
    if (typeof skrollr !== 'undefined') {
      var s = skrollr.init({
      mobileDeceleration: 1,
      edgeStrategy: 'set',
      forceHeight: true,
      smoothScrolling: true,
      smoothScrollingDuration: 300,
        easing: {
          WTF: Math.random,
          inverted: function(p) {
            return 1-p;
          }
        }
      }); 
    }
  }



  //scroll menu
  if (jQuery('.appear').appear) {
    jQuery('.appear').appear();
    jQuery('.appear').on('appear', function(data) {
        var id = jQuery(this).attr('id');
        jQuery('.nav li').removeClass('active');
        jQuery('.nav a[href=#' + id + ']').parent().addClass('active');          
    });
  }


  //parallax
    var isMobile = false;

    if(typeof Modernizr !== 'undefined' && Modernizr.mq('only all and (max-width: 1024px)') ) {
        isMobile = true;
    }

    
    if (isMobile === false && (jQuery('#parallax1').length  ||isMobile === false &&  jQuery('#parallax2').length ||isMobile === false &&  jQuery('#testimonials').length))
    {


        jQuery(window).stellar({
            responsive:true,
            scrollProperty: 'scroll',
            parallaxElements: false,
            horizontalScrolling: false,
            horizontalOffset: 0,
            verticalOffset: 0
        });

    }

})(jQuery);