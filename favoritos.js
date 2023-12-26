const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';

var favoritos_lista = []

fetch(githubRepoUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON file: ${response.status} ${response.statusText}`);
        }
      return response.json();
    })
    .then(data => {
        
        // Process the JSON data here
        Object.entries(data).forEach(login => {
            if (JSON.parse(localStorage.getItem("favoritos")).includes(login[0])) {
                favoritos_lista.push({...login[1], id:login[0]})
            }
            
        })
        console.log(favoritos_lista);
        update_html()
    })
    .catch(error => {
        console.error('Error fetching JSON file:', error);
    });
    
function update_html() {
    if (favoritos_lista.length == 0) {
        $("#favoritos").addClass("text-light d-flex justify-content-center align-items-center")
        $("#favoritos").html( $("#favoritos").html() + "Não há nada aqui...")
        return
    } 
    for (let i = 0; i < favoritos_lista.length; i++) {
        $("#favoritos").html( $("#favoritos").html() + 
            `
            <div class="col-4">
                <a href="detalhes_artesao.html?user=${favoritos_lista[i].id}">
                    <img src="https://t4.ftcdn.net/jpg/02/04/02/65/360_F_204026582_rTFcseUqDfqQAfYUY9w12xzMNC4c1bNi.jpg" class="artesao-casa">
                </a>
                <p class="text-white fs-3 mb-0">${favoritos_lista[i].nome}</p>
                <p class="text-white fs-6 mt-0">${favoritos_lista[i].concelho}, ${favoritos_lista[i].distrito}</p>
            </div>
            `
        )
    }
}

