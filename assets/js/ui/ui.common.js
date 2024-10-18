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
		$dep1ItemActive.addClass('is-active').find('.dep2-list-wrap').stop().slideDown(200);

		// 메뉴가 바뀐 경우 clearTimeout 때문에 닫히지 않은 메뉴 닫기
		if ($siblings.length) {
			this.hide($siblings);
		};

		$('.header-nav-bg').stop().slideDown(200);
	},
	hide : function($dep1ItemActive){
		$dep1ItemActive.removeClass('is-active').find('.dep2-list-wrap').stop().slideUp(200);
		// 더 이상 활성화된 메뉴가 없으면 배경을 닫기
		if (!$('.dep1-item.is-active').length) {
			$('.header-nav-bg').stop().slideUp(200);
		}
	},
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
