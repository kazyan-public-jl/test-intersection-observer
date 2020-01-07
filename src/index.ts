/**
 * intersection observer api を試す
 * 
 */

/**
 * エレメントがビューポートに入った時の処理
 * コールバックは IntersectionObserverEntry オブジェクトとオブザーバーのリストを受け取ります
 */
const callback = (entries: any, observer: any) => {
  console.log("callback: entries=", entries);
  entries.forEach((entry: any, index: number) => {
    console.log("callback: entry", index, entry.isIntersecting, entry.target);
    const targetElement = entry.target as HTMLElement;
    if (!entry.isIntersecting) {
      // ビューポートに入ってないなら何もしない
      return;
    }
    if (
      targetElement.hasAttribute("src") &&
      targetElement.hasAttribute("data-src")
    ) {
      // ダミーのsrcを本物のsrcに置き換える
      const dataSrc =
        targetElement.getAttribute("data-src") ||
        targetElement.getAttribute("src") ||
        "";
      console.log("dataSrc = ", dataSrc);
      targetElement.setAttribute("src", dataSrc);
    }
  });
};

/**
 * エレメントがビューポートに入った時の処理を登録する
 * @param targetElement 遅延イベントを登録したいエレメント
 */
const createObserver = (targetElement: HTMLElement) => {
  const options = {
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

  const observer = new IntersectionObserver(callback, options);
  observer.observe(targetElement);
};

// ページの初期ロードが完全に終わったら、オブザーバーを登録していく
window.addEventListener("load", () => {
  const boxElement = document.querySelector("#box") as HTMLElement;
  createObserver(boxElement);

  const audioElements = document.querySelectorAll("audio") as NodeListOf<
    HTMLAudioElement
  >;
  audioElements.forEach(audio => createObserver(audio));

  const imageElements = document.querySelectorAll("img") as NodeListOf<
    HTMLImageElement
  >;
  imageElements.forEach(image => createObserver(image));
});
