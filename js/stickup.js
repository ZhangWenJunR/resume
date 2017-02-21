/**
 * Created by MBENBEN on 2017/2/21.
 */
$.fn.stickup = function() {
    var $this = $(this).data("fixed", false);
    var $width = $this.width();
    var $height = $this.height();
    var $top = $this.offset().top;
    var $left = $this.offset().left;
    var $margin = $this.css("margin");
    var $marginTop = parseInt($this.css("margin-top"));
    var $clone = $this.clone().css({
        "width": $width,
        "height": $height,
        "opacity": 0,
        "display": "none"
    }).insertBefore($this);
    $(window).on("scroll", function() {
        var $topLen = $(this).scrollTop();
        if ($topLen >= $top) {
            if (!isFix()) {
                showFix();
            }
        } else {
            if (isFix()) {
                hideFix();
            }
        }
    });

    function isFix() {
        return $this.data("fixed");
    }

    function showFix() {
        $this.data("fixed", true).css({
            "position": "fixed",
            "width": '100%',
            "height": $height,
            "margin": 0,
            "top": 0,
            "left": $left,
            "z-index":9999
        });
        $clone.show();
    }

    function hideFix() {
        $this.data("fixed", false).css({
            "position": "static",
            "margin": $margin
        });
        $clone.hide();
    }
};
$("nav").stickup();