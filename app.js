let theInput = document.querySelector('.get-repo input');
let getBtn = document.querySelector('.get-btn');
let reposeData = document.querySelector('.show-data');

getBtn.addEventListener('click', () => {
  getRepose();
});

function getRepose() {
  if (theInput.value == '') {
    reposeData.innerHTML =
      '<span style="font-size: 24px;color: red">Please Entre The Github Username</span>';
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.length > 0) {
          reposeData.innerHTML = '';
          for (let i = 0; i < data.length; i++) {
            let div = document.createElement('div');
            let nameRepo = document.createElement('div');
            nameRepo.classList.add('repo-name');
            let nameRepoText = document.createTextNode(data[i]['name']);
            nameRepo.append(nameRepoText);
            div.append(nameRepo);
            let btnShowmore = document.createElement('a');
            let btnText = document.createTextNode('Show More');
            btnShowmore.append(btnText);
            btnShowmore.classList.add('show-more');
            btnShowmore.href = `https://github.com/${theInput.value}/${data[i]['name']}`;
            btnShowmore.target = '_blank';
            div.append(btnShowmore);
            reposeData.append(div);
          }
        } else {
          reposeData.innerHTML = 'No data To Show';
        }
      });
  }
}
