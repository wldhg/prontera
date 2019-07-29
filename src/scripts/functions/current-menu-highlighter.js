PtRegister(
  "current-menu-highlighter",
  (w, c, end) => {

    // First try - Global menu
    let currentMenu = document.querySelector(`#menu a[href="${location.pathname}"]`);
    let wannaParent = true;

    // Second try - Category menu
    // This works on 'tt-body-page' and 'tt-body-category'
    const pageType = document.body.dataset.pageType;
    if (
      !currentMenu
      && !(pageType && pageType === 'tt-body-search')
    ) {
      if (!pageType || pageType !== 'tt-body-category') {
        const categoryAnchor = document.querySelector('.ct-header .meta .category a');
        if (categoryAnchor && categoryAnchor.href) {
          const href = categoryAnchor.href.substring(categoryAnchor.href.indexOf("/category"));
          currentMenu = document.querySelector(`aside #categories li a[href="${href}"]`);
        }
      } else {
        currentMenu = document.querySelector(`aside #categories li a[href="${location.pathname}"]`);
      }

      wannaParent = false;
    }

    if (currentMenu) {
      if (wannaParent) {
        currentMenu.parentElement.classList.add("current");
      } else {
        currentMenu.classList.add("current");
      }
    }

    end(currentMenu, wannaParent);

  },
);
