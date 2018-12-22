'use strict';

function calculate_immortal_damage(){
    document.getElementById('output').innerHTML = core_number_format({
      'number': Number.parseFloat(document.getElementById('dps').value)
        * Number.parseFloat(document.getElementById('cps').value)
        * 32,
    });
}

function repo_init(){
    core_repo_init({
      'title': 'Guides.htm',
    });

    document.getElementById('cps').value = 0;
    document.getElementById('dps').value = 0;
    document.getElementById('output').innerHTML = 0;

    document.getElementById('cps').oninput = calculate_immortal_damage;
    document.getElementById('dps').oninput = calculate_immortal_damage;
}