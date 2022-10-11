/*ccanvas*/
var c = document.getElementById('canvas');
var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),

    opts = {

      lineCount: 110,
      starCount: 80,

      radVel: .05,
      lineBaseVel: .3,
      lineAddedVel: 0,
      lineVelTilt: Math.PI / 2,
      lineBaseLife: 150,
      lineAddedLife: 20,

      starBaseLife: 15,
      starAddedLife: 15,

      ellipseTilt: -.15,
      ellipseBaseRadius: 150,
      ellipseAddedRadius: 0,
      ellipseAxisMultiplierX: 2,
      ellipseAxisMultiplierY: 1,
      ellipseCX: w / 2,
      ellipseCY: h / 2,

    },

    lines = [],
    stars = [],
    tick = 0,
    first = true;

function init() {

  lines.length = stars.length = 0;

  ctx.fillStyle = '#333';
  ctx.fillRect( 0, 0, w, h );

  if( first ) {

    loop();
    first = false;
  }
}

function loop() {

  window.requestAnimationFrame( loop );
  step();
  draw();
}

function step() {

  tick += .5;

  if( lines.length < opts.lineCount && Math.random() < .5 )
    lines.push( new Line );

  if( stars.length < opts.starCount )
    stars.push( new Star );

  lines.map( function( line ) { line.step(); } );
  stars.map( function( star ) { star.step(); } );
}

function draw() {

  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect( 0, 0, w, h );

  ctx.translate( opts.ellipseCX, opts.ellipseCY );
  ctx.rotate( opts.ellipseTilt );
  ctx.scale( opts.ellipseAxisMultiplierX, opts.ellipseAxisMultiplierY );

  // ctx.shadowBlur here almost does nothing
  lines.map( function( line ) { line.draw(); } );

  ctx.scale( 1/opts.ellipseAxisMultiplierX, 1/opts.ellipseAxisMultiplierY );
  ctx.rotate( -opts.ellipseTilt );
  ctx.translate( -opts.ellipseCX, -opts.ellipseCY );

  stars.map( function( star ) { star.draw(); } );
}

function Line() {

  this.reset();
}
Line.prototype.reset = function() {

  this.rad = Math.random() * Math.PI * 2,
  this.len = opts.ellipseBaseRadius + Math.random() * opts.ellipseAddedRadius;
  this.lenVel = opts.lineBaseVel + Math.random() * opts.lineAddedVel;

  this.x = this.px = Math.cos( this.rad ) * this.len;
  this.y = this.py = Math.sin( this.rad ) * this.len;

  this.life = this.originalLife = opts.lineBaseLife + Math.random() * opts.lineAddedLife;

  this.alpha = .2 + Math.random() * .8;
}
Line.prototype.step = function() {

  --this.life;

  var ratio = 1 - .1 *  this.life / this.originalLife;

  this.px = this.x;
  this.py = this.y;

  this.rad += opts.radVel;
  this.len -= this.lenVel;

  this.x = Math.cos( this.rad ) * this.len;
  this.y = Math.sin( this.rad ) * this.len;

  if( this.life <= 0 )
    this.reset();
}
Line.prototype.draw = function() {

  var ratio = Math.abs( this.life / this.originalLife - 1/2 );

  ctx.lineWidth = ratio * 5;

  ctx.strokeStyle = 'hsla(hue, 80%, light%, alp)'
    .replace( 'hue', tick + this.x / ( opts.ellipseBaseRadius + opts.ellipseAddedRadius ) * 100 )
    .replace( 'light', 100 - ratio * 150 )
    .replace( 'alp', this.alpha );
  ctx.beginPath();
  ctx.moveTo( this.px, this.py );
  ctx.lineTo( this.x, this.y );

  ctx.stroke();
}

function Star() {

  this.reset();
};
Star.prototype.reset = function() {

  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.life = opts.starBaseLife + Math.random() * opts.starAddedLife;
}
Star.prototype.step = function() {

  --this.life;

  if( this.life <= 0 )
    this.reset();
}
Star.prototype.draw = function(){

  ctx.fillStyle = 'hsla(hue, 80%, 70%, .9)'
    .replace( 'hue', tick + this.x / w * 100 );
  ctx.fillRect( this.x, this.y, 1, 1 );
};

init();


/*翻訳*/
// WORK IN PROGRESS BELOW

