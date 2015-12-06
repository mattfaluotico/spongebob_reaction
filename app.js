var pics = $(".reactions");

// this is an event stream
var searchInput = $("#search")
	.asEventStream("input")
	.debounce(300)
	.map(".target.value")
	.toProperty()
	.skipDuplicates();

function req(query) {
	return new Promise(function(res, rej) {
		
		$.ajax({url: "react.json"})
		.done(function(allReactions) {
			var r = allReactions.filter(function(reaction) {
					return reaction.keywords.indexOf(query) != -1;
				});
			res(r);
		})
		.fail(function(err) {
			rej(err);
		});
	});
}

function reactionSearch(query) {
	if (query.length < 2) {
		return Bacon.once([]);
	} else {
		return Bacon.fromPromise( req(query) );
	}
}

var reactions = searchInput.flatMapLatest(reactionSearch);

searchInput.awaiting(reactions).onValue(function(waiting) {
	if (waiting) {
		pics.innerHTML = "searching..."
	}
});

reactions.onValue(function(results) {
	if (results) {
		pics.html($.map(results, function(reactionImage) {
			return $('<img class="react" src="' + reactionImage.url + '">');
		}));
	}
});
