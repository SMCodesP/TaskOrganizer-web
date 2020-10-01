window.onload = async () => {
  const token = localStorage.getItem('token')
  const container_tasks = document.getElementById('container-tasks')
  const quantity_task = document.getElementById('quantity-task')

  try {
    const response = await axios.get('https://tasks-organizer.herokuapp.com/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(response)

    if (response.data.length < 1) {
      container_tasks.innerHTML += `
        <h1 class="empty-task">Você não tem nenhuma tarefa.</h1>
      `
    }

    response.data.forEach((task) => {
      container_tasks.innerHTML += `
        <div class="card task">
          <div class="card-header">
            ${task.matter_title}
          </div>
          <div class="card-body">
            <p class="text-muted">Prazo 29/09/2020</p>
            <h2 class="card-title">${task.task_title}</h2>
            <p class="card-text">${task.description}</p>
            <a href="#" class="btn btn-primary">Ver mais</a>
          </div>
        </div>
      `
    })
    quantity_task.innerHTML = response.data.length
  } catch (error) {
    console.log(error)
    alert((!error.response || error.response.status === 500) ? 'Houve um erro desconhecido, contate aos desenvolvedores.' : error.response.data)
  }
}
