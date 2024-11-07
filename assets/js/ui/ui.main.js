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
            if ( nextIndex.index === 0 || nextIndex.index === 1 || nextIndex.index === 2 || nextIndex.index === 3 || nextIndex.index === 4 || nextIndex.index === 5 ){
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