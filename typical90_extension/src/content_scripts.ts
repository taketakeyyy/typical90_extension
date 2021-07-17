(function(){
    // スコープ汚染を防ぐため、即時関数で囲む
    const cp = require("./consts/problem");
    const ce = require("./consts/editorial");
    const cc = require("./consts/code");

    const append_individual_links = (dropdown_menu_ul: HTMLUListElement) => {
        const pathnames: string[] = location.pathname.split("/");
        let problem_name: string = pathnames[pathnames.length-1];
        if (problem_name === "") {
            problem_name = pathnames[pathnames.length-2];
        }

        if (cp.PROBLEM_LINK_DICT[problem_name] == null) return;

        // Problem
        const p_base_url: string = "https://github.com/E869120/kyopro_educational_90/blob/main/problem/";
        const p_ul_li: HTMLLIElement = document.createElement("li");
        const p_ul_li_a: HTMLAnchorElement = document.createElement("a");
        p_ul_li_a.text = "Problem: " + cp.PROBLEM_LINK_DICT[problem_name];
        p_ul_li_a.setAttribute("href", p_base_url + cp.PROBLEM_LINK_DICT[problem_name]);
        p_ul_li_a.setAttribute("target", "_blank");
        p_ul_li_a.setAttribute("rel", "noopener noreferrer");
        p_ul_li.appendChild(p_ul_li_a);
        dropdown_menu_ul.appendChild(p_ul_li);

        const p_divider: HTMLLIElement = document.createElement("li");
        p_divider.setAttribute("class", "divider");
        dropdown_menu_ul.appendChild(p_divider);

        // Editorial
        const e_base_url: string = "https://github.com/E869120/kyopro_educational_90/blob/main/editorial/";
        for (const value of ce.EDITORIAL_LINK_DICT[problem_name]) {
            const ul_li: HTMLLIElement = document.createElement("li");
            const ul_li_a: HTMLAnchorElement = document.createElement("a");
            ul_li_a.text = "Editorial: " + value;
            ul_li_a.setAttribute("href", e_base_url + value);
            ul_li_a.setAttribute("target", "_blank");
            ul_li_a.setAttribute("rel", "noopener noreferrer");
            ul_li.appendChild(ul_li_a);
            dropdown_menu_ul.appendChild(ul_li);
        }

        const e_divider: HTMLLIElement = document.createElement("li");
        e_divider.setAttribute("class", "divider");
        dropdown_menu_ul.appendChild(e_divider);

        // Code
        const c_base_url: string = "https://github.com/E869120/kyopro_educational_90/blob/main/sol/";
        for (const value of cc.CODE_LINK_DICT[problem_name]) {
            const ul_li: HTMLLIElement = document.createElement("li");
            const ul_li_a: HTMLAnchorElement = document.createElement("a");
            ul_li_a.text = "Code: " + value;
            ul_li_a.setAttribute("href", c_base_url + value);
            ul_li_a.setAttribute("target", "_blank");
            ul_li_a.setAttribute("rel", "noopener noreferrer");
            ul_li.appendChild(ul_li_a);
            dropdown_menu_ul.appendChild(ul_li);
        }

        const c_divider: HTMLLIElement = document.createElement("li");
        c_divider.setAttribute("class", "divider");
        dropdown_menu_ul.appendChild(c_divider);
    };

    const append_common_links = (dropdown_menu_ul: HTMLUListElement) => {
        const dropdown_menu_ul_li1: HTMLLIElement = document.createElement("li");
        const dropdown_menu_ul_li1_a: HTMLAnchorElement = document.createElement("a");
        dropdown_menu_ul_li1_a.text = "Editorial List";
        dropdown_menu_ul_li1_a.setAttribute("href", "https://github.com/E869120/kyopro_educational_90/tree/main/editorial");
        dropdown_menu_ul_li1_a.setAttribute("target", "_blank");
        dropdown_menu_ul_li1_a.setAttribute("rel", "noopener noreferrer");

        const dropdown_menu_ul_li2: HTMLLIElement = document.createElement("li");
        const dropdown_menu_ul_li2_a: HTMLAnchorElement = document.createElement("a");
        dropdown_menu_ul_li2_a.text = "Problem List"
        dropdown_menu_ul_li2_a.setAttribute("href", "https://github.com/E869120/kyopro_educational_90/tree/main/problem");
        dropdown_menu_ul_li2_a.setAttribute("target", "_blank");
        dropdown_menu_ul_li2_a.setAttribute("rel", "noopener noreferrer");

        const dropdown_menu_ul_li3: HTMLLIElement = document.createElement("li");
        const dropdown_menu_ul_li3_a: HTMLAnchorElement = document.createElement("a");
        dropdown_menu_ul_li3_a.text = "Code List"
        dropdown_menu_ul_li3_a.setAttribute("href", "https://github.com/E869120/kyopro_educational_90/tree/main/sol");
        dropdown_menu_ul_li3_a.setAttribute("target", "_blank");
        dropdown_menu_ul_li3_a.setAttribute("rel", "noopener noreferrer");

        dropdown_menu_ul_li1.appendChild(dropdown_menu_ul_li1_a);
        dropdown_menu_ul_li2.appendChild(dropdown_menu_ul_li2_a);
        dropdown_menu_ul_li3.appendChild(dropdown_menu_ul_li3_a);

        dropdown_menu_ul.appendChild(dropdown_menu_ul_li2);
        dropdown_menu_ul.appendChild(dropdown_menu_ul_li1);
        dropdown_menu_ul.appendChild(dropdown_menu_ul_li3);
    };

    const main = () => {
        const content_nav_tabs: HTMLElement|null = document.getElementById("contest-nav-tabs");
        if (content_nav_tabs == null) return;

        const nav_tabs_ulist: Element|null = content_nav_tabs.getElementsByClassName("nav nav-tabs")[0];
        if (nav_tabs_ulist == null) return;

        // E8's GitHub 要素を追加する
        const github_li: HTMLLIElement = document.createElement("li");
        const github_li_a: HTMLAnchorElement = document.createElement("a");
        github_li_a.setAttribute("class", "dropdown-toggle");
        github_li_a.setAttribute("data-toggle", "dropdown");
        github_li_a.setAttribute("href", "#");
        github_li_a.setAttribute("role", "button");
        github_li_a.setAttribute("aria-haspopup", "true");
        github_li_a.setAttribute("aria-expanded", "false");

        github_li_a.text = "E8's GitHub";

        const icon_span: HTMLSpanElement = document.createElement("span");
        icon_span.setAttribute("class", "glyphicon glyphicon-picture");
        icon_span.setAttribute("aria-hidden", "true");
        github_li_a.insertBefore(icon_span, github_li_a.firstChild);

        const caret_span: HTMLSpanElement = document.createElement("span");
        caret_span.setAttribute("class", "caret");
        github_li_a.appendChild(caret_span);

        const dropdown_menu_ul: HTMLUListElement = document.createElement("ul");
        dropdown_menu_ul.setAttribute("class", "dropdown-menu");

        append_individual_links(dropdown_menu_ul);
        append_common_links(dropdown_menu_ul);

        nav_tabs_ulist.appendChild(github_li);

        github_li.appendChild(github_li_a);
        github_li.appendChild(dropdown_menu_ul);
    };

    window.onload = () => {
        main();
    }

})();