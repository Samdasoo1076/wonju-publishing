/*-------------------------------------------------------------------
	분류순서
	- @ Init		: 초기실행
	- @ Settings	: 기본설정
	- @ Layout		: 레이아웃
	- @ Contents	: 컨텐츠전체
-------------------------------------------------------------------*/
/*-------------------------------------------------------------------
	@ Init
-------------------------------------------------------------------*/
function initUI() {
	// Setting
	setDeviceStatus(); // 디바이스 설정
	setScrollStatus(); // 스크롤 상태 설정

	// Layout
	setGnb.init();
	setHeader.init();
	setSearch();

	// Content
	destroySlimSelects();
	snbSwiper();
}

$(function(){
	initUI();
});

/*-------------------------------------------------------------------
	@ Settings
-------------------------------------------------------------------*/
/* 디바이스 설정 */
function setDeviceStatus(){
    // 플랫폼 정보 가져오기
    var os = platform.os.family;  // 운영체제 정보
    var browserName = platform.name;  // 브라우저 이름
    var browserVersion = platform.version;  // 브라우저 버전
    var isMobile = platform.mobile;  // 모바일 여부

	// OS에 따른 클래스 추가
	var osClasses = {
		'iOS': 'os-ios',
		'Android': 'os-android',
		'Windows': 'os-windows',
		'macOS': 'os-macos',
		'Linux': 'os-linux'
	};
	$('html').addClass(osClasses[os] || 'os-unknown');

	// 브라우저 이름에 따른 클래스 추가
	var browserClasses = {
		'Chrome': 'browser-chrome',
		'Firefox': 'browser-firefox',
		'Safari': 'browser-safari',
		'Edge': 'browser-edge',
		'IE': 'browser-ie'
	};
	$('html').addClass(browserClasses[browserName] || 'browser-unknown');

	// 모바일 여부에 따른 클래스 추가
	$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');

    // 추가적으로 원하는 클래스는 여기에 추가 가능
    // console.log("OS: " + os, "브라우저: " + browserName + " " + browserVersion);
}

/* 스크롤 상태 설정 */
function setScrollStatus(){
    var scrollEndTime;
    var oldScrTop = $(window).scrollTop(); // 초기 스크롤 위치 설정
    var isScrFirst = oldScrTop === 0;    // 스크롤이 처음인지 확인
    var isScrLast = oldScrTop + $(window).outerHeight() === $(document).height(); // 스크롤이 끝인지 확인

    // 처음과 마지막 스크롤 상태 설정
    $('body').toggleClass('is-scroll-first', isScrFirst);
    $('body').toggleClass('is-scroll-last', isScrLast);

    // 스크롤 이벤트 처리
    $(window).off('scroll.customEvent').on('scroll.customEvent', function() {
        var curScrTop = $(window).scrollTop();

        // 스크롤 방향 처리
        if (oldScrTop > curScrTop) {
            $('body').addClass('is-scroll-up').removeClass('is-scroll-down');
            $(window).trigger('scrollUp');
        } else if (oldScrTop < curScrTop) {
            $('body').addClass('is-scroll-down').removeClass('is-scroll-up');
            $(window).trigger('scrollDown');
        }
        oldScrTop = curScrTop;

        // 스크롤 종료 처리
        clearTimeout(scrollEndTime);
        scrollEndTime = setTimeout(function() {
            $(window).trigger('scrollEnd');
        }, 100);

        // 스크롤 상태 업데이트
        isScrFirst = curScrTop === 0;
        isScrLast = curScrTop + $(window).outerHeight() >= $(document).height();
        $('body').toggleClass('is-scroll-first', isScrFirst);
        $('body').toggleClass('is-scroll-last', isScrLast);
    });
}

