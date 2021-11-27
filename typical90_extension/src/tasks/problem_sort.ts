import { resolve } from "path";

const sort_mod = require("../mods/sort/sort");

/*** 動作させるかどうかの判定
 * Notes
 *   問題ページだけ動作してほしい。すなわちURLのpathnameが、
 *   "/contests/typical90/tasks"
 *   のときだけである。
 */
const is_target_url = async (): Promise<boolean> => {
    const pathname: string = location.pathname;
    return (pathname === "/contests/typical90/tasks");
};


/** 並べ替えボタンを追加する
 *
 */
const add_sort_element = async (): Promise<boolean> => {
    // 必要なDOMが存在するか確認する
    const content_nav_tabs: HTMLElement|null = document.getElementById("contest-nav-tabs");
    if (content_nav_tabs == null) return false;

    const nav_tabs_ulist: Element|null = content_nav_tabs.getElementsByClassName("nav nav-tabs")[0];
    if (nav_tabs_ulist == null) return false;

    // 並べ替えの 要素を追加する
    const sort_li: HTMLLIElement = document.createElement("li");
    const sort_li_a: HTMLAnchorElement = document.createElement("a");
    sort_li_a.setAttribute("class", "dropdown-toggle");
    sort_li_a.setAttribute("data-toggle", "dropdown");
    sort_li_a.setAttribute("href", "#");
    sort_li_a.setAttribute("role", "button");
    sort_li_a.setAttribute("aria-haspopup", "true");
    sort_li_a.setAttribute("aria-expanded", "false");
    sort_li_a.text = "並べ替え";

    const icon_span: HTMLSpanElement = document.createElement("span");
    icon_span.setAttribute("class", "glyphicon glyphicon-sort-by-order");
    icon_span.setAttribute("aria-hidden", "true");
    sort_li_a.insertBefore(icon_span, sort_li_a.firstChild);

    const caret_span: HTMLSpanElement = document.createElement("span");
    caret_span.setAttribute("class", "caret");
    sort_li_a.appendChild(caret_span);

    const dropdown_menu_ul: HTMLUListElement = document.createElement("ul");
    dropdown_menu_ul.setAttribute("class", "dropdown-menu");

    const form_radio: HTMLFormElement = document.createElement("form");
    form_radio.id = "id_form_sort";
    dropdown_menu_ul.appendChild(form_radio);

    const dropdown_menu_ul_lis: HTMLLIElement[] = new Array(2);
    for(let i=0; i<2; i++) {
        dropdown_menu_ul_lis[i] = document.createElement("li");

        const label: HTMLLabelElement = document.createElement("label");
        const radio: HTMLInputElement = document.createElement("input");
        radio.type = "radio";
        radio.name = "sort";
        if (i===0) {
            radio.value = sort_mod.SORT_VALUE_DEFAULT;
            radio.id = "id_radio_sort__" + sort_mod.SORT_VALUE_DEFAULT;
            radio.addEventListener("click", () => {sort_mod.sort(sort_mod.SORT_VALUE_DEFAULT)});
            radio.addEventListener("click", () => {save_sort_value(sort_mod.SORT_VALUE_DEFAULT)});
            label.textContent = "番号順（デフォルト）";
        }
        else if (i===1) {
            radio.value = sort_mod.SORT_VALUE_DIFFICULTY;
            radio.id = "id_radio_sort__" + sort_mod.SORT_VALUE_DIFFICULTY;
            radio.addEventListener("click", () => {sort_mod.sort(sort_mod.SORT_VALUE_DIFFICULTY)});
            radio.addEventListener("click", () => {save_sort_value(sort_mod.SORT_VALUE_DIFFICULTY)});
            label.textContent = "難易度順（★順）";
        }

        label.insertBefore(radio, label.firstChild);
        dropdown_menu_ul_lis[i].appendChild(label);
        form_radio.appendChild(dropdown_menu_ul_lis[i]);
    }

    sort_li.appendChild(sort_li_a);
    sort_li.appendChild(dropdown_menu_ul);

    nav_tabs_ulist.appendChild(sort_li);

    return true;
};


/*** ソートの設定値をchrome.storageから読み込む
 *
 */
const get_sort_value_from_storage = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get({
            sort_value: sort_mod.SORT_VALUE_DEFAULT
        }, (result) => {
            return resolve(result.sort_value);
        });
    });
};


/*** ソートの設定値をchrome.storageに保存する
 *
 */
const save_sort_value = (sort_value: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({sort_value: sort_value});
        return resolve();
    });
}


/*** 指定のソート方法のラジオボタンを選択する
 * Args:
 *  sort_value(string): ソート方法
 */
const check_radio_button = async (sort_value: string): Promise<void> => {
    const radio: HTMLElement|null = document.getElementById("id_radio_sort__" + sort_value);
    if (radio == null) return;
    (radio as HTMLInputElement).checked = true;
};


/*** タスクのメイン関数
 *
 */
export const run = async (): Promise<void> => {
    // 「問題」ページのみ動作させる
    if (!await is_target_url()) return;

    // 「並べ替え」の項目を追加する
    if (!await add_sort_element()) return;

    // ソートできるように各問題にIDを追加する
    if (!await sort_mod.add_problem_ids()) return;

    // ソートの設定値を読み込む
    const sort_value: string = await get_sort_value_from_storage();

    // ラジオボタンのチェックボックスにチェックする
    await check_radio_button(sort_value);

    // ソートを実行する
    if (sort_value === sort_mod.SORT_VALUE_DEFAULT) {
        return;
    }
    else {
        sort_mod.sort(sort_value);
    }
};