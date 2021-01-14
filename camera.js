
window.onload = function() {
    // 카메라 버튼
    $("input[type=button]").click(function() {
      $("#photoFile").click();
    });

    // 사진 선택 후
    $("#photoFile").on('change', function() {

      // 파일명만 추출
      if(window.FileReader){  // modern browser
        var filename = $(this)[0].files[0].name;
      } else {  // old IE
        var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
      }

      // var fileSize = document.getElementById("photoFile").files[0].size;
      // console.log( "파일사이즈 : " + $("#photoFile")[0].files[0].size );
      console.log( "파일사이즈 : " + $(this)[0].files[0].size );
      console.log( "파일명 : " + filename );

      LoadImg($("#photoFile")[0]);
    });
}

// 선택이미지 미리보기
function LoadImg(value) {
    if(value.files && value.files[0]) {

      var reader = new FileReader();

      reader.onload = function (e) {
        $('#photoImg').attr('src', e.target.result);
        $('#photoImg').show();
      }

      reader.readAsDataURL(value.files[0]);
      // judgeImage();
    }
}

function testJudgeImage() {
    document.getElementById("testResult").innerHTML = '';  
    changeSpinner("Y","spinner");
    console.log("judgeImage function start");
    const img = document.getElementById('localImg');
    // const img = document.getElementById('photoImg');
    // document.getElementById("tensorflow").innerHTML = `
    //                     <h3>script access</h3>
    //                  `;
// Load the model.
    mobilenet.load().then(model => {
// Classify the image.
        model.classify(img).then(predictions => {
            console.log('Predictions: ');
            console.log(predictions[0].className);
            var result = predictions[0].className;
            document.getElementById("testResult").innerHTML = `
            <h3>인공지능의 판단결과 해당 이미지는 " ${result} " 입니다.</h3>
            `;
            changeSpinner("N","spinner");            
        });
    });
 
}

function judgeImage() {

  document.getElementById("result").innerHTML = '';  
  changeSpinner("Y","spinner2");
  console.log("judgeImage function start");
  // const img = document.getElementById('localImg');
  const img = document.getElementById('photoImg');
  // document.getElementById("tensorflow").innerHTML = `
  //                     <h3>script access</h3>
  //                  `;
// Load the model.
  mobilenet.load().then(model => {
// Classify the image.
      model.classify(img).then(predictions => {
          console.log('Predictions: ');
          console.log(predictions[0].className);
          var result = predictions[0].className;
          document.getElementById("result").innerHTML = `
          <h3>인공지능의 판단결과 해당 이미지는 " ${result} " 입니다.</h3>
         `;
         changeSpinner("N","spinner2");     
         scrollFit();         
      });
  });
}

// Function to hide the Spinner 
function changeSpinner(display,id) { 
  
  console.log("display value : " + display);
  if("Y"===display) {
    document.getElementById(id) 
    .style.display = 'inline';    
  }
  else {
    document.getElementById(id) 
          .style.display = 'none';
  }
}

function scrollFit() {
  var location = document.querySelector("#result").offsetTop;
  window.scrollTo({top:location, behavior:'smooth'});
}