$('document').ready(function () {
        // RESTYLE THE DROPDOWN MENU
    $('#google_translate_element').on("click", function () {

        // Change font family and color
        $("iframe").contents().find(".goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div, .goog-te-menu2 *")
            .css({
                'color': '#544F4B',
                'font-family': 'Roboto',
                                'width':'100%'
            });
        // Change menu's padding
        $("iframe").contents().find('.goog-te-menu2-item-selected').css ('display', 'none');

                // Change menu's padding
        $("iframe").contents().find('.goog-te-menu2').css ('padding', '0px');

        // Change the padding of the languages
        $("iframe").contents().find('.goog-te-menu2-item div').css('padding', '3px');

        // Change the width of the languages
        $("iframe").contents().find('.goog-te-menu2-item').css('width', '100%');
        $("iframe").contents().find('td').css('width', '100%');

        // Change hover effects
        $("iframe").contents().find(".goog-te-menu2-item div").hover(function () {
            $(this).css('background-color', '#4385F5').find('span.text').css('color', 'white');
        }, function () {
            $(this).css('background-color', 'white').find('span.text').css('color', '#544F4B');
        });

        // Change Google's default blue border
        $("iframe").contents().find('.goog-te-menu2').css('border', 'none');

        // Change the iframe's box shadow
        $(".goog-te-menu-frame").css('box-shadow', '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3)');

        // Change the iframe's size and position?
      /*  $(".goog-te-menu-frame").css({
            'height': '100%',
            'width': '60%',
            'top': '0px'
        });*/
        // Change iframes's size
        $("iframe").contents().find('.goog-te-menu2').css({
            'height': '100%',
            'width': '100%'
        });
    });
});

/*font variable*/
$(function() {
    $(document).on('input', '#name', function(e) {
        $('#output1').text($('#name').val());
    });
});
$("#setFontSize").on("input",function () {
          $('#output1').css("font-size", $(this).val() + "px");
  });
$("#setFontWeight").on("input",function () {
          $('#output1').css("font-weight", $(this).val() + "");
  });

$("#setLetterSpacing").on("input",function () {
          $('#output1').css("letter-spacing", $(this).val() + "px");
  });

$(function() {
    $(document).on('input', '#name', function(e) {
        $('#output2').text($('#name').val());
    });
});
$("#setFontSize").on("input",function () {
          $('#output2').css("font-size", $(this).val() + "px");
  });
$("#setFontWeight").on("input",function () {
          $('#output2').css("font-weight", $(this).val() + "");
  });

$("#setLetterSpacing").on("input",function () {
          $('#output2').css("letter-spacing", $(this).val() + "px");
  });

  /*カラースライダーjs*/
  const labelRed = document.querySelector(".redText");
const labelGreen = document.querySelector(".greenText");
const labelBlue = document.querySelector(".blueText");
const heading3 = document.querySelector("h3");

const inputRed = document.querySelector("#red");
const inputGreen = document.querySelector("#green");
const inputBlue = document.querySelector("#blue");
const bodyBg = document.querySelector('#output2');

inputRed.addEventListener("input", changeBg);
inputGreen.addEventListener("input", changeBg);
inputBlue.addEventListener("input", changeBg);


function changeBg() {
    let redColor = parseInt(inputRed.value);
    let greenColor = parseInt(inputGreen.value);
    let blueColor = parseInt(inputBlue.value);
    let rgbColor = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
    let bC = bodyBg.style.color = rgbColor;
    // console.log(bC);
    heading3.textContent = bC;

    let regex = /\d+/g;
    let testColor = bC.match(regex);
    let sum = testColor.reduce((acc, num) => {
        return acc + Number(num);
    }, 0);

    if (sum < 382) {
        labelRed.style.color = "rgba(255, 255, 255, .75)";
        labelGreen.style.color = "rgba(255, 255, 255, .75)";
        labelBlue.style.color = "rgba(255, 255, 255, .75)";
        heading3.style.color = "rgba(255, 255, 255, .75)";

    } else if (sum >= 382) {
        labelRed.style.color = "rgb(0, 0, 0)";
        labelGreen.style.color = "rgb(0, 0, 0)";
        labelBlue.style.color = "rgb(0, 0, 0)";
        heading3.style.color = "rgb(0, 0, 0)";
    }
}
// changeBg();

heading3.addEventListener("input", givenRgb, false);

function givenRgb() {
    let givenColor = heading3.textContent;

    let rgbColor = givenColor;
    let bC = bodyBg.style.color = rgbColor;
    heading3.textContent = bC;


    let regex = /\d+/g;
    let testColor = bC.match(regex);
    let sum = testColor.reduce((acc, num) => {
        return acc + Number(num);
    }, 0);

    if (sum < 382) {
        labelRed.style.color = "rgba(255, 255, 255, .75)";
        labelGreen.style.color = "rgba(255, 255, 255, .75)";
        labelBlue.style.color = "rgba(255, 255, 255, .75)";
        heading3.style.color = "rgba(255, 255, 255, .75)";

    } else if (sum >= 382) {
        labelRed.style.color = "rgb(0, 0, 0)";
        labelGreen.style.color = "rgb(0, 0, 0)";
        labelBlue.style.color = "rgb(0, 0, 0)";
        heading3.style.color = "rgb(0, 0, 0)";
    }
}
// givenRgb();
