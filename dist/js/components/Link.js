class Link {
  constructor({ href, class: className }, context) {
    const targetUrl = new URL(href, window.location.toString());
    const currentUrl = new URL(window.location.toString());
    const isExternal = targetUrl.protocol !== currentUrl.protocol
      || targetUrl.host !== currentUrl.host;

    this.el = $('<a/>')
      .attr('class', 'link')
      .addClass(className ?? '')
      .attr('href', isExternal ? href : context.navigator.renderPath(href));

    if (isExternal) {
      this.el.on('click', (e) => {
        e.preventDefault();
        context.utils.openLink(targetUrl.toString());
      });
    }
  }

  appendChild(...children) {
    this.el.append(...filterChildren(children));
    return this;
  }

  /**
   * @returns {HTMLAnchorElement}
   */
  element() {
    return this.el[0];
  }
}
