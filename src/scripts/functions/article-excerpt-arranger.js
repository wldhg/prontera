PtRegister(
  "article-excerpt-arranger",
  (w, c, end) => {

    const cont = document.getElementById('content');
    const atcl = document.querySelector('#content article');
    const idxc = document.getElementById('index-counter');

    w.items = document.querySelectorAll('body[data-page-type="tt-body-category"] #content article.excerpt .ct-item, body[data-page-type="tt-body-index"] #content article.idx-excerpt .ct-item, body[data-page-type="tt-body-search"] #content article.idx-excerpt .ct-item, body[data-page-type="tt-body-tag"] #content article.idx-excerpt .ct-item');

    if (w.items.length > 0) {
      w.rearrange = () => {
        if (window.matchMedia('(max-width: 1159px)').matches) {
          atcl.classList.remove('arranged');
          atcl.style.setProperty('height', 'initial');
          w.items.forEach((item) => {
            item.style.setProperty('top', 'initial');
            item.style.setProperty('left', 'initial');
          });
        } else {
          atcl.classList.add('arranged');
          let ln = 2;
          if (window.matchMedia('(min-width: 1565px)').matches) {
            ln = 3; // 3 lines
          }
          const idxh = idxc.offsetHeight === 0 ? 0 : idxc.offsetHeight + 20;
          let lntop = [idxh, idxh, idxh];
          const lnw = (cont.offsetWidth - 40) / ln;
          const lnleft = [-8, lnw - 12, lnw * 2 - 16];
          w.items.forEach((item, idx) => {
            const lni = idx % ln;
            console.log([lnleft[lni], lntop[lni]]);
            item.style.setProperty('left', `${lnleft[lni]}px`);
            item.style.setProperty('top', `${lntop[lni]}px`);
            lntop[lni] += item.offsetHeight + 24;
          });
          atcl.style.setProperty('height', `${Math.max(...lntop)}px`);
        }
      };
      window.addEventListener('resize', w.rearrange);
      w.rearrange();
    }

    end();

  },
  true,
);
