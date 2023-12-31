const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';

var artesaos_lista = []

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
            if (login[1].artesao) {
                artesaos_lista.push({...login[1], id:login[0]})
            }
            
        })
        console.log(artesaos_lista);
        update_html()
    })
    .catch(error => {
        console.error('Error fetching JSON file:', error);
    });
    
function update_html() {
    if (artesaos_lista.length == 0) {
        $("#artesaos").addClass("text-light d-flex justify-content-center align-items-center")
        $("#artesaos").html( $("#artesaos").html() + "Não há nada aqui...")
        return
    } 
    for (let i = 0; i < artesaos_lista.length; i++) {
        $("#artesaos").html( $("#artesaos").html() + 
            `
            <div class="col-4">
                <a href="detalhes_artesao.html?user=${artesaos_lista[i].id}">
                    <img src="https://t4.ftcdn.net/jpg/02/04/02/65/360_F_204026582_rTFcseUqDfqQAfYUY9w12xzMNC4c1bNi.jpg" class="artesao-casa">
                </a>
                <p class="text-white fs-3 mb-0">${artesaos_lista[i].nome}</p>
                <p class="text-white fs-6 mt-0">${artesaos_lista[i].concelho}, ${artesaos_lista[i].distrito}</p>
            </div>
            `
        )
    }
}

