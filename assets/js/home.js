let tasks = []
const add_new_task = document.getElementById('add-new-task')

function renderTasks() {
  const container_tasks = document.getElementById('container-tasks')
  const quantity_task = document.getElementById('quantity-task')
  
  console.log(tasks)
  console.log(tasks.length)
  quantity_task.innerHTML = tasks.length

  if (tasks.length < 1) {
    container_tasks.innerHTML += `
      <h1 class="empty-task">Você não tem nenhuma tarefa.</h1>
    `
  } else {
    tasks.sort((a, b) => a.due_timestamp - b.due_timestamp).forEach((task) => {
      container_tasks.innerHTML += `
        <div class="card task">
          <div class="card-header">
            ${task.matter_title}
          </div>
          <div class="card-body">
            <p class="text-muted">Prazo ${moment(task.due_timestamp).format('HH:mm:ss - DD/MM/YYYY')}</p>
            <h2 class="card-title">${task.task_title}</h2>
            <p class="card-text">${task.description}</p>
            <a href="#" class="btn btn-primary">Ver mais</a>
          </div>
        </div>
      `
    }) 
  }
}

add_new_task.onsubmit = async (event) => {
  event.preventDefault()

  const token = localStorage.getItem('token')
  const {value: matter_title} = document.querySelector('input[name=matter_title]')
  const {value: task_title} = document.querySelector('input[name=task_title]')
  const {value: due_date} = document.querySelector('input[name=due_date]')
  const {value: due_hour} = document.querySelector('input[name=due_hour]')
  const {value: description} = document.querySelector('textarea[name=description]')

  try {
    const task = {
      matter_title,
      task_title,
      due_timestamp: new Date(`${due_date} ${due_hour}`).valueOf(),
      description,
    }
    const response = await axios.post('https://tasks-organizer.herokuapp.com/task', task, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    tasks.push(task)
    console.log(response)
    renderTasks()

  } catch (error) {
    console.log(error)
    alert((!error.response || error.response.status === 500) ? 'Houve um erro desconhecido, contate aos desenvolvedores.' : error.response.data)
  }

  return false
}

window.onload = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    window.location.replace('/')
  }

  try {
    const response = await axios.get('https://tasks-organizer.herokuapp.com/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    tasks = [...tasks, ...response.data]
    renderTasks()
  } catch (error) {
    console.log(error)
    alert((!error.response || error.response.status === 500) ? 'Houve um erro desconhecido, contate aos desenvolvedores.' : error.response.data)
  }
}

function logout() {
  localStorage.removeItem('token')

  window.location.replace('/')
}