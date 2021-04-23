(function(){
    // スコープ汚染を防ぐため、即時関数で囲む

    const main = () => {
        const content_nav_tabs: HTMLElement|null = document.getElementById("contest-nav-tabs");
        if (content_nav_tabs === null) {
            return;
        }

        const nav_tabs_ulist:Element|null = content_nav_tabs.getElementsByClassName("nav nav-tabs")[0];
        if (nav_tabs_ulist === null) {
            return;
        }

        // E8's GitHub 要素を追加する
        const github_li = document.createElement("li");
        const github_li_a = document.createElement("a");
        github_li_a.setAttribute("class", "dropdown-toggle");
        github_li_a.setAttribute("data-toggle", "dropdown");
        github_li_a.setAttribute("href", "#");
        github_li_a.setAttribute("role", "button");
        github_li_a.setAttribute("aria-haspopup", "true");
        github_li_a.setAttribute("aria-expanded", "false");

        github_li_a.text = "E8's GitHub";

        const icon_span = document.createElement("span");
        icon_span.setAttribute("class", "glyphicon glyphicon-picture");
        icon_span.setAttribute("aria-hidden", "true");
        github_li_a.insertBefore(icon_span, github_li_a.firstChild);

        const caret_span = document.createElement("span");
        caret_span.setAttribute("class", "caret");
        github_li_a.appendChild(caret_span);

        const dropdown_menu_ul = document.createElement("ul");
        dropdown_menu_ul.setAttribute("class", "dropdown-menu");
        const dropdown_menu_ul_li1 = document.createElement("li");
        const dropdown_menu_ul_li1_a = document.createElement("a");
        dropdown_menu_ul_li1_a.text = "Editorial List";
        dropdown_menu_ul_li1_a.setAttribute("href", "https://github.com/E869120/kyopro_educational_90/tree/main/editorial");
        dropdown_menu_ul_li1_a.setAttribute("target", "_blank");
        dropdown_menu_ul_li1_a.setAttribute("rel", "noopener noreferrer");

        const dropdown_menu_ul_li2 = document.createElement("li");
        const dropdown_menu_ul_li2_a = document.createElement("a");
        dropdown_menu_ul_li2_a.text = "Problem List"
        dropdown_menu_ul_li2_a.setAttribute("href", "https://github.com/E869120/kyopro_educational_90/tree/main/problem");
        dropdown_menu_ul_li2_a.setAttribute("target", "_blank");
        dropdown_menu_ul_li2_a.setAttribute("rel", "noopener noreferrer");

        const dropdown_menu_ul_li3 = document.createElement("li");
        const dropdown_menu_ul_li3_a = document.createElement("a");
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

        nav_tabs_ulist.appendChild(github_li);

        github_li.appendChild(github_li_a);
        github_li.appendChild(dropdown_menu_ul);
    };

    window.onload = () => {
        main();
    }

})();