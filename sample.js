var searchBox = document.getElementById("search");
var pics = document.querySelector(".reactions");

// this is an event stream
var inputStream = Bacon.fromEvent(searchBox, "input");

// Gets the value from the input stream
var property = inputStream.map(".target.value").toProperty();

// does something with the value whenever it changes
property.onValue(function(v) {
	pics.innerHTML = "MF" + v;
});


// ---- LETS TRY IT WITH MATH

function sum(a,b) { 
	return parseFloat(a) + parseFloat(b)
};

var c = document.getElementById('c');

var aa = Bacon.fromEvent(document.getElementById('a'), "input").map(".target.value");
var bb = Bacon.fromEvent(document.getElementById('b'), "input").map(".target.value");

var cc = Bacon.combineWith(sum, aa,bb);

cc.onValue(function(v) {
	c.innerHTML = v
});