/*-------------------------------------------------------------------
	@ Layout
-------------------------------------------------------------------*/
// Set GNB
var setGnb = {
	init : function(){
		this.event();
	},
	event : function(){
		var $gnbarea = $(".gnb-area");
		var $headerNav = $('.header-pc-sec .header-nav');
		var $dep1ItemAll = $headerNav.find('.dep1-item');
		var setTime = null;
		var _this = this;
		var $btnSearch = $(".gnb-area .btn-search");

		$gnbarea.on("mouseenter", function() {
			$(this).addClass("active");
		  });

		$gnbarea.on("mouseleave", function() {
			// btn-search에 show 클래스가 없을 때만 active 클래스를 제거
			if (!$btnSearch.hasClass("show")) {
				$(this).removeClass("active");
			}
		});


		// 마우스 기본기능
		$dep1ItemAll.off('mouseenter.gnb').on('mouseenter.gnb', function(e){
			var $this = $(this);
			// 지나가는 마우스가 아닌 경우 mouseenter 실행.
			setTime = setTimeout(() => {
				_this.show($dep1ItemAll, $this);
			}, 100);
		})
		$headerNav.off('mouseleave.gnb').on('mouseleave.gnb', function(e){
			_this.hide($dep1ItemAll, $(this).find('.dep1-item.is-active'));
			// 마우스가 지지나가면 mouseenter 실행안되게 setTime 초기화
			clearTimeout(setTime);
		})

		// 키보드 접근성
		$dep1ItemAll.off('focusin.gnb').on('focusin.gnb', function(e){
			_this.show($dep1ItemAll, $(this));
			// 포커스가 유지되면 focusout 실행안되게 setTime 초기화나
			clearTimeout(setTime);
		})
		$dep1ItemAll.off('focusout.gnb').on('focusout.gnb', function(e){
			var $this = $(this);
			// focusin 않을시 초기화 되지 않고 focusout 실행.
			setTime = setTimeout(() => {
				_this.hide($dep1ItemAll, $this);
			}, 50);
		})
		if ($('.gnb-area').length) {
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
				let scrollTop = $(window).scrollTop();

				if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

				if (scrollTop > lastScrollTop && scrollTop > $('.gnb-area').outerHeight()) {
					// Scroll Down
					$('.gnb-area').removeClass('down').addClass('up');

				} else {
					// Scroll Up
					if (scrollTop + $(window).height() < $(document).height()) {
						$('.gnb-area').removeClass('up').addClass('down');

					}
					if (scrollTop < $('.gnb-area').outerHeight()) {
						$('.gnb-area').removeClass('down');
					}
				}
				lastScrollTop = scrollTop;
			}
		}

		/* 탑버튼 */
		const btnTop = document.querySelector(".btn_top");
		if (btnTop) {
			btnTop.addEventListener("click", (e) => {
				e.preventDefault(); // 기본 링크 동작 방지

				// 부드럽게 상단으로 스크롤
				window.scrollTo({
					top: 0, // 스크롤의 최상단
					behavior: "smooth", // 부드러운 스크롤 효과
				});
			});
		}
	},
	show : function($dep1ItemAll, $dep1ItemActive){
		var $dep2Wrap = $dep1ItemAll.find('.dep2-list-wrap');
		$dep2Wrap.stop().slideDown(200);
		$dep1ItemActive.addClass('is-active');

		$('.header-nav-bg').stop().slideDown(200);

	},
	hide : function($dep1ItemAll, $dep1ItemActive){
		var $dep2Wrap = $dep1ItemAll.find('.dep2-list-wrap');
		$dep1ItemActive.removeClass('is-active');
		// 더 이상 활성화된 메뉴가 없으면 배경을 닫기
		if (!$('.dep1-item.is-active').length) {
			$dep2Wrap.stop().slideUp(200);
			$('.header-nav-bg').stop().slideUp(200);
		}
	},
}

// 서브레이아웃 헤더
var setHeader = {
	init: function(){
		if ($('.sub-wrapper').length) {
			if ($('.visual-wrap').length) {
				this.event();
			} else {
				setHeader.set();
			}
		}


		if ($('.sub-wrapper.gnb-bg').length) {
			$('.gnb-area').addClass("active");
			$('.gnb-area').on("mouseleave", function() {
				$(this).addClass("active");
			});
		}
	},
	event: function(){
		var _this = this;
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.create({
			trigger: '.snb-wrap',
			start: 'top 0px',
			end: 'top 72px',
			markers: false,
			onEnter: () => {
				setHeader.set();
			},
			onLeaveBack: () => {
				setHeader.reset();
			}
		});
	},
	set: function(){
		$('.gnb-area').addClass('active');
	},
	reset: function(){
		$('.gnb-area').removeClass('active');
	}
};


// Set Search
function setSearch() {
    const $btnSearch = $('.btn-search');
    const $headerSearch = $('.header-search');

    if ($btnSearch.length) {
        // console.log($btnSearch);

        // 버튼 클릭 시 드롭다운 토글
        $btnSearch.off('click').on('click', function (e) {
            e.preventDefault(); // 기본 동작 방지
            const isExpanded = $(this).attr('aria-expanded') === 'true';
            $(this).attr('aria-expanded', !isExpanded);
            $headerSearch.toggleClass('show');
        });

        // 검색 영역 외 클릭 시 닫기
        $(document).off('click.search').on('click.search', function (e) {
            if (!$headerSearch.is(e.target) && !$headerSearch.has(e.target).length && !$btnSearch.is(e.target)) {
                $headerSearch.removeClass('show');
                $btnSearch.attr('aria-expanded', 'false');
            }
        });
    }
}

/* snb - 모바일에서만 swiper */
function snbSwiper() {
	if ($('.snb-wrap').length) {
		var ww = $(window).width();
		var snbSwiper = undefined;

		snbSwiper = new Swiper(".snb-wrap .swiper-container", {
			slidesPerView: 'auto',
			simulateTouch: true,
			threshold: 3,
			resistance: true,
			resistanceRatio: false
		});
	}
}


// $(window).on('resize', function () {
// 	ww = $(window).width();
// 	initSwiper();
// });

/*-------------------------------------------------------------------
	@ Content
-------------------------------------------------------------------*/
// Input Clear
function InputClearHandler(id) {
	$(id).val('').focus();
}

// Select Library
function destroySlimSelects() {
	document.querySelectorAll('select').forEach((select) => {
		// 부모 요소의 클래스 중 'h-'로 시작하는 클래스 검색
		const parentClass = Array.from(select.parentElement.classList).find(className => className.startsWith('h-'));

		// 'h-'로 시작하는 클래스가 있으면 select 요소에 추가
		if (parentClass) {
			// 소스가 분리된 select option에도 크기별로 반응형 대응을 해야 함
			select.classList.add(parentClass);
		}

		new SlimSelect({
			showSearch: false,
			focusSearch: false,
			select: select
		});
	});

	//게시판 상세 페이저 글없을경우 링크제거
	// document.querySelector(".pager.disabled .link").removeAttribute('href');
}


//복사하기 버튼
function copy() {
	// 복사문구값 가져오기
	var copyTxt = document.getElementById("copyTxt");

	// 복사문구 선택
	copyTxt.select();
	copyTxt.setSelectionRange(0, 99999); // Mobile 대응

	 // 복사
	navigator.clipboard.writeText(copyTxt.value);

	// 복사완료에 대해 Alert으로 띄우기
	alert("복사되었습니다.");
}