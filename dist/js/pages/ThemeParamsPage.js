function ThemeParamsPage(context) {
  PageComponent.call(this, new Page({ title: 'Theme Params' }));
  this.context = context;
  this.dd = new DisplayData({ rows: this.computeRows() });
  this.page
    .setDisclaimer([
      'This page displays current ',
      new Link({ href: 'https://docs.telegram-mini-apps.com/platform/theming' }, this.context)
        .appendChild('theme parameters')
        .element(),
      '. It is reactive, so, changing theme externally will lead to this page updates.',
    ])
    .appendChild(this.dd.element());
}

ThemeParamsPage.prototype = Object.create(PageComponent.prototype);
ThemeParamsPage.prototype.constructor = ThemeParamsPage;

ThemeParamsPage.prototype.computeRows = function() {
  return Object.entries(this.context.getWebApp().themeParams)
    .map(function(entry) {
      var title = entry[0];
      var value = entry[1];
      return {
        title: title
          .replace(/[A-Z]/g, function(m) { return `_${m.toLowerCase()}`; })
          .replace(/background/, 'bg'),
        value: value,
      };
    });
};

ThemeParamsPage.prototype.onThemeChange = function() {
  this.dd.setRows(this.computeRows());
};

ThemeParamsPage.prototype.init = function() {
  var self = this;
  this.context.getWebApp().onEvent('themeChanged', function() {
    self.onThemeChange();
  });
};

ThemeParamsPage.prototype.destroy = function() {
  var self = this;
  this.context.getWebApp().offEvent('themeChanged', function() {
    self.onThemeChange();
  });
};