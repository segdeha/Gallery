# Simple Gallery #

Pretty much the most basic gallery you can make. I put this together for use in [my blog](http://andrew.hedges.name/blog/2015/08/20/segdehabbatical), but you're free to use it in your own projects.

If you do use this, there's no obligation, but I'd love to know. Drop me a line at [andrew@hedges.name](mailto:andrew@hedges.name).

## Features ##

* [MIT license](https://github.com/segdeha/Gallery/blob/master/LICENSE)...go to town!
* Progressive enhancement FTW!
* Supports mouse, keyboard, and touch events.
* Includes fancy transition effects like blur filters, opacity, and transforms.
* Height of the gallery will automatically adjust to fit with the tallest caption.
* Exposes methods to navigate to the next and previous slides as well as activate/deactivate the gallery. With this, you can do things such as only have the gallery respond to keyboard events when it is in view and auto-play through the slides. This functionality is left as an exercise for the reader….
* Supports the JavaScript history API (pushState).

## Limitations ##

* Like I said, I built this for my own use. So, the image sizes are fixed, at half the size of an Instagram image. This is all in the CSS, though, so you can override it if you want.
* Completely untested on Internet Explorer and Edge.

## Usage ##

### Basic Example ###

Include `gallery.js` and `gallery.css` in your HTML page (see the example page, if that's at all confusing).

Structure your gallery HTML as follows:

    <ul class="gallery">
        <li>
            <img src="/path/to/first/image.jpg" alt="">
            <p>Caption for the first image</p>
        </li>
        <li>
            <img src="/path/to/second/image.jpg" alt="">
            <-- No caption? No problem! -->
        </li>
        <li>
            <img src="/path/to/third/image.jpg" alt="">
            <p>Caption for the third image</p>
        </li>
    </ul>

(Yeah, that could be more semantic.)

The library will wrap your HTML in a `DIV` with the class `gallery-wrapper` that you can use to do things like make it work better within a responsive website. (See [my blog](http://andrew.hedges.name/blog/2015/08/20/segdehabbatical) for an example implementation.)

In your own JavaScript, add the following statement to initialize your gallery. By default, the constructor will look for the first element with the class of `gallery`.

    var gallery = new Gallery()

### Multiple Galleries ###

You can initialize multiple galleries on the page by passing in the selectors for your gallery container elements explicitly. Consider the following HTML:

    <ul class="gallery gallery1">...</ul>
    <ul class="gallery gallery2">...</ul>

You can instantiate the above galleries using the following JavaScript:

    var gallery1 = new Gallery( { selector : '.gallery1' } )
    var gallery2 = new Gallery( { selector : '.gallery2' } )

*Note: Your gallery container element must use the `gallery` classname to pick up the necessary CSS styles for the gallery. In the example above, you need to have 2 classnames on each of the container elements.*

### History API ###

Be default the [history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) (pushState, specifically) is turned off. You can enable it when you initialize your gallery by passing it in your options object, as follows:

    var gallery = new Gallery( { history : true } )

*Note: My history implementation won't work as expected with multiple galleries on the page. Hence why it's turned off by default.*

### Full Options Example ###

Of course, you can both pass in the selector for an arbitrary container element and turn on the history API, as follows:

    var gallery = new Gallery( {
        selector : '#myCoolGallery',
        history : true
    } )

Support
---
I'd appreciate hearing about any serious bugs or suggestions for improvements, but I make no promises about being able to offer quick turnarounds on any fixes (at least, not without pull requests). But, hopefully, the code is simple enough that you can fix/extend it.

Enjoy!  
Andrew