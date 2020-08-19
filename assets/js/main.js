/*========Loader js===========*/
$(window).on('load', function () {
	$(".loader").slideUp("slow");
	$("body").addClass("animate");
	$("html").addClass("animate");
});
/*=============== Counter ==============*/
$(document).ready(function () {
	'use strict';
	var a = 0;
	$(window).scroll(function () {

		var oTop = $('#counter').offset().top - window.innerHeight;
		if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
						countNum: countTo
					},

					{

						duration: 2000,
						easing: 'swing',
						step: function () {
							$this.text(Math.floor(this.countNum));
						},
						complete: function () {
							$this.text(this.countNum);
							//alert('finished');
						}

					});
			});
			a = 1;
		}

	});
});
/*========Menu js============*/
$(document).ready(function () {
	'use strict';
	$(".nav-button-container").bind('click', function () {
		if ($('.nav-custom').hasClass("active")) {
			$('.nav-custom').removeClass("active");
			$('.nav-menu').removeClass("active");
		} else {
			$('.nav-custom').addClass("active");
			$('.nav-menu').addClass("active");
		}
	});

	$(".nav-menu-item li a").mouseover(function () {
		$(".nav-item-img li.active").removeClass("active");
		var a = $(this).parents("li").index() + 1;
		$(".nav-item-img li:nth-of-type(" + a + ")").addClass("active");
	});
	$(".nav-menu-item li a").mouseleave(function () {
		$(".nav-item-img li.active").removeClass("active");
	});
});

/* ============= Testimonial Slider =========*/
$(document).ready(function () {
	'use strict';
	$('.testimonial-slider').slick({
		infinite: true,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: $(".testimonial-arrow-left"),
		nextArrow: $(".testimonial-arrow-right"),
		autoplay: false,
		autoplaySpeed: 4000,
		speed: 1000,
		cssEase: 'ease-in-out',
		fade: true,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}

		}]
	});
});
/* ============= Team Slider =========*/
$(document).ready(function () {
	'use strict';
	$(document).ready(function () {
		$('.slider').slick('slickGoTo', 0);
	});
	$(".our-team-slider-one").click(function () {
		if ($(this).attr("data-slick-index") < -1) {
			$(this).parents(".slider").slick('slickGoTo', $(".our-team-slider").slick("getSlick").slideCount - Math.abs($(this).attr("data-slick-index")));
		} else {
			$(this).parents(".slider").slick('slickGoTo', $(this).attr("data-slick-index"));
		}
	});
	$('.slider').on('afterChange', function (event, slick, currentSlide, direction) {
		$(this).parents(".our-team-inner").find('.our-team-data').find('.active').removeClass('active');
		var i = (currentSlide ? currentSlide : 0) + 1;
		$($(this).parents(".our-team-inner").find('.our-team-data li:nth-child(' + i + ')').addClass('active')).animate({
			opacity: 0
		}, 0, function () {
			$(this).animate({
				opacity: 1
			}, 2000, function () {
				// Animation complete.
			});
		});
	});

	$('.our-team-slider').slick({
		dots: false,
		infinite: true,
		speed: 750,
		slidesToShow: 2,
		prevArrow: $(".team-arrow-left"),
		nextArrow: $(".team-arrow-right"),
		centerMode: true,
		centerPadding: 30,
		initialSlide: 0,
		customPaging: function (slick, index) {
			return '<a> 0' + (index + 1) + '</a>';
		},
		responsive: [{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
			},

		}]
	});
});
/* ============= Custom Select Picker=========*/
$(document).ready(function () {
	'use strict';
	$("select").each(function () {
		'use strict';
		var $this = $(this),
			numberOfOptions = $(this).children("option").length;

		$this.addClass("select-hidden");
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select-styled"></div>');

		var $styledSelect = $this.next("div.select-styled");
		$styledSelect.text(
			$this
			.children("option")
			.eq(0)
			.text()
		);

		var $list = $("<ul />", {
			class: "select-options"
		}).insertAfter($styledSelect);

		for (var i = 0; i < numberOfOptions; i++) {
			$("<li />", {
				text: $this
					.children("option")
					.eq(i)
					.text(),
				rel: $this
					.children("option")
					.eq(i)
					.val()
			}).appendTo($list);
		}

		var $listItems = $list.children("li");

		$styledSelect.on('click', function (e) {
			e.stopPropagation();
			$("div.select-styled.active")
				.not(this)
				.each(function () {
					$(this)
						.removeClass("active")
						.next("ul.select-options")
						.hide();
				});
			$(this)
				.toggleClass("active")
				.next("ul.select-options")
				.toggle();
		});

		$listItems.on('click', function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass("active");
			$this.val($(this).attr("rel"));
			$list.hide();
			//console.log($this.val());
		});

		$(document).on('click', function () {
			$styledSelect.removeClass("active");
			$list.hide();
		});
	});
});
/* =============Hero Slider =========*/
$(document).ready(function () {
	'use strict';

	var interleaveOffset = 0.5;
	var swiperOptions = {
		loop: true,
		speed: 1000,
		parallax: true,
		grabCursor: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			progress: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress;
					var innerOffset = swiper.width * interleaveOffset;
					var innerTranslate = slideProgress * innerOffset;
				}
			},
			touchStart: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = "";
				}
			},
			setTransition: function (speed) {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + "ms";
					swiper.slides[i].querySelector(".slide-inner").style.transition =
						speed + "ms";
				}
			}
		}
	};

	var swiper = new Swiper(".swiper-container", swiperOptions);


	// SWIPER CAROUSEL
	var $swiper = $(".swiper-carousel");
	var $bottomSlide = null; // Slide whose content gets 'extracted' and placed
	var $bottomSlideContent = null; // Slide content that gets passed between the  
	var mySwiper = new Swiper(".swiper-carousel", {
		spaceBetween: 0,
		slidesPerView: 2,
		centeredSlides: true,
		roundLengths: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		loop: true,
		loopAdditionalSlides: 0,

	});


});

