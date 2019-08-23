PtRegister(
  "read-helper",
  (w, c, end) => {

    const content = document.querySelector('.ct-body');
    if (content) {
      const headers = document.querySelectorAll('.ct-body h1, .ct-body h2, .ct-body h3, .ct-body h4');

      const newLi = (text, i) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#ct-hid-${i}`;
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
      for (let i = 0; i < headers.length; i += 1) {
        headers[i].id = `ct-hid-${i}`;

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

        list.appendChild(newLi(headers[i].textContent, i));
        prevTag = headers[i].tagName;
      }

      document.getElementById('toc').appendChild(motherList);

      const words = content.textContent.split(' ').length;

      document.querySelector('.text-amount').textContent = `${content.textContent.length} 글자, ${Math.floor(words / 180)} - ${Math.floor(words / 120)}분 소요`;

      end();
    }

  },
  false
);
