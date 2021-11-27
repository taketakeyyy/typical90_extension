(function(){
    // スコープ汚染を防ぐため、即時関数で囲む
    const e8link = require("./tasks/e8link");
    const problem_sort = require("./tasks/problem_sort");

    const main = async () => {
        await e8link.run();
        await problem_sort.run();
    };

    window.onload = () => {
        main();
    }

})();