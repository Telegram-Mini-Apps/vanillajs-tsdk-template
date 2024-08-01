(async () => {
  // Uncomment next line for local development outside Telegram Mini App
  // mockEnv();

  const launchParams = window.telegramApps.sdk.retrieveLaunchParams();

  // Launch eruda and enable SDK debug mode, if debug mode was requested outside.
  const debug = launchParams.startParam === 'debug';
  if (debug) {
    window.telegramApps.sdk.setDebug(debug);
  }

  // The web version of Telegram is capable of sending some specific CSS styles we would
  // like to catch.
  if (window.telegramApps.sdk.isIframe()) {
    window.telegramApps.sdk.initWeb(true);
  }

  const {
    miniApp,
    viewport,
    utils,
    themeParams,
    initData,
  } = await initComponents();
  const navigator = await initNavigator();
  const tonConnectUI = initTonConnectUI();

  const routes = [
    { pathname: '/', Page: HomePage },
    { pathname: '/init-data', Page: InitDataPage, title: 'Init Data' },
    { pathname: '/theme-params', Page: ThemeParamsPage, title: 'Theme Params' },
    { pathname: '/launch-params', Page: LaunchParamsPage, title: 'Launch Params' },
    {
      pathname: '/ton-connect',
      Page: TonConnectPage,
      title: 'TON Connect',
      icon: `${window.location.origin}${window.location.pathname}ton.svg`,
    },
  ];

  const root = document.getElementById('root');
  const appContext = {
    initData,
    launchParams,
    miniApp,
    navigator,
    themeParams,
    utils,
    viewport,
    tonConnectUI,
    routes,
  };
  let prevPage;

  function renderCurrentRoute() {
    const route = routes.find(r => r.pathname === navigator.pathname);
    if (!route) {
      navigator.replace('/');
      return;
    }
    prevPage && prevPage.destroy && prevPage.destroy();
    prevPage = new route.Page(appContext);
    prevPage.init && prevPage.init();
    prevPage.render(root);
  }

  navigator.on('change', renderCurrentRoute);
  renderCurrentRoute();
})();
