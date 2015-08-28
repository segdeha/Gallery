Simple Gallery
===

Pretty much the most basic gallery you can make. I put this together for use in [my blog](http://andrew.hedges.name/blog/2015/08/20/segdehabbatical), but you're free to use it in your own projects.

If you do use this, there's no obligation, but I'd love to know. Drop me a line at [andrew@hedges.name](mailto:andrew@hedges.name).

Features
---
* [MIT license](https://github.com/segdeha/Gallery/blob/master/LICENSE)...go to town!
* Progressive enhancement FTW!
* Supports mouse, keyboard, and touch events.
* Includes fancy transition effects like blur filters, opacity, and transforms.
* Height of the gallery will automatically adjust to fit with the tallest caption.
* Exposes methods to navigate to the next and previous slides as well as activate/deactivate the gallery. With this, you can do things such as only have the gallery respond to keyboard events when it is in view and auto-play through the slides. This functionality is left as an exercise for the reader….
* Supports the JavaScript history API (pushState).

Limitations
---
* Like I said, I built this for my own use. So, the image sizes are fixed, at half the size of an Instagram image. This is all in the CSS, though, so you can override it if you want.
* Supports a maximum of 10 images per gallery instance.
* Completely untested on Internet Explorer and Edge.

Usage
---
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

In your own JavaScript, add the following to initialize your gallery:

    var gallery = new Gallery()

By default, the constructor will look for the first element with the class of `gallery`. You can also initialize multiple galleries on the page by passing in the gallery elements explicitly, as follows:

    var gallery1 = new Gallery( document.querySelector( '.gallery1' ) )
    var gallery2 = new Gallery( document.querySelector( '.gallery2' ) )

Support
---
Unfortunately, this is just a quick hack. I'd appreciate hearing about any serious bugs, but I'm not likely to be able to offer quick turnarounds on any fixes (at least, not without pull requests). But, hopefully, the code is simple enough that you can fix/extend it.

Enjoy!  
Andrew