/*===contact form js====*/
$(".contact-form-input input").focusout(function () {
	'use strict';
	if ($(this).val() != "") {
		$(this).parents(".contact-form-input").find("label").addClass("active");
	} else {
		$(this).parents(".contact-form-input").find("label").removeClass("active");
	}
});
$(".contact-form-input textarea").focusout(function () {
	'use strict';
	if ($(this).val() != "") {
		$(this).parents(".contact-form-input").find("label").addClass("active");
	} else {
		$(this).parents(".contact-form-input").find("label").removeClass("active");
	}
});

/*=============Map Js=================*/
function initMap() {
	// Styles a map in night mode.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 40.674,
			lng: -73.945
		},
		zoom: 12,
		styles: [{
				"elementType": "geometry",
				"stylers": [{
					"color": "#f5f5f5"
				}]
			},
			{
				"elementType": "labels.icon",
				"stylers": [{
					"visibility": "off"
				}]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#616161"
				}]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [{
					"color": "#f5f5f5"
				}]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#bdbdbd"
				}]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [{
					"color": "#eeeeee"
				}]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#757575"
				}]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [{
					"color": "#e5e5e5"
				}]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#9e9e9e"
				}]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [{
					"color": "#ffffff"
				}]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#757575"
				}]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dadada"
				}]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#616161"
				}]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#9e9e9e"
				}]
			},
			{
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [{
					"color": "#e5e5e5"
				}]
			},
			{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [{
					"color": "#eeeeee"
				}]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [{
					"color": "#c9c9c9"
				}]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#9e9e9e"
				}]
			}
		]
	});
}
/*============PHP Contact Form===========*/
$(document).ready(function () {
	'use strict';
	$(".contact-form").submit(function (event) {
		event.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'contact.php',
			data: $(this).serialize(),
			success: function (text) {
				$(".error-msg").append("<div class='text-center mail-text'>" + text + "</div>")

			}
		});
	});
});