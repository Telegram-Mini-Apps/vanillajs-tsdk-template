class DisplayData {
  constructor({ rows }) {
    this.el = $('<div/>');
    this.setRows(rows);
  }

  /**
   * @returns {HTMLDivElement}
   */
  element() {
    return this.el[0];
  }

  setRows(rows) {
    this.el.empty().append(
      ...rows.map(row => {
        const lineValue = $('<span class="display-data__line-value"/>');
        if (typeof row.value === 'string' && window.telegramApps.sdk.isRGB(row.value)) {
          lineValue.append(new RGB({ color: row.value }).element());
        } else if (row.value === false) {
          lineValue.text('❌');
        } else if (row.value === true) {
          lineValue.text('✔️');
        } else if (row.value === undefined) {
          lineValue.html('<i>empty</i>');
        } else if (row.value instanceof HTMLElement) {
          lineValue.append(row.value);
        } else {
          lineValue.append(row.value.toString());
        }

        return $('<div class="display-data__line"/>').append(
          $('<span class="display-data__line-title"/>').text(row.title),
          lineValue,
        );
      }),
    );
    return this;
  }
}