$(document).ready(function(){
    $("#question").click(function(){
        if($("#question").css('height') == "50%"){
           $("#question").animate({height: '100%',width: '100%'});
        } 
        else{
           $("#question").animate({height: '50%',width: '50%'});
        };

        /*$("#question").animate(
            {
                height: "100%",
                width: "100%"
            }
        );*/


        //$(".jhide").toggle();
      });
   });