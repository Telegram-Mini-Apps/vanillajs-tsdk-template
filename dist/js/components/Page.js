class Page {
  constructor({ title }) {
    this.el = $('<div class="page"/>').append($('<h1/>').text(title));
  }

  appendChild(...children) {
    this.el.append(...filterChildren(children));
    return this;
  }

  /**
   * @returns {HTMLDivElement}
   */
  element() {
    return this.el[0];
  }

  setDisclaimer(disclaimer) {
    if (this.disclaimer) {
      this.disclaimer.empty().append(...toArray(disclaimer));
    } else {
      this.disclaimer = $('<div class="page__disclaimer"/>')
        .append(...toArray(disclaimer))
        .insertAfter(this.el.children('h1'));
    }
    return this;
  }
}
