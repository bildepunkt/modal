(function($) {

$.fn.modal = function(options) {
    var self = this;
    var $self = $(self);
    var $overlay;
    var $close;
    var $doc = $(document);

    self.init = function(options) {
        $overlay = $self.find('.modal-overlay');
        $close = $self.find('.modal-close');

        $doc.bind('scroll.modal', function() {
            $self.css({
                top : $doc.scrollTop()
            });
        });

        $overlay.bind('click.modal', function(e) {
            self.hide();
        });

        $close.bind('click.modal', function(e) {
            self.hide();
        });
    };

    self.hide = function() {
        $self.fadeOut();

        return self;
    };

    self.show = function() {
        $self.fadeIn();

        return self;
    };

    self.destroy = function() {
        $doc.unbind('scroll.modal');
        $overlay.unbind('click.modal');
        $close.unbind('click.modal');

        return self;
    };

    self.init(options);

    return self;
};

}(jQuery));