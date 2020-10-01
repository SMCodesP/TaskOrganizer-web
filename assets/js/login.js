const form = document.getElementById('login-submit')

window.onload = () => {
  const token = localStorage.getItem('token')

  if (token) {
    window.location.replace('/dashboard')
  }
}

form.onsubmit = async (event) => {
  event.preventDefault()
  
  const {value: username} = document.querySelector("input[data-type=username]")
  const {value: password} = document.querySelector("input[data-type=password]")

  if (!username || !password) {
    alert('Por favor digite seu nome e sua senha.')
    return false
  }

  try {
    const response = await axios.post('https://tasks-organizer.herokuapp.com/session', {
      username,
      password,
    })

    console.log(response.data.token)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    window.location.replace("/dashboard")
  } catch (error) {
    console.log(error)
    alert((!error.response || error.response.status === 500) ? 'Houve um erro desconhecido, contate aos desenvolvedores.' : error.response.data)
  }

  return false
}