$(document).ready(function() {
  var pics = $(".reactions");
  var input = $("#search");
 
  function init() {
    var hash = window.location.hash;
    if (hash.length > 0) {
      input.val(hash.substring(1));
      input.trigger("input");
    }
  }
 
  // this is an event stream
  var searchInput = input
    .asEventStream("input")
    .debounce(300)
    .map(".target.value")
    .toProperty()
    .skipDuplicates();

  function req(query) {
    return new Promise(function(res, rej) {

      $.ajax({
          url: "react.json"
        })
        .done(function(allReactions) {
          var r = allReactions.filter(function(reaction) {
            return reaction.keywords.toLowerCase().indexOf(query) != -1;
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
      return Bacon.fromPromise(req(trim(query.toLowerCase())));
    }
  }

  var reactions = searchInput.flatMapLatest(reactionSearch);

  searchInput.onValue(function updateURL(value) {
    window.location.hash = value;
  });

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

  function trim(string) {
    return string.replace(/(\.| )/g, "");
  }

  init();

});

