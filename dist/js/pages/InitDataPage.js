function getUserRows(user) {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photoUrl },
    { title: 'last_name', value: user.lastName },
    { title: 'first_name', value: user.firstName },
    { title: 'is_bot', value: user.isBot },
    { title: 'is_premium', value: user.isPremium },
    { title: 'language_code', value: user.languageCode },
    { title: 'allows_to_write_to_pm', value: user.allowsWriteToPm },
    { title: 'added_to_attachment_menu', value: user.addedToAttachmentMenu },
  ];
}

function InitDataPage(context) {
  PageComponent.call(this, new Page({ title: 'Init Data' }));
  var initDataRaw = context.getWebApp().initData;
  var initData = context.getWebApp().initDataUnsafe;

  var initDataRows = (initData && initDataRaw) ? [
    { title: 'raw', value: initDataRaw },
    { title: 'auth_date', value: new Date(initData.auth_date * 1000).toLocaleString() },
    { title: 'auth_date (raw)', value: initData.auth_date },
    { title: 'hash', value: initData.hash },
    { title: 'can_send_after', value: initData.can_send_after },
    { title: 'query_id', value: initData.query_id },
    { title: 'start_param', value: initData.start_param },
    { title: 'chat_type', value: initData.chat_type },
    { title: 'chat_instance', value: initData.chat_instance },
  ] : undefined;

  var userRows = (initData && initData.user) ? getUserRows(initData.user) : undefined;
  var receiverRows = (initData && initData.receiver) ? getUserRows(initData.receiver) : undefined;
  var chatRows = (initData && initData.chat) ? [
    { title: 'id', value: initData.chat.id.toString() },
    { title: 'title', value: initData.chat.title },
    { title: 'type', value: initData.chat.type },
    { title: 'username', value: initData.chat.username },
    { title: 'photo_url', value: initData.chat.photo_url },
  ] : undefined;

  this.page
    .setDisclaimer([
      'This page displays application ',
      new Link({
        href: 'https://docs.telegram-mini-apps.com/platform/init-data',
      }, context)
        .appendChild('init data')
        .element(),
      '.',
    ]).appendChild(
    initDataRows ? [
      $('<div class="init-data-page__section"/>').append(
        '<h2 class="init-data-page__section-title">Init data</h2>',
        new DisplayData({ rows: initDataRows }).element()
      ),
      $('<div class="init-data-page__section"/>').append(
        '<h2 class="init-data-page__section-title">User</h2>',
        userRows ? new DisplayData({ rows: userRows }).element() : '<i>User information missing</i>'
      ),
      $('<div class="init-data-page__section"/>').append(
        '<h2 class="init-data-page__section-title">Receiver</h2>',
        receiverRows ? new DisplayData({ rows: receiverRows }).element() : '<i>Receiver information missing</i>'
      ),
      $('<div class="init-data-page__section"/>').append(
        '<h2 class="init-data-page__section-title">Chat</h2>',
        chatRows ? new DisplayData({ rows: chatRows }).element() : '<i>Chat information missing</i>'
      ),
    ] : $('<i>Application was launched with missing init data</i>')
  );
}

InitDataPage.prototype = Object.create(PageComponent.prototype);
InitDataPage.prototype.constructor = InitDataPage;