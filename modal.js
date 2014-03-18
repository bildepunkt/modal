var modal = (function(){

    /** Private */
    var $win = $(window),
        $doc = $(document),
        $overlay,
        $close;

    /** Public */
    return {
        $el : null,

        init : function(params) {
            var self = this;

            this.$el = params.$el;
            $overlay = this.$el.find('.modal-overlay');
            $close = this.$el.find('.modal-close');

            $doc.on('scroll', function() {
                self.$el.css({
                    top : $doc.scrollTop()
                });
            });

            $overlay.on('click', function(e) {
                self.$el.fadeOut();
            });

            $close.on('click', function(e) {
                self.$el.fadeOut();
            });
        }
    };
}());
