$(document).ready(function () {
    const questionSelector = $("#question");
    const at = 

    questionSelector.click(function () {
        questionSelector.toggleClass('full')
        $(".jhide").toggle();
    });
    $("#daire").click(function(){
        $("body").toggleClass('gece-modu');
    });
});