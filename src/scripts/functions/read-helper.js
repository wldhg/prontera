PtRegister(
  "read-helper",
  (w, c, end) => {

    const content = document.querySelector('.ct-body');
    if (content) {
      const topic = document.querySelector('.ct-header .ct-title');
      if (topic) {
        document.querySelector('#toc .topic').textContent = topic.textContent;
      }

      const headers = document.querySelectorAll('.ct-body h1, .ct-body h2, .ct-body h3, .ct-body h4');

      const newLi = (text, i) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#ct-hid-${i}`;
        a.onclick = () => {
          PtStore['scroll-toggler'].header.classList.add("force-hidden");
          setTimeout(() => {
            PtStore['scroll-toggler'].header.classList.remove("force-hidden");
            PtStore['scroll-toggler'].header.classList.add("hidden");
          }, 100);
        };
        const span = document.createElement('span');
        span.textContent = text;
        a.appendChild(span);
        li.appendChild(a);
        return li;
      };

      let minTag = 'h4';
      for (let i = 0; i < headers.length; i += 1) {
        if (headers[i].tagName < minTag) minTag = headers[i].tagName;
      }
      const minTagI = Number.parseInt(minTag.substring(1));

      let prevTag = '';
      let motherList = document.createElement('ol');
      let list = motherList;
      const scrollThresholds = [];
      const lis = [];
      const mainTop = document.querySelector('main').getBoundingClientRect().top;
      for (let i = 0; i < headers.length; i += 1) {
        headers[i].id = `ct-hid-${i}`;
        scrollThresholds.push(headers[i].getBoundingClientRect().top - 160 - mainTop);

        if (i === 0) {
          const firstTagI = Number.parseInt(headers[i].tagName.substring(1));

          for (let j = 0; j < firstTagI - minTagI; j += 1) {
            const newLi = document.createElement('li');
            const newList = document.createElement('ol');
            newLi.appendChild(newList);
            list.appendChild(newLi);
            list = newList;
          }
        } else {
          if (prevTag < headers[i].tagName) {
            const prevTagI = Number.parseInt(prevTag.substring(1));
            const nowTagI = Number.parseInt(headers[i].tagName.substring(1));

            for (let j = 0; j < nowTagI - prevTagI; j += 1) {
              const newList = document.createElement('ol');
              if (list.lastElementChild === null) {
                list.appendChild(document.createElement('li'));
              }
              list.lastElementChild.appendChild(newList);
              list = newList;
            }
          } else if (prevTag > headers[i].tagName) {
            const prevTagI = Number.parseInt(prevTag.substring(1));
            const nowTagI = Number.parseInt(headers[i].tagName.substring(1));

            for (let j = 0; j < prevTagI - nowTagI; j += 1) {
              list = list.parentElement.parentElement;
            }
          }
        }

        const li = newLi(headers[i].textContent, i);
        lis.push(li);
        list.appendChild(li);
        prevTag = headers[i].tagName;
      }

      document.getElementById('toc').appendChild(motherList);

      const words = content.textContent.split(' ').length;

      document.querySelector('.text-amount').textContent = `${content.textContent.length} 글자, ${Math.ceil(words / 88)} - ${Math.floor(words / 40)}분 소요`;

      for (let i = 0; i < scrollThresholds.length; i += 1) {
        if (i === scrollThresholds.length - 1) {
          PtStore['scroll-toggler'].onScroll.push((s) => {
            if (s >= scrollThresholds[i]) {
              lis[i].firstElementChild.classList.add('current');
            } else {
              lis[i].firstElementChild.classList.remove('current');
            }
          });
        } else {
          PtStore['scroll-toggler'].onScroll.push((s) => {
            if (s >= scrollThresholds[i] && s < scrollThresholds[i + 1]) {
              lis[i].firstElementChild.classList.add('current');
            } else {
              lis[i].firstElementChild.classList.remove('current');
            }
          });
        }
      }

      end();

    } else {
      end();
    }

  },
  true
);
