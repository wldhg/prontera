PtRegister(
  "current-menu-highlighter",
  (w, c, end) => {

    // First try - Global menu
    let currentMenu = document.querySelector(`#menu a[href="${location.pathname}"]`);

    // Second try - Category menu
    // This works on 'tt-body-page' and 'tt-body-category'
    if (!currentMenu && !document.body.classList.contains('tt-body-search')) {
      const categoryAnchor = document.querySelector('.ct-header .meta .category a');
      if (categoryAnchor && categoryAnchor.href) {
        const href = categoryAnchor.href.substring(categoryAnchor.href.indexOf("/category"));
        currentMenu = document.querySelector(`aside #categories li a[href="${href}"]`);
      }
    }

    if (currentMenu) currentMenu.classList.add("current");

    end(currentMenu);

  },
);
