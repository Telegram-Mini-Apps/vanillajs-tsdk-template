function LaunchParamsPage(context) {
  PageComponent.call(this, new Page({ title: 'Launch Params' }));

  var webApp = context.getWebApp();
  var platform = webApp.platform;
  var version = webApp.version;
  var initDataUnsafe = webApp.initDataUnsafe;

  this.page
    .setDisclaimer([
      'This page displays application ',
      new Link({
        href: 'https://docs.telegram-mini-apps.com/platform/launch-parameters',
      }, context)
        .appendChild('launch parameters')
        .element(),
      '.',
    ])
    .appendChild(
      new DisplayData({
        rows: [
          { title: 'tgWebAppPlatform', value: platform },
          { title: 'tgWebAppVersion', value: version },
          { title: 'tgWebAppStartParam', value: initDataUnsafe && initDataUnsafe.start_param },
          {
            title: 'tgWebAppData',
            value: new Link({ href: '/init-data' }, context)
              .appendChild('View')
              .element(),
          },
          {
            title: 'tgWebAppThemeParams',
            value: new Link({ href: '/theme-params' }, context)
              .appendChild('View')
              .element(),
          }
        ],
      }).element()
    );
}

LaunchParamsPage.prototype = Object.create(PageComponent.prototype);
LaunchParamsPage.prototype.constructor = LaunchParamsPage;