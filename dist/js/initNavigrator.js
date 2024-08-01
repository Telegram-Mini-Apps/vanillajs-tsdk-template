async function initNavigator() {
  const navigator = window.telegramApps.sdk.initNavigator('app-navigator-state');

  // Attach the navigator to the browser history, so it could modify the history and listen to
  // its changes.
  await navigator.attach();
  return navigator;
}