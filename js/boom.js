function boom(el14,size){
    // taken from mo.js demos


function extend( a, b ) {
    for( var key in b ) { 
        if( b.hasOwnProperty( key ) ) {
            a[key] = b[key];
        }
    }
    return a;
}

function Animocon(el, options) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );

    this.checked = false;

    this.timeline = new mojs.Timeline();
    
    for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
        this.timeline.add(this.options.tweens[i]);
    }

    var self = this;
    // this.el.addEventListener(clickHandler, function() {
        if( self.checked ) {
            self.options.onUnCheck();
        }
        else {
            self.options.onCheck();
            self.timeline.start();
        }
        self.checked = !self.checked;
    // });
}

Animocon.prototype.options = {
    tweens : [
        new mojs.Burst({
            shape : 'circle',
            isRunLess: true
        })
    ],
    onCheck : function() { return false; },
    onUnCheck : function() { return false; }
};

        var el14span = el14.querySelector('p');
        setTimeout(function() {
            el14span.style.display = 'none';
        }, 600);
		new Animocon(el14, {
			tweens : [
				// ring animation
				new mojs.Transit({
					parent: el14,
					duration: 750,
					type: 'circle',
					radius: {0: 40},
					fill: 'transparent',
					stroke: '#B6A9DB',
					strokeWidth: {35:0},
					opacity: 0.2,
					x: '50%',     
					y: '45%',
					isRunLess: true,
					easing: mojs.easing.bezier(0, 1, 0.5, 1)
				}),
				new mojs.Transit({
					parent: el14,
					duration: 500,
					delay: 100,
					type: 'circle',
					radius: {0: 20},
					fill: 'transparent',
					stroke: '#B6A9DB',
					strokeWidth: {5:0},
					opacity: 0.2,
					x: '50%', 
					y: '50%',
					shiftX : 40, 
					shiftY : -60,
					isRunLess: true,
					easing: mojs.easing.sin.out
				}),
				new mojs.Transit({
					parent: el14,
					duration: 500,
					delay: 180,
					type: 'circle',
					radius: {0: 10},
					fill: 'transparent',
					stroke: '#B6A9DB',
					strokeWidth: {5:0},
					opacity: 0.5,
					x: '50%', 
					y: '50%',
					shiftX : -10, 
					shiftY : -80,
					isRunLess: true,
					easing: mojs.easing.sin.out
				}),
				new mojs.Transit({
					parent: el14,
					duration: 800,
					delay: 240,
					type: 'circle',
					radius: {0: 20},
					fill: 'transparent',
					stroke: '#B6A9DB',
					strokeWidth: {5:0},
					opacity: 0.3,
					x: '50%', 
					y: '50%',
					shiftX : -70, 
					shiftY : -10,
					isRunLess: true,
					easing: mojs.easing.sin.out
				}),
				new mojs.Transit({
					parent: el14,
					duration: 800,
					delay: 240,
					type: 'circle',
					radius: {0: 20},
					fill: 'transparent',
					stroke: '#B6A9DB',
					strokeWidth: {5:0},
					opacity: 0.4,
					x: '50%', 
					y: '50%',
					shiftX : 80, 
					shiftY : -50,
					isRunLess: true,
					easing: mojs.easing.sin.out
				}),
				new mojs.Transit({
					parent: el14,
					duration: 1000,
					delay: 300,
					type: 'circle',
					radius: {0: 15},
					fill: 'transparent',
					stroke: '#B6A9DB',
					strokeWidth: {5:0},
					opacity: 0.2,
					x: '50%', 
					y: '50%',
					shiftX : 20, 
					shiftY : -100,
					isRunLess: true,
					easing: mojs.easing.sin.out
				}),
				new mojs.Transit({
					parent: el14,
					duration: 600,
					delay: 330,
					type: 'circle',
					radius: {0: 25},
					fill: 'transparent',
					stroke: '#B6A9DB',
					strokeWidth: {5:0},
					opacity: 0.4,
					x: '50%', 
					y: '50%',
					shiftX : -40, 
					shiftY : -90,
					isRunLess: true,
					easing: mojs.easing.sin.out
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 1200,
					easing: mojs.easing.ease.out,
					onUpdate: function(progress) {
						if(progress < 0.5) {
							var elasticOutProgress = mojs.easing.elastic.out(progress-0.43);
							el14span.style.WebkitTransform = el14span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
						}
						else {
							el14span.style.WebkitTransform = el14span.style.transform = 'scale3d(0,0,0)';
                        }
							// var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
							// el14span.style.WebkitTransform = el14span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                        
					}
				})
			],
			// onCheck : function() {
			// 	el14.style.color = '#F35186';
			// 	el14counter.innerHTML = Number(el14counter.innerHTML) + 1;
			// },
			// onUnCheck : function() {
			// 	el14.style.color = '#C0C1C3';
			// 	var current = Number(el14counter.innerHTML);
			// 	el14counter.innerHTML = current > 1 ? Number(el14counter.innerHTML) - 1 : '';
			// }
		});
}