////////////////////////////////////////////////////////////////
// Модуль проверки по регулярке                               //
//                                                            //
// Автор: Копытов Д.А. (doomer.net@gmail.com)                 //
////////////////////////////////////////////////////////////////

import { findInput, getPastedText, paste, emulateKeyboardEvent } from '../helpers';

export default {
    /**
     * добавить привязку
     * @param {HTMLElement} el элемент
     * @param {Object} binding параметры
     * @param {Object} node параметры
     */
    bind(el, binding, node) {
        // получаем регулярку
        const regex = new RegExp(binding.value);

        ////////////////////////////////////////////////////////////////
        // добавляем обработчики событий
        ////////////////////////////////////////////////////////////////

        const input = findInput(el);

        /**
         * функция проверки допустимости ввода
         * @param {KeyboardEvent} e событие
         */
        const check = function (e) {
            if (!emulateKeyboardEvent(input, e).match(regex)) e.preventDefault();
        };

        input.addEventListener('keypress', check);
        input.addEventListener('paste', check);
    }
};
