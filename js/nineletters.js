$(function()
{
  var timerVar;
  var time = 301;
  var score = 0;
  var left = 0;

  $("#checkword").attr('disabled', false);	  
  $("#score").html(" " + score + " ");
  $("#words").html(" " + left + " ");
	  
  $('#close').on('click', function()
  {
    $('#rules').css('display', 'none');
  });

  function beginTimer()
  {
    timerVar = setInterval(function()
    {
	  myTimer();
	}, 1000);
  }

  function myTimer()
  {
    time -= 1;
    $("#time").html(" " + time + " seconds");
    if(time<=0)
	{
      clearInterval(timerVar);
      $("#time").html("Time's Up");
	  $("#checkword").attr('disabled', true);
	}
  }
		
  $('#yourword').val('');
  $('#response').html(" ");

  $("body").addClass("loading"); 

  $.ajax(
  {
	type: 'POST',
	url: "http://127.0.0.1/digitalrepinfo/php/fetchwords.php",
	dataType: 'json'
  }).done(function(data)
  {
    var word = data.word;
    var letter = data.letter;
    var wordlist = data.wordlist.split('&');
    var ind = word.indexOf(letter);
    var newword = word.substr(0, ind) + word.substr(ind + 1);
    var wordarray = newword.split('');
    var left = wordlist.length;
    $('#words').html(" " + left + " ");
    var newwordarray = shuffle(wordarray);
	populategrid(newwordarray);
	var answersarray = new Array();
		  
	$('#letter0').on('click', function()
	{
	  $('#yourword').val($('#yourword').val() + newwordarray[0]);
	  $('#letter0').css("background", "#999");
	});
	$('#letter1').on('click', function()
	{
	  $('#yourword').val($('#yourword').val() + newwordarray[1]);
	  $(this).css("background", "#999");
	});
	  $('#letter2').on('click', function()
	{
	  $('#yourword').val($('#yourword').val() + newwordarray[2]);
	  $(this).css("background", "#999");
	});
	  $('#letter3').on('click', function()
	{
	  $('#yourword').val($('#yourword').val() + newwordarray[3]);
	  $(this).css("background", "#999");
	});
	  $('#letter4').on('click', function()
	{
	  $('#yourword').val($('#yourword').val() + newwordarray[4]);
	  $(this).css("background", "#999");
	});
	  $('#middleletter').on('click', function()
	{
	  $('#yourword').val($('#yourword').val() + letter);
	  $(this).css("background", "#999");
	  $(this).css("border", "solid 1px #000");
	});
	  $('#letter5').on('click', function()
	{
	  $('#yourword').val($('#yourword').val() + newwordarray[5]);
	  $(this).css("background", "#999");
	});
	  $('#letter6').on('click', function()
	{
	  $('#yourword').val($('#yourword').val() + newwordarray[6]);
	  $(this).css("background", "#999");
	});
	  $('#letter7').on('click', function()
	{
	  $('#yourword').val($('#yourword').val() + newwordarray[7]);
	  $(this).css("background", "#999");
	});
		  
	$('#clearword').on('click', function()
	{
	  $('#yourword').val('');
	  resetcolors();
	});
		  
	$('#checkword').on('click', function()
	{
	  var enteredword = $('#yourword').val();
	  var len = 0;
	  var ind = wordlist.indexOf(enteredword);
	  if(ind != -1)
	  {
		var ind2 = answersarray.indexOf(enteredword);
		if(ind2 != -1)
		{
		  $('#response').html("You already entered this word");			    
		}
		else
		{
		  answersarray.push(enteredword);
		  $('#answers').append(enteredword + " ");
		  $('#response').html("");
		  len = enteredword.length;
		  score += len;
		  $('#score').html(" " + score + " ");
		  left -= 1;
		  $('#words').html(" " + left + " ");
		}
	  }
	  else
	  {
	    $('#response').html("That word is not valid");
	  }
	  $('#yourword').val('');
	  resetcolors();
	});
		  
	$('#shuffleword').on('click', function()
	{
	  var newarray = shuffle(newwordarray);
	  var count = newwordarray.length;
	  populategrid(newarray);
	  newwordarray = newarray;
	});
		  
	function resetcolors()
	{
	  $('#letter0').css("background", "MintCream");
	  $('#letter1').css("background", "MintCream");
	  $('#letter2').css("background", "MintCream");
	  $('#letter3').css("background", "MintCream");
	  $('#middleletter').css("background", "#b4c9d9");
	  $('#middleletter').css("border", "solid 1px #000");
	  $('#letter4').css("background", "MintCream");
	  $('#letter5').css("background", "MintCream");
	  $('#letter6').css("background", "MintCream");
	  $('#letter7').css("background", "MintCream");
    }
		  
	function shuffle(array) 
	{
      var tmp, current, top = array.length;
	  if(top) while(--top) 
	  {
		current = Math.floor(Math.random() * (top + 1));
		tmp = array[current];
		array[current] = array[top];
		array[top] = tmp;
	  }
	  return array;
	}
		  
	function populategrid(array)
	{
	  $('#middleletter').html(letter);
	  $('#letter0').html(array[0]);
	  $('#letter1').html(array[1]);
	  $('#letter2').html(array[2]);
	  $('#letter3').html(array[3]);
	  $('#letter4').html(array[4]);
	  $('#letter5').html(array[5]);
	  $('#letter6').html(array[6]);
	  $('#letter7').html(array[7]);		    
    }
  }).always(function()
  {
    $("body").removeClass("loading");
	beginTimer();			  
  });
}); 
	  