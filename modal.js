//var $ = require('jquery');

var Modal = function() {
    this.options = {
        heightPercent: 80
    };

    this.$container = $('.modal-container');
    this.$overlay = $('.modal-overlay');
    this.$modal = $('.modal');
    this.$close = $('.modal-close');
    this.$content = $('.modal-content');

    this.$close.bind('click.modal', $.proxy(this.hide, this));
    this.$overlay.bind('click.modal', $.proxy(this.hide, this));
};

Modal.prototype.launch = function(content) {
    this.$content.html(content);
    this.show();
};

Modal.prototype.show = function() {
    var self = this;
    var winHeight = window.innerHeight;
    var height = winHeight / 100 * this.options.heightPercent;

    this.$modal.css({
        height: height + 'px',
        marginTop: (winHeight - height) / 3 + 'px'
    });

    this.$container.stop().fadeIn(function() {
        self.$content.animate({
            scrollTop: 0
        });
    });
};

Modal.prototype.hide = function() {
    this.$container.stop().fadeOut();
};

//module.exports = Modal;