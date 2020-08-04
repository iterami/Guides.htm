'use strict';

function calculate_health(){
    const health = Number(document.getElementById('health-max').value) || 1;

    const abilities = {
      'bloodthirst': 5,
      'bloodthirst-fresh-meat': 6,
      'crimson-vial': 30,
      'execute': 20,
      'gift-of-the-naaru': 20,
      'healthstone': 25,
      'victory-rush': 20,
    };

    for(const ability in abilities){
        document.getElementById('health-' + ability).textContent = core_round({
          'number': health * (abilities[ability] / 100),
        });
    }
}

function repo_init(){
    core_repo_init({
      'root': '../../index.htm',
      'title': 'Guides.htm',
    });

    document.getElementById('health-max').oninput = calculate_health;
};
