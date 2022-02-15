//jQuery time
var current_fs, next_fs, previous_fs; 	//fieldsets
var left, opacity, scale; 		//fieldset properties which we will animate
var animating; 				//flag to prevent quick multi-click glitches
$(".next").click(function(){
	if(animating) return false;
	animating = true;
		
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
			'transform': 'scale('+scale+')',
			'position': 'absolute'
			});
			next_fs.css({'left': left, 'opacity': opacity});
		},
		
		duration: 500, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 600, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
	
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	alert("Redirecting...");	
	return false;
})

$("#pageone").ready(function() {
    $('.required').on('input change', function() {
		var fn= $('#fname').val();
		var ln= $('#lname').val();
		var db= $('#dob').val();
		var add1= $('#tempadd').val();
		var add2= $('#permadd').val();
		var city1= $('#tempcity').val();
		var pin1= $('#temppin').val();
		var city2= $('#permcity').val();
		var pin2= $('#permpin').val();
		var mob1= $('#tempmmobile').val();
		var mob2= $('#permmobile').val();
		var m= $('#male').is(':checked');
		var f= $('#female').is(':checked')
        if(fn!= '' && ln!= '' && db!= '' && add1!= '' && add2!= '' && city1!= '' && pin1!= '' && city2!= '' && pin2!= '' && mob1!= '' && mob2!= '' && (m||f)) {
            $('#btone').prop('disabled', false);
        } else {
            $('#btone').prop('disabled', true);
        }
    });
});

$("#pagetwo").ready(function() {
    $('.required').on('input change', function() {
		var course= $('#course').val();
		var yoc= $('#comp').val();
		var yes= $('#yes').is(':checked');
		var no= $('#no').is(':checked')
		var hobby= $('#hobby').val();
        if(course!='' && yoc!='' && hobby!='' && (yes||no)) {
            $('#bttwo').prop('disabled', false);
        } else {
            $('#bttwo').prop('disabled', true);
        }
    });
});

$("#pagethree").ready(function() {
	$('input:file').on('change', function(){
		var photo= $('#photo').val();
		var sign= $('#sign').val();
		if(photo && sign) {
			$('#btthree').prop('disabled', false);
		} else {
			$('#btthree').prop('disabled', true);
		}
	});
});

$("#pagefour").ready(function() {
	$('.required').on('input change', function() {
		var agree= $('#agree').is(':checked');
        if(agree) {
            $('#submit').prop('disabled', false);
        } else {
            $('#submit').prop('disabled', true);
        }
    });
});
