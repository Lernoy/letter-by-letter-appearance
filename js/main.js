var block_name = 'letter_by_letter';
$(document).ready(function() {
    $.fn.animate_Text = function(block_number) {
        return this.each(function() {
            $(this).html($(this).text().replace(/./g, '<span class="new' + block_number + '">$&</span>'));
            $('span.new' + block_number + '').each(function(i, el) { 
              setTimeout(function() {$(el).addClass('div_opacity');}, 40 * i);
            });
        });
    };
});
function isVisible(tag) {
    var t = $(tag);
    var w = $(window);
    var wt = w.scrollTop();
    var tt = t.offset().top;
    var tb = tt + t.height();
    return ((tb <= wt + w.height()) && (tt >= wt));
}
function signal(visible_scroll_element) {
    var b = $('[class*=' + block_name + visible_scroll_element + ']');
    if (!b.prop("shown") && isVisible(b)) {
        b.prop("shown", true);
        $(b).show();
        $(b).animate_Text(visible_scroll_element);
    }
}
$(function() {
    for_get_number();
    $(window).scroll(function() {
        for_get_number();
    });
    function for_get_number() {
        for (num_element = 1; num_element <= $('[class*="' + block_name + '"]').length; num_element++)
            signal(num_element);
    }
});