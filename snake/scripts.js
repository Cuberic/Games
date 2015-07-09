$(document).ready( function() {
    // variables
    var food = $(".food");
    var snake = $(".snake");
    var board = $(".board");
    var score_container = $('.score');
    var score;
    var alert_box = $("#alerts");
    var board_x = board.width() - snake.width();
    var board_y = board.height() - snake.height();
    var tails = 0;
    // end of variables

    //some functions

    //animate the snake
    var animateMe = function(targetElement, speed, distance){
        console.log(targetElement);
        $(targetElement).animate(
            {
            'left': distance
            },
            {
            duration: speed,
            complete: function(){
                animateMe(this, speed);
                }
            }
        );


    };

    // food
    function create_food()
    {
        food.remove();
        foodpos = {
            x: Math.floor(Math.random()*(300-15)), 
            y: Math.floor(Math.random()*(400-15)), 
        };
        food.css({top: foodpos.y, left: foodpos.x});
        board.append(food);
        //This will create a food cell  
}

    function rect(obj) {
      return {
        x : parseInt($(obj).css('left')),
        y : parseInt($(obj).css('top')),
        width : $(obj).width(),
        height : $(obj).height()
      }
    }

    function isFood(rect1,rect2) {
        var a = rect(rect1);
        var b = rect(rect2);
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );

    }

    function lose() {
        snake.stop();
        $(document).unbind('keydown');
        snake.css({top: 0, left: 0});
        alert_box.html("You lose");
        return;                
    }

    function leftArrowPressed() {
        snake.stop();
        snake.animate(
            { 
                left: "-=5"
            }, 
            {
                duration:50,
                complete:function(){
                    if (snake.position().left > -1 && snake.position().left < board_x ) {
                        leftArrowPressed();
                    } else {
                        lose();
                    }
                }
            }
        ); 
    }

    function rightArrowPressed() {
        snake.stop();
        snake.animate(
            { 
                left: "+=5"
            }, 
            {
                duration:50,
                complete:function(){
                    if (snake.position().left > -1 && snake.position().left < board_x ) {
                        rightArrowPressed();
                    } else {
                        lose();
                    }
                }
            }
        ); 
    }
    function upArrowPressed() {
        snake.stop();
        snake.animate(
            { 
                top: "-=5" 
            }, 
            {
                duration:50,
                complete:function(){
                    if (snake.position().top > -1 && snake.position().top < board_x ) {
                        upArrowPressed();
                    } else {
                        lose();
                    }
                }
            }
        ); 
    }

    function downArrowPressed() {
        snake.stop();
        snake.animate(
            { 
                top: "+=5" 
            }, 
            {
                duration:50,
                complete:function(){
                    if (snake.position().top > -1 && snake.position().top < board_y ) {
                        downArrowPressed();
                    } else {
                        lose();
                    }
                }
            }
        ); 
    }       

    $('#start_btn').click(function(){
        // game defaults set
        snake.css({top: 0, left: 0});
        score = 0;
        score_container.text(score);
        create_food();
        alert_box.text("Goodluck");

        //detect keyboard controls
        $(document).bind('keydown', function(e) {
            switch (e.keyCode) {
                case 37:
                    if(isFood(snake,food)) {
                        leftArrowPressed();
                        score = score +1;
                        score_container.text(score);
                        create_food();
                    } else {
                        leftArrowPressed();

                    }
                break;

                case 39:
                    if(isFood(snake,food)) {
                        rightArrowPressed();
                        score = score +1;
                        score_container.text(score);
                        create_food();
                    } else {
                        rightArrowPressed();
                        
                    }
                break;

                case 38:
                    if(isFood(snake,food)) {
                        upArrowPressed();
                        score = score +1;
                        score_container.text(score);
                        create_food();
                    } else {
                        upArrowPressed();
                        
                    }
                break;

                case 40:
                    if(isFood(snake,food)) {
                        downArrowPressed();
                        score = score +1;
                        score_container.text(score);
                        create_food();
                    } else {
                        downArrowPressed();
                        
                    }
                break;
            }

        });
    });

});