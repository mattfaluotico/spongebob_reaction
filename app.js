var searchBox = document.getElementById("search");
var pics = document.querySelector(".reactions");

Bacon.fromEvent(searchBox, "input").onValue(function(event) { 
	pics.innerHTML = event.target.value;
	console.log(event.target.value);
});
