'use strict';

function calculate_immortal_damage(){
    document.getElementById('output').value =
      parseFloat(document.getElementById('dps').value)
        * parseFloat(document.getElementById('cps').value)
        * 32;
}

function repo_init(){
    core_repo_init({
      'title': 'Guides.htm',
    });

    document.getElementById('cps').value = 0;
    document.getElementById('dps').value = 0;
    document.getElementById('output').value = 0;

    document.getElementById('cps').oninput = calculate_immortal_damage;
    document.getElementById('dps').oninput = calculate_immortal_damage;
}
