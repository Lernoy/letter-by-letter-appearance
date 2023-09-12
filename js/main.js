// Объявляем константу block_name со значением 'letter_by_letter'
$(document).ready(() => {
    // Добавляем метод animate_Text к jQuery объекту
    $.fn.animate_Text = function(block_number) {
        // Для каждого элемента, на который был применен метод
        return this.each(function() {
            // Заменяем каждый символ внутри элемента на <span> с классом new{block_number}
            $(this).html($(this).text().replace(/./g, `<span class="new${block_number}">$&</span>`));
            $('span.new' + block_number + '').each((i, el) => {
                // Постепенно добавляем класс div_opacity для каждого элемента
                setTimeout(() => {$(el).addClass('div_opacity');}, 40 * i);
            });
        });
    };
});

// Функция isVisible проверяет, виден ли элемент на экране
const isVisible = (tag) => {
    const t = $(tag);
    const w = $(window);
    const wt = w.scrollTop();
    const tt = t.offset().top;
    const tb = tt + t.height();
    return ((tb <= wt + w.height()) && (tt >= wt));
};

// Функция signal проверяет, нужно ли отобразить элемент и добавить на него анимацию
const signal = (visible_scroll_element) => {
    const b = $('[class*=' + block_name + visible_scroll_element + ']');
    if (!b.prop("shown") && isVisible(b)) {
        b.prop("shown", true);
        $(b).show();
        $(b).animate_Text(visible_scroll_element);
    }
};

$(function() {
    // Вызываем функцию for_get_number для первоначальной настройки
    for_get_number();
    // При прокрутке окна вызываем функцию for_get_number
    $(window).scroll(() => {
        for_get_number();
    });

    // Функция for_get_number проверяет видимость каждого элемента с классом, содержащим block_name
    function for_get_number() {
        for (let num_element = 1; num_element <= $('[class*="' + block_name + '"]').length; num_element++)
            signal(num_element);
    }
});
