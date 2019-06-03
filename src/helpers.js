////////////////////////////////////////////////////////////////
// хелперы
////////////////////////////////////////////////////////////////

/**
 * проверить, является ли значение строкой
 * @param {any} value значение
 * @return {boolean} результат
 */
export function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

/**
 * проверить, является ли значение объектом
 * @param {any} value значение
 * @return {boolean} результат
 */
export function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

/**
 * найти элемент ввода указанного типа
 * @param {HTMLElement} el родительский элемент
 * @param {string} tag имя тега
 * @return {HTMLElement} элемент
 */
export function findInput(el, tag = 'input') {
    // возвращаем сам элемент, если он соответствует тегу
    if (el.tagName == tag) return el;

    const chilren = el.getElementsByTagName(tag);
    if (chilren && chilren.length > 0) {
        return chilren[0];
    } else {
        throw new Error('Не найден элемент ввода');
    }
}

/**
 * вставить текст
 * @param {string} text текст
 */
export function paste(text) {
    if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, text);
    } else {
        document.execCommand('paste', false, text);
    }
}

/**
 * получить вставленный текст
 * @param {ClipboardEvent} e событие
 * @return {string} текст
 */
export function getPastedText(e) {
    const clipboardData = e.clipboardData || window.clipboardData;
    return clipboardData.getData('Text');
}

/**
 * эмулировать событие ввода
 * @param {HTMLInputElement} input элемент ввода
 * @param {KeyboardEvent} e событие
 * @return {string} текст, получившийся в результате ввода
 */
export function emulateKeyboardEvent(input, e) {
    // получаем значени и границы выделения
    const value = input.value;
    const a = value.substr(0, input.selectionStart);
    const b = value.substr(input.selectionEnd);

    // определяем логику исходя из события
    switch (e.type) {
        case 'keypress':
            // нажатие клавиши
            return a + e.key + b;
        case 'paste':
            // вставка
            return a + getPastedText(e) + b;
        default:
            throw new Error(`Поддержка события не реализована: ${e.type}`);
    }
}
