var anchoW = $(window).width();
var altoW = $(window).height();
var owl = $('.sliderProjects .owl-carousel');
$(document).ready(function(){
	openMenu();
	globalParams();
	home();
	proyectos();
});
function globalParams(){
	anchoW = $(window).width();
	altoW = $(window).height();
	$(window).resize(function(){
		anchoW = $(window).width();
		altoW = $(window).height();
	});
	if($(window).scrollTop() > 50){
		$('header, .masks').addClass('active');
	}else{
		$('header, .masks').removeClass('active');
	}
	$(window).scroll(function(){
		if($(window).scrollTop() > 20){
			$('header, .masks').addClass('active');
		}else{
			$('header, .masks').removeClass('active');
		}
	});
}
function openMenu(){
	$('.navbar-aurora .navbar-toggle').click(function(){
		$('.navbar-aurora .sideMenuNav').toggleClass('opened');
		$(this).toggleClass('opened');
		return false;
	});
}
function home(){
	owl = $('.sliderProjects .owl-carousel');
	owl.on('initialized.owl.carousel', function(event) {
		fitCarouselToWindow(owl.parent(), owl);
		window.setTimeout(function(){
			owl.trigger('refresh.owl.carousel');
		},15);
	});
	owl.owlCarousel({
		loop:true,
		margin:10,
		responsiveClass:true,
		autoplay:true,
		animateOut:'easeInOut',
		animateIn:'easeInOut',
		responsive:{
			0:{
				items:1,
				nav:false
			},
			600:{
				items:3,
				nav:false
			},
			1000:{
				items:5,
				nav:true,
			}
		}
	});
	var owlFeatures = $('.featuresSlider');
	var blurFX = 5;
	owlFeatures.on('initialized.owl.carousel', function(event) {
		$('.featuresSlider .owl-dots').detach().appendTo('.second-section');
	});
	owlFeatures.owlCarousel({
		loop:true,
		items:1,
		nav:false,
		autoHeight:true
	});
	$('.second-section').height($('.featuresSlider').outerHeight());
	$(window).resize(function(){
		$('.second-section').height($('.featuresSlider').outerHeight());
	});
	if($(window).scrollTop() > 50){
		$('.second-section').addClass('active');
	}else{
		$('.second-section').removeClass('active');
	}
	$(window).scroll(function(){
		if($(window).scrollTop() > 20){
			$('.second-section').addClass('active');
		}else{
			$('.second-section').removeClass('active');
		}
	});
}
function fitCarouselToWindow(carousel, elementCarousel){
	console.log(anchoW);
	console.log('se ejecuta fit carousel');
	var anchoItems = $(carousel).find('.owl-item').eq(0).width();
	var offsetCarousel = $(carousel).offset().left;
	var widthCarousel = anchoW - offsetCarousel;
	var carouselContainer = $(carousel).parent();
	console.log('Ancho carousel: '+widthCarousel);
	if(anchoW < 768){
		$(carousel).css('width','auto');
		$(carouselContainer).css('width','auto');
		console.log(' -> Ancho menor a 768px');
	}else{
		$(carousel).width(widthCarousel+(anchoItems/2));
		$(carouselContainer).width(widthCarousel);
		console.log(' -> Ancho mayor a 768px');
	}
	console.log(' -> Fit to carousel incial LISTO');
	owl.trigger('refresh.owl.carousel');
	console.log('refresh');
	$(window).resize(function(){
		console.log('se ejecuta fit carousel en RESIZE');
		anchoItems = $(carousel).find('.owl-item').eq(0).width();
		offsetCarousel = $(carousel).offset().left;
		widthCarousel = anchoW - offsetCarousel;
		carouselContainer = $(carousel).parent();
		console.log('Ancho carousel: '+widthCarousel);
		if(anchoW < 768){
			$(carousel).width('width','auto');
			$(carouselContainer).css('width','auto');
			console.log(' -> Ancho menor a 768px en RESIZE');

		}else{
			$(carousel).width(widthCarousel+(anchoItems/2));
			$(carouselContainer).width(widthCarousel);
			console.log(' -> Ancho mayor a 768px en RESIZE');

		}
		console.log('RESIZED -> refresh');
		owl.trigger('refresh.owl.carousel');
	});
}
function proyectos(){
	$('.headerProyectos').height(altoW*0.6);
	if($('.headerProyectos .sliderProyectos').length >= 1){
		$('.headerProyectos .sliderProyectos').superslides({
			inherit_height_from:'.headerProyectos'
		});
	}
	$(window).resize(function(){
		console.log(altoW);
		$('.headerProyectos').height(altoW*0.6);
	});
	isScrolledIntoView('.imageGallery .itemImg');
}
// function revealImgInScroll(elements){
// 	var $toTop = $(elements);
// 	$(window).scroll(function() {
// 		//console.log('scrolling');
// 		clearTimeout($.data(this, 'waitASecond'));
// 		$toTop.stop();
//
// 		$.data(this, 'waitASecond', setTimeout(function() {
//
// 			$toTop.each(function(k,v){
// 				console.log($(v).scrollTop());
// 				if ($(v).scrollTop() > 100) {
// 					$toTop.fadeIn();
// 					console.log('apareciendo');
// 				} else if ($toTop.is(':visible')) {
// 					$toTop.fadeOut();
// 					console.log('escondiendo');
// 				}
// 			});
//
// 		}, 1000));
//
// 	});
// }
function isScrolledIntoView(elem){
	if($(elem).length > 0){
		$(elem).each(function(k,v){
			TweenMax.set($(v),{css:{transformPerspective:800, transformStyle:"preserve-3d", z:-400, y:100, autoAlpha:0,rotationX:-30}});
			var isElementInView = Utils.isElementInView($(v), false);

			if (isElementInView) {
				console.log('in view');
				TweenMax.to($(v),1,{css:{autoAlpha:1,y:0,z:0,rotationX:0}, ease: Power1.easeOut},"+=2");
			} else {
				console.log('out of view');
				TweenMax.to($(v),1,{css:{autoAlpha:0,y:100,z:-400,rotationX:-30}, ease: Power1.easeOut},"+=2");
				//$(v).fadeOut();
			}
		});
		$(window).scroll(function(){
			$(elem).each(function(k,v){
				var isElementInView = Utils.isElementInView($(v), false);

				if (isElementInView) {
					console.log('in view');
					TweenMax.to($(v),1,{css:{autoAlpha:1,y:0,z:0,rotationX:0}, ease: Power1.easeOut},"+=2");
				} else {
					console.log('out of view');
					TweenMax.to($(v),1,{css:{autoAlpha:0,y:100,z:-400,rotationX:-30}, ease: Power1.easeOut},"+=2");
				}
			});
		});
	}
}
function CBVisible(elem, visible, invisible){
	var flagOnce = false;
	if($(elem).length > 0){
		$(elem).each(function(k,v){
			var isElementInView = Utils.isElementInView($(v), false);
			if (isElementInView){
				console.log('in view');
				if(flagOnce === false){
					visible();
					flagOnce = true;
					console.log('flagOnce: '+flagOnce+', visible mode ON');
				}
			}else{
				console.log('out of view');
				if(flagOnce === true){
					if(invisible){
						invisible();
					}
					flagOnce = false;
					console.log('flagOnce: '+flagOnce+', visible mode OFF');
				}
			}
		});
		$(window).scroll(function(){
			$(elem).each(function(k,v){
				var isElementInView = Utils.isElementInView($(v), false);
				if (isElementInView){
					console.log('in view');
					if(flagOnce === false){
						visible();
						flagOnce = true;
						console.log('flagOnce: '+flagOnce+', visible mode ON');
					}
				}else{
					console.log('out of view');
					if(flagOnce === true){
						if(invisible){
							invisible();
						}
						flagOnce = false;
						console.log('flagOnce: '+flagOnce+', visible mode OFF');
					}
				}
			});
		});
	}
}

function Utils() {

}

Utils.prototype = {
	constructor: Utils,
	isElementInView: function (element, fullyInView) {
		var pageTop = $(window).scrollTop();
		var pageBottom = pageTop + $(window).height();
		var elementTop = $(element).offset().top;
		var elementBottom = elementTop + $(element).height();

		if (fullyInView === true) {
			return ((pageTop < elementTop) && (pageBottom > elementBottom));
		} else {
			return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
		}
	}
};

var Utils = new Utils();
