/*-------------------------------------------------------------------
	분류순서
	- @ Publish	    : 레이아웃
	- @ Init	    : 초기실행
-------------------------------------------------------------------*/
$(function(){
	$(".header").each(function(){
		$(this).load("../../html/layout/include_header.html", function(){
			console.log('[INFO] 퍼블리싱 header.html 인클루드 완료');
			initUI();
		});
	})
	$(".footer").each(function(){
		$(this).load("../../html/layout/include_footer.html", function(){
				console.log('[INFO] 퍼블리싱 footer.html 인클루드 완료');
				initUI();
		});
	});
});
