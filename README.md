# Spongebob Reactions

A Spongebob reaction gif/pic for all situations.

# Adding your own

Just follow the pattern in the JSON file. Each reaction has a list of keywords and a URL. That's all! 

# Build

### Flow
Most of the work is dont is `app.js`. This is built with Reactive Functional Programming via bacon.js. Input in the search box creates an event stream, which is quickly turned into a property stream containing the text in the search. The text is used in the continuous JSON call, which creates another event stream. Any time there is a response, it's filtered for the correct results and sent to the DOM

### Style 

It's all in `style.css`. It's incredibly sloppy though...

