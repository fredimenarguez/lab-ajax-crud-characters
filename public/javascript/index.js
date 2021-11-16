const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');


window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (e) {
    e.preventDefault();

    charactersAPI.getFullList()
        .then(res => {
            const charactersUL = document.querySelector(".characters-container")
            console.log(res)

            let charactersInfo = ""
            res.data.reverse().forEach(character => {
                charactersInfo += `
                                  <div class="character-info">
                                    <div class="name">${character.name}</div>
                                    <div class="occupation">${character.occupation}</div>
                                    <div class="cartoon">${character.cartoon}</div>
                                    <div class="weapon">${character.weapon}</div>
                                  </div>
                                  `
              
            });

            charactersUL.innerHTML = charactersInfo
        })
        .catch(err => console.log(err))
    
    
  });

  document.getElementById('fetch-one').addEventListener('click', function (e) {
    e.preventDefault();

    const id = document.querySelector('#character-id').value

    charactersAPI
      .getOneRegister(id)
      .then(response => {

            const {data} = response
           
              characterDetails =
              `<div class="character-info">
              <div class ="id"> ID: ${data.id} </div>
               <div class ="name"> Name: ${data.name} </div>
               <div class="occupation"> Occupation: ${data.occupation}</div>
               <div class="cartoon"> Is a Cartoon? ${data.cartoon}</div>
               <div class="weapon"> Weapon: ${data.weapon}</div>
           </div>`
        document.querySelector('.characters-container').innerHTML = characterDetails
      })
      .catch(err => console.log('error',err))

  });

  document.getElementById('delete-one').addEventListener('click', function (e) {
    e.preventDefault();

    let deleteId = document.querySelector('#delete-id').value

    charactersAPI
      .deleteOneRegister(deleteId)
      .then(() => { 
        document.querySelector('#delete-id').value = ''
        
      })
      .catch(err => console.log('error', err))

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (e) {
  
    e.preventDefault();

    const editFormInputs = document.querySelector("#edit-character-form")

    const id = editFormInputs[0].value
    const name = editFormInputs[1].value
    const occupation = editFormInputs[2].value
    const weapon = editFormInputs[3].value
    const cartoon = editFormInputs[4].checked

    const info = {name, occupation, weapon, cartoon}
      console.log(info);
    charactersAPI.updateOneRegister (id, info)
        .then(() => {
            
        })
        .catch(err => console.log(err))

  
})

  document.getElementById('new-character-form').addEventListener('submit', function (e) {

    e.preventDefault();

    const createFormInputs = document.querySelectorAll("#new-character-form input")

    
    const name = createFormInputs[0].value
    const occupation = createFormInputs[1].value
    const weapon = createFormInputs[2].value
    const cartoon = createFormInputs[3].checked

    const info = {name, occupation, weapon, cartoon}

    charactersAPI.createOneRegister (info)
        .then(() => {
          
        })
        .catch(err => console.log(err))

  });
});
