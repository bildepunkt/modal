var modal = (function(){

    /** Private */
    var $win = $(window),
        $doc = $(document),
        $overlay;

    /** Public */
    return {
        $el : null,

        init : function(params) {
            var self = this;

            this.$el = params.$el;
            $overlay = this.$el.find('.overlay');

            $doc.on('scroll', function() {
                self.$el.css({
                    top : $doc.scrollTop()
                });
            });

            $overlay.on('click', function() {
                self.$el.fadeOut();
            });
        }
    };
}());
