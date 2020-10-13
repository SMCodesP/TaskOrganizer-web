window.onload = async () => {

  try {
    const {data: positions} = await axios.get('https://redeheroes-bot-v2.herokuapp.com/podium')

    positions.forEach((position, index) => {
      $('#positions')[0].innerHTML += `
        <div class="containerTable">
          <tdCustom rowspan="1">${index+1}</tdCustom>
          <tdCustom rowspan="2"><img class="avatar-table" src="${position.avatar_url}" /> ${position.username}</tdCustom>
          <tdCustom rowspan="1">${position.points}</tdCustom>
        </div>
      `
    })

    positions.filter((_, index) => (index < 3)).forEach((position, index) => {
      $(`#username-top-${index+1}`)[0].innerHTML = position.username
      $(`#points-top-${index+1}`)[0].innerHTML = position.points
      $(`#avatar-top-${index+1}`)[0].src = position.avatar_url
    })

  } catch (err) {
    alert('Houve um erro ao carregar o podium.')
  }

}