////////////////////////////////////////////////////////////////
// Модуль допустимых символов                                 //
//                                                            //
// Автор: Копытов Д.А. (doomer.net@gmail.com)                 //
////////////////////////////////////////////////////////////////

import { findInput, getPastedText, paste, isString } from '../helpers';

export default {
    /**
     * добавить привязку
     * @param {HTMLElement} el элемент
     * @param {Object} binding параметры
     * @param {Object} node параметры
     */
    bind(el, binding, node) {
        // массив допустимых символов
        const whitelist = [];

        const str = binding.value;
        if (!isString(str)) throw new Error('Аргумент должен быть строкой');

        ////////////////////////////////////////////////////////////////
        // формируем массив допустимых символов
        ////////////////////////////////////////////////////////////////

        const len = str.length;
        let pos = 0, wasSlash = false;
        while (pos < len) {
            const c = str[pos++];
            if (wasSlash) {
                // был слеш
                whitelist.push(c);
                wasSlash = false;
            } else if (c == '\\') {
                // слеш
                wasSlash = true;
            } else if (pos < len - 1) {
                // не последний символ
                if (str[pos] == '-') {
                    // диапазон
                    const b = str.charCodeAt(++pos);
                    for (let i = c.charCodeAt(0); i <= b; i++) {
                        whitelist.push(String.fromCharCode(i));
                    }
                    pos++;
                } else {
                    whitelist.push(c);
                }
            } else {
                whitelist.push(c);
            }
        }

        ////////////////////////////////////////////////////////////////
        // добавляем обработчики событий
        ////////////////////////////////////////////////////////////////

        const input = findInput(el);

        input.addEventListener('keypress', (e) => {
            if (whitelist.indexOf(e.key) < 0) {
                e.preventDefault();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();

            // получаем текст из буфера обмена
            const pasted = getPastedText(e);

            // формируем текст, содержащий только "белые" символы
            let text = '', c;
            for (let i = 0; i < pasted.length; i++) {
                if (whitelist.indexOf(c = pasted[i]) >= 0) text += c;
            }

            // вставляем
            paste(text);
        });
    }
};
