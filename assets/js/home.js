const addNewTask = document.getElementById('addNewTask')

addNewTask.onclick = () => {
  
}

window.onload = async () => {
  const token = localStorage.getItem('token')
  const container_tasks = document.getElementById('container-tasks')

  try {
    const response = await axios.get('https://tasks-organizer.herokuapp.com/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(response)

    response.data.forEach((task) => {
      container_tasks.innerHTML += `
        <div class="card">
          <div class="card-header">
            Banco de dados
          </div>
          <div class="card-body">
            <p class="text-muted">Prazo 29/09/2020</p>
            <h2 class="card-title">Modelo conceitual, lógico e físico</h2>
            <p class="card-text">Utilize um dos softwares explicado em aula para realizar um modelo de entidade relacionamento, modelo lógico e o modelo físico do estudo de caso abaixo. Após o termino você poderá postar um print dos diagramas ou dos arquivos gerados pelo app. Faça o modelo conceitual, modelo lógico e modelo físico do estudo de caso abaixo:</p>
            <a href="#" class="btn btn-primary">Ver mais</a>
          </div>
        </div>
      `
    })
  } catch (error) {
    console.log(error)
    alert((!error.response || error.response.status === 500) ? 'Houve um erro desconhecido, contate aos desenvolvedores.' : error.response.data)
  }
}