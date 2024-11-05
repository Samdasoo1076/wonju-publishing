/*-------------------------------------------------------------------
	분류순서
	- @ Components	: 컴포넌트
	- @ Content		: 컨텐츠
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
	@ Layout
-------------------------------------------------------------------*/
var setGnb = {
	init : function(){
		this.event();
	},
	event : function(){
		var $headerNav = $('.header-pc-sec .header-nav');
		var $dep1ItemAll = $headerNav.find('.dep1-item');
		var setTime = null;
		var _this = this;

		// 마우스 기본기능
		$dep1ItemAll.off('mouseenter.gnb').on('mouseenter.gnb', function(e){
			var $this = $(this);
			// 지나가는 마우스가 아닌 경우 mouseenter 실행.
			setTime = setTimeout(() => {
				_this.show($this);
			}, 100);
		})
		$headerNav.off('mouseleave.gnb').on('mouseleave.gnb', function(e){
			_this.hide($(this).find('.dep1-item.is-active'));
			// 마우스가 지지나가면 mouseenter 실행안되게 setTime 초기화
			clearTimeout(setTime);
		})

		// 키보드 접근성
		$dep1ItemAll.off('focusin.gnb').on('focusin.gnb', function(e){
			_this.show($(this));
			// 포커스가 유지되면 focusout 실행안되게 setTime 초기화나
			clearTimeout(setTime);
		})
		$dep1ItemAll.off('focusout.gnb').on('focusout.gnb', function(e){
			var $this = $(this);
			// focusin 않을시 초기화 되지 않고 focusout 실행.
			setTime = setTimeout(() => {
				_this.hide($this);
			}, 50);
		})
	},
	show : function($dep1ItemActive){
		var $siblings = $dep1ItemActive.siblings('.is-active');
		$('.dep2-list-wrap').stop().slideDown(200);
		$('.header-nav-bg').stop().slideDown(200);
		$('.gnb-area').addClass('active');
	},
	hide : function($dep1ItemActive){
		$('.dep2-list-wrap').stop().slideUp(200);
		// 더 이상 활성화된 메뉴가 없으면 배경을 닫기
		if (!$('.dep1-item.is-active').length) {
			$('.header-nav-bg').stop().slideUp(200);
		}
		$('.gnb-area').removeClass('active');
	},
}

// header 스크롤
let didScroll;
let lastScrollTop = 0;
let delta = 5;

$(window).on('scroll', function() {
    didScroll = true;
})

setInterval(function () {
    if (didScroll) {
        headerScroll();
        didScroll = false;
    }
}, 250);

function headerScroll() {
    let scrollTop = $(this).scrollTop();

    if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

    if (scrollTop > lastScrollTop && scrollTop > $('.gnb-area').outerHeight()) {
        // Scroll Down
        $('.gnb-area').removeClass('down').addClass('up');
        $('.btn_floating').removeClass('hide').addClass('show');
        $('.btn_floating.fixed').removeClass('hide').addClass('show'); // kyr 추가

        if(scrollTop > $('.footer').offset().top - $(window).innerHeight()){
            $('.btn_floating').removeClass('show').addClass('hide');
            $('.btn_floating.fixed').removeClass('hide').addClass('show'); // kyr 추가
        }

    } else {
        // Scroll Up
        if (scrollTop + $(window).height() < $(document).height()) {
            $('.gnb-area').removeClass('up').addClass('down');

            if(scrollTop < $('.footer').offset().top - $(window).innerHeight()){
                $('.btn_floating').removeClass('hide').addClass('show');
                $('.btn_floating.fixed').removeClass('hide').addClass('show'); // kyr 추가
            }
        }
        if (scrollTop < $('.gnb-area').outerHeight()) {
            $('.gnb-area').removeClass('down');
            $('.btn_floating').removeClass('show').addClass('hide');
            $('.btn_floating.fixed').removeClass('hide').addClass('show'); // kyr 추가
        }
    }
    lastScrollTop = scrollTop;
}


/*-------------------------------------------------------------------
	@ Common
-------------------------------------------------------------------*/
// Input Clear
function setInputClear(id) {
	$(id).val('').focus();
}

/*-------------------------------------------------------------------
	@ Components
-------------------------------------------------------------------*/


/*-------------------------------------------------------------------
	@ Contents
-------------------------------------------------------------------*/


/*-------------------------------------------------------------------
	@ Init
-------------------------------------------------------------------*/
$(function(){
	setGnb.init();
})
