class AccountsWidget {

  constructor( element ) {
    if(!element) throw new Error('AccountsWidget, что-то пошло не так');
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    document.querySelector('.create-account').onclick = () => {
      App.getModal('createAccount').open();
    }
    this.element.addEventListener('click', e => {
      this.onSelectAccount(e.target);
    })
    
  }

  update() {
    if(User.current()) {
      Account.list(User.current(), (err, response) => {
        if(response.success) {
          this.clear();
          this.renderItem(response.data);
        }
      })
    }
  }

  clear() {
    Array.from(document.querySelectorAll('ul.sidebar-menu > li.account')).forEach(e => e.parentNode.removeChild(e));
  }

  onSelectAccount( element ) {
    Array.from(element.closest('.accounts-panel').querySelectorAll('.account')).forEach(e => {e.classList.remove('active')});
    if (element.closest('.account')) { element.closest('.account').classList.add('active');
    App.showPage('transactions', {account_id: element.closest('.account').dataset.id});}
  }

  getAccountHTML(item){
    return `<li class="account" data-id="${item.id}">
            <a href="#">
              <span>${item.name}</span> /
               <span>${item.sum} ₽</span>
            </a>
            </li>`;

  }

  renderItem(data){
    data.forEach(e => {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(e));
    })
  }
}
