'use strict';

function calculate_percentage(){
    const max = Number(document.getElementById('max').value) || 1;

    const abilities = {
      'bloodthirst': 5,
      'bloodthirst-fresh-meat': 6,
      'crimson-vial': 30,
      'discerning-eye-of-the-beast': 2,
      'execute': 20,
      'gift-of-the-naaru': 20,
      'healthstone': 25,
      'swift-hand-of-justice': 2,
      'victory-rush': 20,
    };

    for(const ability in abilities){
        document.getElementById(ability).textContent = core_round({
          'number': max * (abilities[ability] / 100),
        });
    }
}

function repo_init(){
    core_repo_init({
      'root': '../../index.htm',
      'title': 'Guides.htm',
    });

    document.getElementById('max').oninput = calculate_percentage;
};
