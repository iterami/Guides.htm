'use strict';

function calculate_roll(){
    const bonus = Number(document.getElementById('bonus').value);
    const dice = Number(document.getElementById('dice').value);
    const sides = Number(document.getElementById('sides').value);

    let rolls = '';
    let total = 0;

    for(let i = 0; i < dice; i++){
        const roll = core_random_integer({
          'max': sides,
        }) + 1;

        total += roll;
        rolls += roll + ' + ';
    }

    total += bonus;

    document.getElementById('result').textContent = rolls + ' (' + bonus + ') = ' + total;
}

function repo_init(){
    core_repo_init({
      'events': {
        'roll': {
          'onclick': calculate_roll,
        },
      },
      'keybinds': {
        13: {
          'todo': calculate_roll,
        },
      },
      'root': '../../index.htm',
      'title': 'Guides.htm',
    });

    calculate_roll();
}
