window.addEventListener('DOMContentLoaded', () => {
    fetch("https://reqres.in/api/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        for(let i = 0; i < data.data.length; i++) {
        const dataItemImg = document.createElement('img');
        dataItemImg.src = data.data[i].avatar;
          const dataContainer = document.createElement('div');
          const dataItem = document.createElement('ul');
          const dataItemName = document.createElement('li');
          const dataItemLastName = document.createElement('li');
          const dataItemMail = document.createElement('li');
          const dataItemBtn = document.createElement('button');
          dataItemBtn.textContent = 'X';
          const list__info = document.querySelector('.list__info');
          const dataItemCont = document.createElement('div');
          dataItemMail.textContent = data.data[i].email;
          dataItemLastName.textContent = data.data[i].last_name;
          dataItemName.textContent = data.data[i].first_name;
          dataItemCont.prepend(dataItemImg);
          dataItem.append(dataItemCont,dataItemName,dataItemLastName, dataItemMail);
          dataContainer.append(dataItem, dataItemBtn);
          list__info.append(dataContainer);
         async function deleteUser(id, node){
            try{
                const ok = {
                    method: 'DELETE',
                };
                const res = await fetch(`https://reqres.in/api/users/:${id}`, ok);
                
                if(res.status === 204) {
                    node.remove();
                    console.log(`Пользавател с ${id}  был успешно удален!`);
                 }
            } catch(error) {
                console.log(error); 
            }
        }
        dataItemBtn.addEventListener('click', () => {
            deleteUser(data.id, dataItemBtn.parentNode);
          });
          }
        })
        .catch((error) => {
            console.log(error);
            const list__info = document.querySelector('.list__info');
            const divError = document.createElement("div");
            divError.textContent = error;
            divError.className = 'error';
            list__info.replaceWith(divError);
          });
      });
