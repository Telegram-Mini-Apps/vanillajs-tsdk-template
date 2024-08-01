
class HomePage {
  constructor(context) {
    this.page = new Page({ title: 'Home Page' }).appendChild(
      $('<p/>').text(
        'This page is a home page in this boilerplate. You can use the links below to visit other pages with their own functionality.',
      ),
      $('<ul class="index-page__links"/>').append(
        ...context.routes.reduce((acc, r) => {
          if (r.title) {
            acc.push(
              $('<li class="index-page__link-item"/>').append(
                new Link({ class: 'index-page__link', href: r.pathname }, context)
                  .appendChild(
                    r.icon && $('<i class="index-page__link-icon"/>').append(
                      $('<img/>').attr('src', r.icon),
                    ),
                    r.title,
                  )
                  .element(),
              ),
            );
          }
          return acc;
        }, []),
      ),
    );
  }

  /**
   * @param {HTMLElement} root 
   */
  render(root) {
    $(root).empty().append(this.page.element());
  }
}