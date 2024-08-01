var tonConnectUI = initTonConnectUI();

var routes = [
  { pathname: '/', Page: HomePage },
  { pathname: '/init-data', Page: InitDataPage, title: 'Init Data' },
  { pathname: '/theme-params', Page: ThemeParamsPage, title: 'Theme Params' },
  { pathname: '/launch-params', Page: LaunchParamsPage, title: 'Launch Params' },
  {
    pathname: '/ton-connect',
    Page: TonConnectPage,
    title: 'TON Connect',
    icon: window.location.origin + window.location.pathname + 'ton.svg'
  },
];

var root = document.getElementById('root');
var appContext = {
  getWebApp: function() {
    return window.Telegram.WebApp;
  },
  tonConnectUI: tonConnectUI,
  routes: routes
};
var prevPage;

appContext.getWebApp().BackButton.onClick(goBack);

window.addEventListener('hashchange', function() {
  var path = window.location.hash.slice(1);
  renderCurrentRoute(path);
  updateBackButton(path);
});

renderCurrentRoute(window.location.hash.slice(1));

function renderCurrentRoute(path) {
  var route = routes.find(function(r) { return r.pathname === path; });
  if (!route) {
    window.location.hash = '#/';
    return;
  }
  if (prevPage && typeof prevPage.destroy === 'function') {
    prevPage.destroy();
  }
  prevPage = new route.Page(appContext);
  if (typeof prevPage.init === 'function') {
    prevPage.init();
  }
  prevPage.render(root);
}

function goBack() {
  window.history.go(-1);
}

function updateBackButton(path) {
  if (path === '/') {
    if (appContext.getWebApp().BackButton.isVisible) {
      appContext.getWebApp().BackButton.hide();
    }
  } else {
    if (!appContext.getWebApp().BackButton.isVisible) {
      appContext.getWebApp().BackButton.show();
    }
  }
}