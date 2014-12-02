/* off-canvas sidebar toggle */


$( document ).ready(sideBarInit);

if(Meteor.isCordova) {
	document.addEventListener("deviceready", onDeviceReady, false);


}

  // Handler for .ready() called.



function onDeviceReady() {
	sideBarInit();
    // do everything here.
}

function sideBarInit() {
	$('[data-toggle=offcanvas]').click(function() {
  	$(this).toggleClass('visible-xs text-center');
    $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
    $('.row-offcanvas').toggleClass('active');
    $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
    $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
    $('#btnShow').toggle();
});
}
