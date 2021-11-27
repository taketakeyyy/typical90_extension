const order_list_by_default = require("./order_list_by_default");
const order_list_by_difficulty = require("./order_list_by_difficulty");

// ソート方法を指定するときの定数
export const SORT_VALUE_DEFAULT: string = "default";
export const SORT_VALUE_DIFFICULTY: string = "difficulty";

// ID定数
const ID_TR_PROBLEM_PREFIX: string = "id_tr_problem__";

/*** ソートする用のIDを各trタグに付ける。
 *
 */
export const add_problem_ids = async (): Promise<boolean> => {
    // 必要なDOMがすべて存在するか？
    const table: Element|null = document.getElementsByClassName("table table-bordered table-striped")[0];
    if (table == null) return false;

    const tbody: Element|null = table.getElementsByTagName("tbody")[0];
    if (tbody == null) return false;

    const trs: HTMLCollectionOf<HTMLTableRowElement> = tbody.getElementsByTagName("tr");
    if (trs.length !== 90) return false;

    // 各trタグにidをつけていく
    for(let i=0; i<90; i++) {
        const num: string = ("000" + (i+1)).slice(-3);
        trs[i].id = ID_TR_PROBLEM_PREFIX + num;
    }

    return true;
}


/** 問題をソートする
 * Args:
 *  order(string) : ソートの指定
 *      "default": 番号順
 *      "difficulty": 難易度順（★順）
 */
export const sort = async (order: string): Promise<boolean> => {
    // 必要なDOMがすべて存在するか？
    const table: Element|null = document.getElementsByClassName("table table-bordered table-striped")[0];
    if (table == null) return false;

    const tbody: Element|null = table.getElementsByTagName("tbody")[0];
    if (tbody == null) return false;

    const trs: HTMLCollectionOf<HTMLTableRowElement> = tbody.getElementsByTagName("tr");
    if (trs.length !== 90) return false;

    // ソートする際のリストを選ぶ
    let order_list: number[];
    if (order === SORT_VALUE_DEFAULT) {
        order_list = order_list_by_default.LIST;
    }
    else if (order === SORT_VALUE_DIFFICULTY) {
        order_list = order_list_by_difficulty.LIST;
    }
    else {
        return false;
    }

    // DOMを並び替える
    for(let i=0; i<90; i++) {
        const problem_num: string = ("000" + order_list[i]).slice(-3);
        const id = ID_TR_PROBLEM_PREFIX + problem_num;
        const tr: HTMLElement = document.getElementById(id)!;
        tbody.appendChild(tr);
    }

    return true;
};