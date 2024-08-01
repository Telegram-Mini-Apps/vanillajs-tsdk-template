class PageComponent {
  constructor(page) {
    this.page = page;
  }

  /**
   * @param {HTMLElement} root
   * @returns {void}
   */
  render(root) {
    $(root).empty().append(this.page.element());
  }
}