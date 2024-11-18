<<<<<<< HEAD
// 2024-07-17 성신여대 입학처 운영소스는 불필요하여 신규로 생성함
$(function(){
    $(window).scroll(function(){
        var position = $(window).scrollTop();

    });

    $('#fullpage').fullpage({
        // 옵션 설정
        licenseKey: 'Y88M9-3PIK7-00K7J-QJR57-IOOOO',
        // scrollOverflow: true,
        scrolloverflowmacstyle: true,
        // scrollHorizontally: true,
        // footer를 정상 스크롤 요소로 지정
        // normalScrollElements: '.sec_08',
        'onLeave' : function (index, nextIndex, direction){
            // theme
            if ( nextIndex.index === 0 || nextIndex.index === 1 || nextIndex.index === 2 || nextIndex.index === 6 || nextIndex.index === 7 ){
                $('.gnb-area').addClass('active');
				$('.gnb-area').removeClass('up').addClass('down');
            } else {
                $('.gnb-area').removeClass('active');
				$('.gnb-area').removeClass('down').addClass('up');
            };

            // // fixed
            // if ( nextIndex.index === 0 || nextIndex.index === 1 ) {
            //     $('.gnb-area').removeClass('down').addClass('up');
            // } else {
            //     $('.gnb-area').removeClass('up').addClass('down');
            // }

            // topbtn
            if ( nextIndex.index === 0){
				$('.gnb-area').removeClass('active');
				$('.gnb-area').removeClass('down');
                $('.topBtn').css('display', 'none');
            } else {
                $('.topBtn').css('display', 'flex');
            }
        }
    });

	
	

    var sec02_swiper = new Swiper(".sec_02 .swiper", {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 12,
        navigation: {
          nextEl: ".sec_02 .swiper-button-next",
          prevEl: ".sec_02 .swiper-button-prev",
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
            },
            760: {
                slidesPerView: 3.5,
                slidesPerGroup: 1,
                spaceBetween: 20,
            },
        }
    });
    var sec03_swiper = new Swiper(".sec_03 .swiper", {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 12,
        navigation: {
          nextEl: ".sec_03 .swiper-button-next",
          prevEl: ".sec_03 .swiper-button-prev",
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
            },
            760: {
                slidesPerView: 3.5,
                slidesPerGroup: 1,
                spaceBetween: 20,
            },
        }
    });

    // 06
    let sec06Swiper;
    function initializeSwiper() {
        if (!sec06Swiper) {
            sec06Swiper = new Swiper(".sec_06 .swiper", {
                slidesPerView: 'auto',
                spaceBetween: 20,
                loop: true,
                centeredSlides: true,
                navigation: {
                    nextEl: ".sec_06 .swiper-button-next",
                    prevEl: ".sec_06 .swiper-button-prev",
                },
                breakpoints: {
                    1240: {
                        spaceBetween: 80,
                    },
                    1024: {
                        spaceBetween: 40,
                    },
                }
            });
        }
    }

    // 07
    var sec07_swiper = new Swiper(".sec_07 .swiper", {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: ".sec_07 .swiper-button-next",
            prevEl: ".sec_07 .swiper-button-prev",
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 50,
            },
            1240: {
                slidesPerView: 4,
                spaceBetween: 50,
            },
            1600: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        }
    });

    function destroySwiper() {
        if (sec06Swiper) {
            sec06Swiper.destroy(true, true);
            sec06Swiper = null;
        }
    }

    function handleResize() {
        if (window.innerWidth > 520) {
            // Landscape mode
            initializeSwiper();
        } else {
            // Portrait mode
            destroySwiper();
        }``
    }

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
})

function tab(btn, id) {
    $(btn).addClass('is_selected').siblings().removeClass('is_selected');
    $('#'+id).addClass('is_visible').siblings().removeClass('is_visible');
}
function secColor($sec, color) {
    $($sec).attr('data-color', color);
}
=======
$(function(){
    $('#fullpage').fullpage({
        // 옵션 설정
		responsiveWidth: 767,
        licenseKey: '',
        scrolloverflowmacstyle: true,
        'onLeave' : function (index, nextIndex, direction){
			var $gnbarea = $(".gnb-area");
            // theme
            if ( nextIndex.index === 2 ){
                $('.gnb-area').addClass('active');
				$gnbarea.on("mouseenter", function() {
					$(this).addClass("active");
				  });
				$gnbarea.on("mouseleave", function() {
					$(this).addClass("active");
				});
            } else {
				// btn-search에 show 클래스가 없을 때만 active 클래스를 제거
				if (!$(".gnb-area .btn-search").hasClass("show")) {
					$('.gnb-area').removeClass("active");
				}
            };

            // topbtn
            if ( nextIndex.index === 0){
                $('.topBtn').css('display', 'none');
            } else {
                $('.topBtn').css('display', 'flex');

				
            }

			// 예약현황 크기
			if ( nextIndex.index === 1 || nextIndex.index === 2 || nextIndex.index === 3 || nextIndex.index === 4) {
				$('.reservation-wrap').addClass('small');
				
			} else {
				$('.reservation-wrap').removeClass('small');
			};
        }
    });
});


// 풀페이지 활성/비활성
function setFullpageEvent(id) {
	$(document).on('show.bs.modal', id, function () {
		if (typeof fullpage_api !== 'undefined') {
			fullpage_api.setAllowScrolling(false);
			console.log(id + " Fullpage: false");
		}
	}).on('hidden.bs.modal', id, function () {
		if (typeof fullpage_api !== 'undefined') {
			fullpage_api.setAllowScrolling(true);
			console.log(id + " Fullpage: true");
		}
	});
}
setFullpageEvent('#mobileNavModal'); //모바일 전체메뉴
setFullpageEvent('#sitemap'); // PC 사이트맵

>>>>>>> 45cbd4232d9cb40aef0583bee17659676b384835
