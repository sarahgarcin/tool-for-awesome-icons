// $('#addTextBtn').on('click', function(){
//   var textToAdd = $("#iconText").val();
//   $("#textResult").html(textToAdd);
// }); 

// color picker init
$('#imageColor').simpleColor({
  boxWidth: "20px",
  cellWidth: 12,
  cellHeight: 12,
});

$('#imageColorAfter').simpleColor({
  boxWidth: "20px",
  cellWidth: 12,
  cellHeight: 12,
});

$('#textColor').simpleColor({
  boxWidth: "20px",
  cellWidth: 12,
  cellHeight: 12,
});

$('#shapeColor').simpleColor({
  boxWidth: "20px",
  cellWidth: 12,
  cellHeight: 12,
});

$("#iconText").keyup(function(){
  var textToAdd = $("#iconText").val();
  $("#textResult").html(textToAdd);
});

// $('#fonts').on('change', function(){
//   var fontChoosen = $(this).val();
//   $("#textResult").css('font-family', fontChoosen);
// }); 

$('#textSize').on('change', function(){
  var size = $(this).val();
  console.log(size);
  $("#textResult").css('font-size', size+"px");
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
      'padding' : "10px",
      'border-radius' : "0px"  
    });
  }
  else if(shapeChoosen == "rounded"){
    $("#textResult").css({
      'background' : shapeColor,
      'padding' : "10px", 
      'border-radius' : "20px" 
    });
  }
  else if(shapeChoosen == "circle"){
    $("#textResult").css({
      'background' : shapeColor,
      'padding' : "20px 30px", 
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
  domtoimage.toJpeg(document.getElementById('icon'), { quality: 1 })
  .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = $("#iconText").val() + '.jpg';
      link.href = dataUrl;
      link.click();
  }); 

});

$('#clearBtn').on('click', function(){
  location.reload(true);
});



// upload image and crop
// vars
let result = document.getElementById('imageResult'),
// img_result = document.querySelector('.img-result'),
// img_w = document.querySelector('.img-w'),
// img_h = document.querySelector('.img-h'),
// options = document.querySelector('.options'),
save = document.querySelector('.crop'),
// cropped = document.querySelector('.cropped'),
// dwn = document.querySelector('.download'),
// upload = document.querySelector('#file-input'),
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
    width: 300, 
    height: 300// input value
  }).toDataURL();
  // remove hide class of img
  // cropped.classList.remove('hide');
  // img_result.classList.remove('hide');
  // show image cropped
  result.style.background = "url('"+imgSrc+"') no-repeat";
  // img.src = imgSrc;
  // img.classList.remove('cropper-hidden');
  let cropperContainer = document.querySelector('.cropper-container');
  cropperContainer.classList.add('hide');
  // dwn.classList.remove('hide');
  // dwn.download = 'imagename.png';
  // dwn.setAttribute('href',imgSrc);
});


// color image
// $('#colorImage').on('click', function(){
//   var colorBefore = $("#imageColor").val();
//   var colorAfter = $("#imageColorAfter").val();
//   myFunction_set("--color-before", colorBefore);
//   myFunction_set("--color-after", colorAfter);
// });

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




