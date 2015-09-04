/*
 * Simple Gallery
 *
 * Copyright (c) 2015, Andrew Hedges
 * http://andrew.hedges.name
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

var Gallery = ( function( window, document, undefined ) {
    'use strict';

    function Gallery( opts ) {
        opts = opts || {};

        // feature detection for older browsers
        // classList is sufficient because it's the feature that's
        // least available of the possible tricky ones
        if ( !'classList' in document.body ) {
            return null;
        }

        if ( 'string' !== typeof opts.selector ) {
            opts.selector = '.gallery';
        }
        this.container = document.querySelector( opts.selector );
        this.history   = opts.history || false;

        if ( !this.container ) {
            throw 'No gallery container found';
        }

        // wrap the container so we can...um, contain it
        var el = document.createElement('DIV');
        el.classList.add( 'gallery-wrapper' );
        this.container.parentNode.insertBefore( el, this.container );
        el.appendChild(this.container);

        this.items  = this.container.getElementsByTagName( 'li' );
        this.center = 0;
        this.active = true;
        this._setInitialState();
    }

    var proto = Gallery.prototype;

    /* allow applications to [de]activate gallery, e.g., when it scrolls into/out of view */
    proto.setActive = function ( active ) {
        if ( undefined === active ) {
            active = true;
        }
        this.active = active;
    };

    proto._setInitialState = function () {
        if ( this.history ) {
            this.center = ( function getCenterFromLocation() {
                var center = 0;
                var pieces = window.location.hash.split( ':' );
                // exists
                if ( '' !== pieces && '' !== pieces[1] ) {
                    center = +pieces[1] - 1;
                    if ( isNaN( center ) ) {
                        center = 0;
                    }
                    // is a number
                    else {
                        // is within bounds
                        if ( center > this.items.length - 1 ) {
                            center = 0;
                        }
                    }
                }
                return center;
            } ).call( this );
        }

        this.container.style.height = ( function computeHeight() {
            var item_height, height = 0;
            for ( var i = 0, l = this.items.length; i < l; ++i ) {
                item_height = parseInt( window.getComputedStyle( this.items[i], null ).getPropertyValue( 'height' ), 10 );
                if ( item_height > height ) {
                    height = item_height;
                }
            }
            return Math.ceil( height ) + 'px';
        } ).call( this );

        this.container.classList.add( 'initialized' );
        this._setState( true );
        this._addEventListeners();
    };

    proto._setState = function ( ignorePushState ) {
        if ( this.items ) {
            for ( var i = 0, l = this.items.length; i < l; ++i ) {
                this.items[i].dataset.position = i - this.center;
            }
            if ( !ignorePushState && this.history ) {
                window.history.pushState( { center : this.center }, '', '#slide:' + ( 1 + this.center ) );
            }
        }
    };

    proto._addEventListeners = function () {
        this.container.addEventListener( 'click', this._handleClick.bind(this) );
        window.addEventListener( 'touchstart', this._handleTouch.bind(this) );
        window.addEventListener( 'keyup', this._handleKeyup.bind(this) );
    };

    proto._handleClick = function ( evt ) {
        if ( !this.active ) {
            return;
        }
        var offset = +evt.target.parentNode.dataset.position;
        this.center += offset;
        if ( this.center > this.items.length - 1 ) {
            this.center = this.items.length - 1;
        }
        else if ( this.center < 0 ) {
            this.center = 0;
        }
        this._setState();
    };

    proto._handleTouch = function ( evt ) {
        function handleTouchmove( evt ) {
            var pos = {
                x : evt.pageX,
                y : evt.pageY
            };
            // allow vertical swipes
            if ( Math.abs( start.y - pos.y ) - Math.abs( start.x - pos.x ) > 20 ) {
                boundTouchend( evt );
            }
            else if ( pos.x - start.x < -20 ) {
                evt.preventDefault();
                this.nextSlide();
                boundTouchend( evt );
            }
            else if ( start.x - pos.x < -20 ) {
                evt.preventDefault();
                this.prevSlide();
                boundTouchend( evt );
            }
        }

        function handleTouchend( evt ) {
            evt.target.removeEventListener( 'touchmove', boundTouchMove );
            evt.target.removeEventListener( 'touchend', boundTouchend );
        }

        if ( !this.active ) {
            return;
        }
        if ( evt.target.parentNode.parentNode !== this.container ) {
            return;
        }

        var boundTouchMove = handleTouchmove.bind( this );
        var boundTouchend  = handleTouchend.bind( this );

        var start = {
            x : evt.pageX,
            y : evt.pageY
        };

        evt.target.addEventListener( 'touchmove', boundTouchMove );
        evt.target.addEventListener( 'touchend', boundTouchend );
    };

    proto._handleKeyup = function ( evt ) {
        if ( !this.active ) {
            return;
        }
        if ( 37 === evt.keyCode ) {
            this.prevSlide();
        }
        else if ( 39 === evt.keyCode ) {
            this.nextSlide();
        }
    };

    proto.nextSlide = function () {
        if ( this.center < this.items.length - 1 ) {
            ++this.center;
            this._setState();
        }
    };

    proto.prevSlide = function () {
        if ( this.center > 0 ) {
            --this.center;
            this._setState();
        }
    };

    return Gallery;

}).call( this, this, this.document );
