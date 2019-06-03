import Vue from 'vue';

import { isObject, isString } from './helpers';

// импортируем модули
import allowedChars from './modules/allowedChars';
import regexp from './modules/regexp';

/** модули */
const modules = {
    allowedChars,
    regexp,
};

/**
 * найти модуль
 * @param {string} key имя модуля
 * @return {Object} модуль
 */
function findModule(key) {
    if (modules.hasOwnProperty(key)) {
        // вызываем модуль
        return modules[key];
    } else {
        throw new Error(`Недопустимый аргумент директивы input: ${key}`);
    }
}

/**
 * вызвать метод модуля
 * @param {string} method имя метода
 * @param {HTMLElement} el элемент
 * @param {Object} binding параметры
 * @param {...any} args прочие аргументы
 */
function callModuleMethod(method, el, binding, ...args) {
    const module = findModule(binding.arg);
    if (isObject(module)) {
        if (module.hasOwnProperty(method)) {
            module[method](el, binding, ...args);
        }
    }
}

/** директива */
const input = Vue.directive('input', {
    bind: function (el, binding, ...args) {
        callModuleMethod('bind', el, binding, args);
    },
    inserted: function (el, binding, ...args) {
        callModuleMethod('inserted', el, binding, args);
    },
    update: function (el, binding, ...args) {
        callModuleMethod('update', el, binding, args);
    },
    componentUpdated: function (el, binding, ...args) {
        callModuleMethod('componentUpdated', el, binding, args);
    },
    unbind: function (el, binding, ...args) {
        callModuleMethod('unbind', el, binding, args);
    }
});

export default input;
