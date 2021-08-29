$(document).ready(function () {
    const questionSelector = $("#question");
    questionSelector.click(function () {
        questionSelector.toggleClass('full')
        $(".jhide").toggle();
    });
});