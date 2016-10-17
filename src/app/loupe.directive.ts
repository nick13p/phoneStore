import {Directive, ElementRef, Renderer, Input, AfterViewInit} from '@angular/core';

declare var $:any;

@Directive({ selector: '[myLoupe]' })

export class LoupeDirective implements AfterViewInit{
	private el: HTMLElement;

	constructor(el: ElementRef, public renderer: Renderer){
		this.el = el.nativeElement;
		$(this.el).after(`
			<div class="zoomContainer">
				<div class="zoomLens"></div>
				<div class="zoomWindow"></div>
			</div>
		`);
	}

	ngAfterViewInit(){
		let $target = this.el,
			// user settings or default settings (if user omitted it)
			{ widthLens = 100, heightLens = 100, gallery = undefined, left = 10, backgroundLens = 'white', opacityLens = '.2', sizeCoef = 1.5} = eval('({' + $target.getAttribute('myLoupe') + '})'),
			// contain all settings in one object
			setups = {
				offsetTop: this.el.offsetTop,
				offsetLeft: this.el.offsetLeft,
				clientHeight: this.el.clientHeight,
				clientWidth: this.el.clientWidth,
				src: this.el.getAttribute('src'),
				widthLens: widthLens,
				heightLens: heightLens,
				gallery: gallery,
				left: left,
				backgroundLens: backgroundLens,
				opacityLens: opacityLens,
				sizeCoef: sizeCoef
			},
			// retrieve divs (must be after constructor)
			$zoomContainer = $('.zoomContainer'),
			$zoomLens = $('.zoomLens'),
			$zoomWindow = $('.zoomWindow');

		this.addStylesToZoomElements($zoomContainer, $zoomLens, $zoomWindow, setups);
		this.addEventListeners($target, $zoomContainer, $zoomLens, $zoomWindow, setups);

		if (gallery !== undefined) {
			let $gallery = $(gallery);
			$gallery.children().first().css('border', '1px solid black');

			$gallery.children('img').bind("click", function(event) {
				// inject event element's src into $target
				$target.setAttribute('src',this.getAttribute('src'));
				$zoomWindow.css({'background-image': 'url(' + this.getAttribute('src') + ')'});
				// dealing with border
				$gallery.children('img').css('border', '0');
				this.style.border = '1px solid black';
			});
		}
	}

	addEventListeners($target, $zoomContainer, $zoomLens, $zoomWindow, setups){
		let
			// just for ease
			offX = setups.widthLens / 2,
			offY = setups.heightLens / 2,
			limitX = setups.clientWidth - offX,
			limitY = setups.clientHeight - offY;

		$zoomContainer.mouseover(function(event) {
			$zoomLens.show();
			$zoomWindow.show();
		});
		$zoomContainer.mouseout(function(event) {
			$zoomLens.hide();
			$zoomWindow.hide();
		});
		$zoomContainer.mousemove(function(event) {
			let x = event.offsetX,
					y = event.offsetY;
			setLensPosition(event, x, y);
			setWindowPosition(event, x, y);
		});
		$(window).resize(function(){
			setups.offsetTop = $target.offsetTop;
			setups.offsetLeft = $target.offsetLeft;
			$zoomContainer.css({
				'left': setups.offsetLeft,
				'top': setups.offsetTop,
			});
			$zoomLens.css({
				'left': setups.offsetLeft,
				'top': setups.offsetTop,
			});
			$zoomWindow.css({
				'left': setups.left + setups.clientWidth,
				'top': 0,
			});
		});

		function setLensPosition(event, x, y){
			// magic - don't touch
			if (x <= offX){
				x = offX;
			}
			else if (x >= limitX){
				x = limitX;
			}
			if (y <= offY){
				y = offY;
			}
			else if (y >= limitY){
				y = limitY;
			}
			$zoomLens.css({
				'left': x - offX,
				'top': y - offY
			});
		}

		function setWindowPosition(event, x, y) {
			let myX = $zoomLens[0].offsetLeft / ((setups.clientWidth - setups.widthLens) / 100),
					myY = $zoomLens[0].offsetTop / ((setups.clientHeight - setups.heightLens) / 100);
			$zoomWindow.css({
				'background-position-x': myX + '%',
				'background-position-y': myY + '%'
			});
		}
	}

	addStylesToZoomElements($zoomContainer, $zoomLens, $zoomWindow, setups){
		let
			// aspect ratio zoomWindow
			widthK = setups.widthLens > setups.heightLens ? setups.widthLens / setups.heightLens : 1,
			heightK = setups.widthLens > setups.heightLens ? 1 : setups.heightLens / setups.widthLens;
		$zoomContainer.css({
			'-webkit-transform': 'translateZ(0)',
			'position': 'absolute',
			'left': setups.offsetLeft,
			'top': setups.offsetTop,
			'height': setups.clientHeight,
			'width': setups.clientWidth,
			'z-index': '999'
		});
		$zoomLens.css({
			'display': 'none',
			'overflow': 'hidden',
			'z-index': '99',
			'position': 'absolute',
			'left': setups.offsetLeft,
			'top': setups.offsetTop,
			'background-color': setups.backgroundLens,
			'height': setups.heightLens,
			'width': setups.widthLens,
			'opacity': setups.opacityLens,
			'float': 'right',
			'border': '1px solid black',
			'pointer-events': 'none'
		});
		$zoomWindow.css({
			'display': 'none',
			'overflow': 'hidden',
			'z-index': '100',
			'height': setups.clientHeight * heightK * setups.sizeCoef,
			'width': setups.clientHeight * widthK * setups.sizeCoef,
			'position': 'absolute',
			'left': setups.left + setups.clientWidth,
			'top': 0,
			'background-repeat': 'no-repeat',
			'background-image': 'url(' + setups.src + ')',
			'background-size': 100 * setups.clientWidth / setups.widthLens + '%',
			'border': '1px solid rgb(136, 136, 136)',
			'float': 'left',
			'pointer-events': 'none'
		});
	}
}