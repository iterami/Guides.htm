'use strict';

function calculate(){
    const first = Number.parseInt(
      document.getElementById('first').value,
      10
    );
    const second = Number.parseInt(
      document.getElementById('second').value,
      10
    );

    if(first > second){
        document.getElementById('result').textContent = 'Runes cannot be downgraded.';
        return;
    }

    let result = '';

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

    result = core_number_format({
      'decimals-min': 0,
      'number': result,
    });

    if(second > 10){
        result +=
          '<br>You will also require gems to transmute runes starting at Thul.';
    }

    document.getElementById('result').innerHTML = result;
}

function repo_init(){
    core_repo_init({
      'root': '../../index.htm',
      'title': 'Guides.htm',
    });

    document.getElementById('first').onchange = calculate;
    document.getElementById('second').onchange = calculate;

    calculate();
}
