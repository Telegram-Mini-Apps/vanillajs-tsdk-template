class ThemeParamsPage extends PageComponent {
  constructor(context) {
    super(new Page({ title: 'Theme Params' }));
    this.context = context;
    this.dd = new DisplayData({ rows: this.computeRows() });
    this
      .page
      .setDisclaimer([
        'This page displays current ',
        new Link({ href: 'https://docs.telegram-mini-apps.com/platform/theming' }, this.context)
          .appendChild('theme parameters')
          .element(),
        '. It is reactive, so, changing theme externally will lead to this page updates.',
      ])
      .appendChild(this.dd.element());
  }

  computeRows() {
    return Object
      .entries(this.context.themeParams.getState())
      .map(([title, value]) => ({
        title: title
          .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
          .replace(/background/, 'bg'),
        value,
      }));
  }

  onThemeChange = () => {
    this.dd.setRows(this.computeRows());
  };

  init() {
    this.context.themeParams.on('change', this.onThemeChange);
  }

  destroy() {
    this.context.themeParams.off('change', this.onThemeChange);
  }
}