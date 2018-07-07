'use strict';

function calculate(){
    var first = Number.parseInt(
      document.getElementById('first').value,
      10
    );
    var second = Number.parseInt(
      document.getElementById('second').value,
      10
    );

    if(first > second){
        document.getElementById('result').innerHTML = 'Runes cannot be downgraded.';
        return;
    }

    var result = '';

    if(second < 22){
        result =
          Math.pow(
            3,
            second - first
          );

    }else if(first > 20){
        result =
          Math.pow(
            2,
            second - first
          );

    }else{
        result =
          Math.pow(
            3,
            21 - first
          )
          * Math.pow(
            2,
            second - 21
          );
    }

    result = new Intl.NumberFormat().format(result);

    if(second > 10){
        result +=
          '<br>You will also require gems to transmute runes starting at Thul.';
    }

    document.getElementById('result').innerHTML = result;
}

function repo_init(){
    core_repo_init({
      'title': 'Guides.htm',
    });

    document.getElementById('first').onchange = calculate;
    document.getElementById('second').onchange = calculate;

    calculate();
}
