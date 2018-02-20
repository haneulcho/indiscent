 /*
  _____      						 _______
 |  __ \  							|_ _ _ _| _
 | |__) | 					     _	   | |	 | |
 |  ___/    ___    __ _    __ _  | |    | |	 | |__     ___ 	 _ __  _ __    ___
 | |\ \    / _ \  / _` |  / _` | | |    | |	 | '_ \   / _ \ | '_ \| '_ \  / _ \
 | | \ \  |  __/ | (_| | | (_| | | |    | |	 | | | | |  __/ | |  ||  | | |  __/
 |_|  \ \  \___|  \__, |  \__,_| |_|    |_|   |_| |_|  \___| |_|  ||  |_|  \___|
                   __/ |
                  |___/
 ================================================================================ */
 (function($) {
     "use strict";

     /*
     MOBILE MENU
     ================================== */
     //  Main menu
     var MainLiDrop = $('.mainmenu li.dropdown,.mainmenu li.sub-dropdown');
	 var droPBtn = $('<div class="dropdown-btn"></div>');
     MainLiDrop.append(droPBtn);
     //Dropdown Button
     var MainLiDDbtn = $('.mainmenu li.dropdown .dropdown-btn');
     MainLiDDbtn.on('click', function() {
         $(this).toggleClass('submenu-icon');
         $(this).prev('ul').slideToggle(400);
		 return false;
     });

     /*
     STICKY
     ================================== */
     var AcSticky = $('.active-sticky');
     var WinD = $(window);
     WinD.on('scroll', function() {
         var scroll = $(window).scrollTop();
         var AESticky = AcSticky;
         if (scroll < 1) {
             AESticky.removeClass("is-sticky");
         } else {
             AESticky.addClass("is-sticky");
         }
		 return false;
    });
    var AcSticky2 = $('.active-sticky-2');
    var WinD = $(window);
    WinD.on('scroll', function() {
         var scroll = $(window).scrollTop();
         var AESticky2 = AcSticky2;
         if (scroll < 100) {
             AESticky2.removeClass("is-sticky");
         } else {
             AESticky2.addClass("is-sticky");
         }
		 return false;
    });

     /*
	 Menu A Active Jquery
     ================================== */
	 var pgurl = window.location.href.substr(window.location.href
		.lastIndexOf("/")+1);
		var aActive = $('ul li a');
		aActive.each(function(){
		if($(this).attr("href") === pgurl || $(this).attr("href") === '' )
		$(this).addClass("active");
	 })

     /*
     ISOTOPE ACTIVE
     ================================ */
     // isotope menu
     var ProjMli = $('.ingre-menu li');
     ProjMli.on('click', function() {
		 var ProjGrid = $('.ingre-grid');
         ProjMli.removeClass("active");
         $(this).addClass("active");
         var selector = $(this).attr('data-filter');
         ProjGrid.isotope({
             filter: selector,
             animationOptions: {
                 duration: 750,
                 easing: 'linear',
                 queue: false
             }
         });
     });

	/*
	VENOBOX ACTIVE
	================================ */
	var VenBOx = $('.venobox');
	VenBOx.venobox();
	var VenBOxv = $('.venoboxvid');
	VenBOxv.venobox();

     /*
     SLICK CAROUSEL AS NAV
     ===================================*/
     var OneITem = $('.one-item');
     var TesITem = $('.title-slick-item');
     OneITem.slick({
         dots: false,
         arrows: true,
         prevArrow: '<i class="prev zmdi zmdi-chevron-left"></i>',
         nextArrow: '<i class="next zmdi zmdi-chevron-right"></i>'
     });
	TesITem.slick({
		 dots: false,
		 arrows: false,
		 autoplay: true,
		 autoplaySpeed: 4000
	});

     /*
     SCROLLUP
     ================================ */
     $.scrollUp({
         scrollText: '<i class="zmdi zmdi-long-arrow-up"></i>',
         easingType: 'linear',
         scrollSpeed: 500,
         animation: 'slide'
    });

     /*
     LOAD MORE JQUERY
     ================================== */
	var list1 = $(".more-load");
	var numToShow1 = 3;
	var button1 = $("#load-more-btn");
	var numInList1 = list1.length;

	list1.hide();
	if (numInList1 > numToShow1) {
		button1.show();
	}
	list1.slice(0, numToShow1).show();
	button1.on('click',function(){
		var showing1 = list1.filter(':visible').length;
		list1.slice(showing1 - 1, showing1 + numToShow1).fadeIn();
		var nowShowing1 = list1.filter(':visible').length;
		if (nowShowing1 >= numInList1) {
		button1.hide();
		}

		var MasCol = $('.ingre-grid');
		MasCol.isotope('layout');
	});
	var PoMe_li = $('.ingre-menu li:not(:first-child)');
	PoMe_li.on('click',function(){
		button1.hide();
  });

 /*
 WINDOW LOAD FUNCTIONS
 ================================== */
    WinD.on('load', function() {
         // Preloader
         var preeLoad = $('#loading-wrap');
         preeLoad.fadeOut(1000);

         // isotope fitRows grid
         var IsoGriddoload = $('.fitRows-grid');
         IsoGriddoload.isotope({
             itemSelector: '.grid-item',
             // layout mode options
             layoutMode: 'fitRows'
         });
         // isotope masonry grid
         var IsoGriddoload = $('.masonry-grid');
         IsoGriddoload.isotope({
             itemSelector: '.grid-item',
             // layout mode options
             masonryHorizontal: {
                 rowHeight: 100
             }
         });

     });

  $.fn.toJSON = function () {
    var $elements = {};
    var $form = $(this);
    $form.find('input, select, textarea').each(function () {
      var name = $(this).attr('name');
      var type = $(this).attr('type');
      if (name) {
        var $value;
        if (type == 'radio') {
          $value = $('input[name='+name+']:checked', $form).val();
        } else if (type == 'checkbox') {
          $value = $(this).is(':checked');
        } else {
          $value = $(this).val();
        }
        $elements[$(this).attr('name')] = $value;
      }
    });
    return JSON.stringify( $elements );
  };

  $.fn.fromJSON = function (json_string) {
    var $form = $(this);
    var data = JSON.parse(json_string);
    $.each(data, function (key, value) {
      var $elem = $('[name="'+key+'"]', $form);
      var type = $elem.first().attr('type');
      if (type == 'radio') {
        $('[name="'+key+'"][value="'+value+'"]').prop('checked', true);
      } else if(type == 'checkbox' && (value == true || value == 'true')){
        $('[name="'+key+'"]').prop('checked', true);
      } else {
        $elem.val(value);
      }
    });
  };

 })(jQuery);
