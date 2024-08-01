async function initComponents() {
  const [miniApp] = window.telegramApps.sdk.initMiniApp();
  const [themeParams] = window.telegramApps.sdk.initThemeParams();
  const utils = window.telegramApps.sdk.initUtils();
  const initData = window.telegramApps.sdk.initInitData();
  const [viewportPromise] = window.telegramApps.sdk.initViewport();

  const viewport = await viewportPromise;

  // Generate Mini Apps related CSS-variables and track their changes.
  window.telegramApps.sdk.bindMiniAppCSSVars(miniApp, themeParams);
  window.telegramApps.sdk.bindThemeParamsCSSVars(themeParams);
  window.telegramApps.sdk.bindViewportCSSVars(viewport);

  return {
    initData,
    miniApp,
    themeParams,
    utils,
    viewport,
  };
}