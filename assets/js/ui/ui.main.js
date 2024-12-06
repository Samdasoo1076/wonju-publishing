$(function(){
    $('#fullpage').fullpage({
        // 옵션 설정
		// responsiveWidth: 767,
        licenseKey: '',
        scrolloverflowmacstyle: true,
		normalScrollElements: '.modal',
        'onLeave' : function (index, nextIndex, direction){
			var $gnbarea = $(".gnb-area");
            // theme
			if ( nextIndex.index === 1 ){
				if ($(window).width() < 768) {
					$('.header-mobile-sec .gnb-area').addClass('active');
				}
			} else if ( nextIndex.index === 2 ){
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
