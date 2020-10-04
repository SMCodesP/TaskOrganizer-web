function readURL(input) {
  console.log(input)
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = (e) => {
      document.getElementById('testando').style.backgroundImage = `url('${e.target.result}')`
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}

$("#img").change(() => {
  readURL($("#img")[0]);
});

