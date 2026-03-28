(function restoreGitHubPagesRoute() {
  try {
    var params = new URLSearchParams(window.location.search);
    var path = params.get("p");

    if (!path) {
      return;
    }

    var query = params.get("q");
    var restoredPath = decodeURIComponent(path);
    var restoredQuery = query ? "?" + decodeURIComponent(query) : "";
    var restoredUrl =
      window.location.origin +
      window.location.pathname +
      restoredPath +
      restoredQuery +
      window.location.hash;

    window.history.replaceState(null, "", restoredUrl);
  } catch (error) {
    if (window.location && window.location.search.includes("p=")) {
      window.history.replaceState(
        null,
        "",
        window.location.origin + window.location.pathname,
      );
    }
  }
})();
