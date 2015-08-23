Simple Gallery
===

Pretty much the most basic gallery you can make. I put this together for use in [my blog](http://andrew.hedges.name/blog/), but you're free to use it in your own projects.

If you do use this, there's no obligation, but I'd love to know. Drop me a line at [andrew@hedges.name](mailto:andrew@hedges.name).

Features
---
* MIT license...go to town!
* Progressive enhancement FTW!
* Supports mouse, keyboard, and touch events.
* Includes fancy transition effects like blur filters, opacity, and transforms.

Limitations
---
* Like I said, I built this for my own use. So, the image sizes are fixed, at half the size of an Instagram image.

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
            <p>Caption for the second image</p>
        </li>
        <li>
            <img src="/path/to/third/image.jpg" alt="">
            <p>Caption for the third image</p>
        </li>
    </ul>

(Yeah, that could be more semantic.)

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