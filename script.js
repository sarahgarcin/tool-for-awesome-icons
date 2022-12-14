// color picker init
$('#imageColor').simpleColor({
  boxWidth: "30px",
  boxHeight: "30px",
  cellWidth: 12,
  cellHeight: 12,
  columns:13
});

$('#imageColorAfter').simpleColor({
  boxWidth: "30px",
  boxHeight: "30px",
  cellWidth: 12,
  cellHeight: 12,
  columns:13
});

$('#textColor').simpleColor({
  boxWidth: "30px",
  boxHeight: "30px",
  cellWidth: 12,
  cellHeight: 12,
  columns:13
});

$('#shapeColor').simpleColor({
  boxWidth: "30px",
  boxHeight: "30px",
  cellWidth: 12,
  cellHeight: 12,
  columns:13
});

$("#iconText").keyup(function(){
  var textToAdd = $("#iconText").val();
  $("#textResult").html(textToAdd);
});


$('#fonts').on('change', function(){
  var fontChoosen = $(this).val();
  $("#textResult").css('font-family', fontChoosen);
}); 

$('#textSize').on('change', function(){
  var size = $(this).val() * 5;
  $("#textResult").css('font-size', size+"px");
});

$('#textOpacity').on('change', function(){
  var opacity = $(this).val();
  $("#textResult").css('opacity', opacity);
});

$('#shapeColor').on('change', function(){
  var shapeColor = $('#shapeColor').val();
  $("#textResult").css('background', shapeColor);
}); 

$('#addShape').on('change', function(){
  var shapeChoosen = $(this).val();
  var shapeColor = $('#shapeColor').val();
  if(shapeChoosen == "square"){
    $("#textResult").css({
      'background' : shapeColor,
      'padding' : "calc(20px * 5)",
      'border-radius' : "0px"  
    });
  }
  else if(shapeChoosen == "rounded"){
    $("#textResult").css({
      'background' : shapeColor,
      'padding' : "calc(20px * 5)", 
      'border-radius' : "20px" 
    });
  }
  else if(shapeChoosen == "circle"){
    $("#textResult").css({
      'background' : shapeColor,
      'padding' : "calc(30px * 5) calc(30px * 5)", 
      'border-radius' : "50%" 
    });
  }
  else{
    $("#textResult").css({
      'background' : 'transparent',
      'padding' : "0px", 
      'border-radius' : "0" 
    });
  }
  
}); 


$('#downloadLnk').on('click', function(){
  $('#icon').css("transform", "scale(1)");
  domtoimage.toJpeg(document.getElementById('icon'), { quality: 0.9 })
  .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = $("#iconText").val() + '.jpg';
      link.href = dataUrl;
      link.click();
      $('#icon').css("transform", "scale(0.2)");
  }); 
  

});

$('#clearBtn').on('click', function(){
  location.reload(true);
});



// upload image and crop
// vars
let result = document.getElementById('imageResult'),
save = document.querySelector('.crop'),
img,
cropper = '';

// on change show image with crop options
$('#fileInput').on('change', (e) => {
  if (e.target.files.length) {
    // start file reader
    const reader = new FileReader();
    reader.onload = (e)=> {
      if(e.target.result){
        // create new image
        img = document.createElement('img');
        img.id = 'image';
        img.src = e.target.result
        // clean result before
        result.innerHTML = '';
        // append new image
        result.appendChild(img);
        // show save btn and options
        save.classList.remove('hide');
        // options.classList.remove('hide');
        // init cropper
        cropper = new Cropper(img, {
          aspectRatio: 1 / 1
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// save on click
save.addEventListener('click',(e)=>{
  e.preventDefault();
  // get result to data uri
  let imgSrc = cropper.getCroppedCanvas({
    width: 1400, 
    height: 1400// input value
  }).toDataURL();
  // show image cropped
  result.style.background = "url('"+imgSrc+"') no-repeat";
  let cropperContainer = document.querySelector('.cropper-container');
  cropperContainer.classList.add('hide');
});

$('#imageColor').on('change', function(){
  var colorBefore = $("#imageColor").val();
  myFunction_set("--color-before", colorBefore);
});

$('#imageColorAfter').on('change', function(){
  var colorAfter = $("#imageColorAfter").val();
  myFunction_set("--color-after", colorAfter);
});

$('#textColor').on('change', function(){
  var textColor = $("#textColor").val();
  $("#textResult").css("color", textColor);
});

function myFunction_set(varName, value) {
  var r = document.querySelector(':root');
  // Set the value of variable to another value 
  r.style.setProperty(varName, value);
}




