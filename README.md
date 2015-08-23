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

In your own JavaScript, add the following to initialize your gallery:

    var gallery = new Gallery()

By default, the constructor will look for an element with the ID of `gallery`. You can also initialize multiple galleries on the page by passing in the gallery elements explicitly, as follows:

    var gallery1 = new Gallery( document.querySelector( '.gallery1' ) )
    var gallery2 = new Gallery( document.querySelector( '.gallery2' ) )

Support
---
Unfortunately, this is just a quick hack. I'd appreciate hearing about any serious bugs, but I'm not likely to be able to offer quick turnarounds on any fixes (at least, not without pull requests). But, hopefully, the code is simple enough that you can fix/extend it.

Enjoy!  
Andrew