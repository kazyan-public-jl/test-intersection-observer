"use strict";
/**
 * コールバックは IntersectionObserverEntry オブジェクトとオブザーバーのリストを受け取ります
 */
var callback = function (entries, observer) {
    console.log("callback: entries=", entries);
    entries.forEach(function (entry, index) {
        console.log("callback: entry", index, entry.isIntersecting, entry.target);
        var targetElement = entry.target;
        if (!entry.isIntersecting) {
            return;
        }
        if (targetElement.hasAttribute("src") &&
            targetElement.hasAttribute("data-src")) {
            var dataSrc = targetElement.getAttribute("data-src") ||
                targetElement.getAttribute("src") ||
                "";
            console.log("dataSrc = ", dataSrc);
            targetElement.setAttribute("src", dataSrc);
        }
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
    });
};
var createObserver = function (targetElement) {
    var options = {
        /**
         * target が見えるかどうかを確認するためのビューポートとして使用される要素です。
         * 指定されなかった場合、もしくは null の場合はデフォルトでブラウザーのビューポートが使用されます。
         */
        root: null,
        /**
         * 交差を計算する前にルート要素の範囲のボックスの各辺を拡大または縮小させることができます。既定ではすべてゼロです。
         */
        rootMargin: "0px",
        /**
         * オブザーバーのコールバックを実行する target がどのくらいの割合で見えているかを示します。
         * 既定値は 0 です
         */
        threshold: 1.0
    };
    console.log("createObserver:", targetElement, options);
    var observer = new IntersectionObserver(callback, options);
    observer.observe(targetElement);
};
window.addEventListener("load", function () {
    console.log("window.load()");
    var boxElement = document.querySelector("#box");
    createObserver(boxElement);
    // 範囲判定
    var audioElements = document.querySelectorAll("audio");
    audioElements.forEach(function (audio) { return createObserver(audio); });
    var imageElements = document.querySelectorAll("img");
    imageElements.forEach(function (image) { return createObserver(image); });
});
//# sourceMappingURL=index.js.map