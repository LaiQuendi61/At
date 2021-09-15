$(document).ready(function () {
    const questionSelector = $("#question");
    $("body").toggleClass(localStorage.toggled);
    questionSelector.click(function () {
        questionSelector.toggleClass('full')
        $(".jhide").toggle();
    });
    $("#daire").click(function(){
            if (localStorage.toggled != 'gece-modu') {
               $("body").toggleClass('gece-modu', true);
               localStorage.toggled = "gece-modu";
            } else {
               $("body").toggleClass('gece-modu', false);
               localStorage.toggled = "";
            }
       //$("body").toggleClass('gece-modu');
    });
});