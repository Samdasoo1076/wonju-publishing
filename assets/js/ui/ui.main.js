$(function(){
    $('#fullpage').fullpage({
        // 옵션 설정
        licenseKey: '',
        scrolloverflowmacstyle: true,
        'onLeave' : function (index, nextIndex, direction){
            // theme
            if ( nextIndex.index === 2 ){
                $('.gnb-area').addClass('active');
            } else {
                $('.gnb-area').removeClass('active');
            };

            // topbtn
            if ( nextIndex.index === 0){
                $('.topBtn').css('display', 'none');
            } else {
                $('.topBtn').css('display', 'flex');
            }
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
