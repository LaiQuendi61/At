$(document).ready(function () {
    const questionSelector = $("#question");
    questionSelector.click(function () {
        questionSelector.toggleClass('full')
        $(".jhide").toggle();
    });
    $("#daire").click(function(){
        $(":root").css("background-color","#222222");
        $(".btn").css("background-color","rgb(58, 58, 58)");
        $(".btn").css("border","black");
    });
});