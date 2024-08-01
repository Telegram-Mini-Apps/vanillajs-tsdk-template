class TonConnectButton {
  /**
   * @param {{ id: string, class?: string }}
   */
  constructor({ id, class: className }) {
    this.el = $('<div/>')
      .addClass(className ?? '')
      .append($('<div style="width: fit-content;"/>').attr('id', id));
  }

  /**
   * @returns {HTMLDivElement}
   */
  element() {
    return this.el[0]
  }
}