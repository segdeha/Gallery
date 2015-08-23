/*
 * Simple Gallery
 *
 * Copyright (c) 2015, Andrew Hedges
 * http://andrew.hedges.name
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

var Gallery = (function ( window, document, undefined ) {
	'use strict'

	function Gallery( container ) {
		this.container = container || document.querySelector( '.gallery' )
		if ( !this.container ) {
			throw 'No gallery container found'
			return
		}
		this.items  = this.container.getElementsByTagName( 'li' )
		this.center = 0
		this.active = true
		this._setInitialState()
	}

	var proto = Gallery.prototype

	/* allow applications to [de]activate gallery, e.g., when it scrolls into/out of view */
	proto.setActive = function ( active ) {
		if ( undefined === active ) active = true
		this.active = active
	}

	proto._setInitialState = function () {
		// compute height
		var item_height, height = 540
		for ( var i = 0, l = this.items.length; i < l; ++i ) {
			item_height = parseInt( window.getComputedStyle( this.items[i], null ).getPropertyValue( 'height' ), 10 )
			if ( item_height > height ) height = item_height
		}
		this.container.style.height = Math.ceil( height ) + 'px'
		this.container.classList.add( 'initialized' )
		this._setState()
		this._addEventListeners()
	}

	proto._setState = function () {
		if ( this.items ) {
			for ( var i = 0, l = this.items.length; i < l; ++i ) {
				this.items[i].dataset.position = i - this.center
			}
		}
	}

	proto._addEventListeners = function () {
		this.container.addEventListener( 'click', this._handleClick.bind(this) )
		window.addEventListener( 'touchstart', this._handleTouch.bind(this) )
		window.addEventListener( 'keyup', this._handleKeyup.bind(this) )
	}

	proto._handleClick = function ( evt ) {
		if ( !this.active ) return
		var offset = +evt.target.parentNode.dataset.position
		this.center += offset
		if      ( this.center > this.items.length - 1 ) this.center = this.items.length - 1
		else if ( this.center < 0 )                     this.active = 0
		this._setState()
	}

	proto._handleTouch = function ( evt ) {
		if ( !this.active ) return
		if ( evt.target.parentNode.parentNode !== this.container ) return
		var self  = this
		var start = evt.pageX
		evt.target.addEventListener( 'touchmove', _handleTouchmove )
		evt.target.addEventListener( 'touchend', _handleTouchend )

		function _handleTouchmove( evt ) {
			var pos = evt.pageX
			if ( pos - start < -20 ) {
				self.nextSlide()
				_handleTouchend()
			}
			else if ( start - Math.abs( pos ) < -20 ) {
				self.prevSlide()
				_handleTouchend()
			}
		}

		function _handleTouchend() {
			evt.target.removeEventListener( 'touchmove', _handleTouchmove )
			evt.target.removeEventListener( 'touchend', _handleTouchend )
		}
	}

	proto._handleKeyup = function ( evt ) {
		if ( !this.active ) return
		if (37 === evt.keyCode) this.prevSlide()
		if (39 === evt.keyCode) this.nextSlide()
	}

	proto.nextSlide = function () {
		if ( this.center < this.items.length - 1 ) {
			++this.center
			this._setState()
		}
	}

	proto.prevSlide = function () {
		if ( this.center > 0 ) {
			--this.center
			this._setState()
		}
	}

	return Gallery

}).call( this, this, this.document )
