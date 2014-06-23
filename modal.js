(function($) {

$.fn.modal = function(options) {
    var defaults = {
        prompt: true
    };
    var self = this;
    var $self = $(self);
    var $overlay;
    var $close;
    var $content;
    var $doc = $(document);
    // for prompt functionality
    var callback;

    self.init = function(options) {
        options = $.extend(defaults, options);

        $overlay = $self.find('.modal-overlay');
        $close = $self.find('.modal-close');
        $content = $self.find('.modal-content');

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

        // prompt defaults to true
        if (options.prompt) {
            $content.on('click.modal', 'button', function(e) {
                var inputs;
                var $input;
                var response = {};

                if (typeof(self.callback) !== 'function') {
                    return false;
                }

                switch($(this).attr('id')) {
                    case 'modalPromptCancel':
                        response = null;
                    break;
                    case 'modalPromptSubmit':
                        inputs = $content.find('input[type="text"], textarea');
                        for (var i = 0; i < inputs.length; i += 1) {
                            $input = $(inputs[i]);
                            response[$input.attr('name')] = $input.val();
                        }
                    break;
                }

                // hide must come before callback in case callback shows modal again
                self.hide();
                self.callback(response);
                self.callback = null;
            });
        }
    };

    self.hide = function() {
        $self.stop().fadeOut(256);
    };

    self.show = function(markup) {
        if (markup) {
            $content.html(markup);
        }

        $self.stop().fadeIn(256);
    };

    self.prompt = function(markup, callback) {
        markup = markup ? markup : '';
        markup +=
            '<button id=modalPromptCancel>cancel</button>' +
            '<button id=modalPromptSubmit>submit</button>';

        self.show(markup);

        self.callback = callback ? callback : null;
    };

    self.destroy = function() {
        $doc.unbind('scroll.modal');
        $overlay.unbind('click.modal');
        $close.unbind('click.modal');
    };

    self.init(options);

    return self;
};

}(jQuery));