'use strict';

function calculate_health(){
    const health = Number(document.getElementById('health-max').value) || 1;

    document.getElementById('health-bloodthirst').textContent = core_round({
      'number': health * (5 / 100),
    });
    document.getElementById('health-bloodthirst-fresh-meat').textContent = core_round({
      'number': health * (6 / 100),
    });
    document.getElementById('health-execute').textContent = core_round({
      'number': health * (20 / 100),
    });
    document.getElementById('health-gift-of-the-naaru').textContent = core_round({
      'number': health * (20 / 100),
    });
    document.getElementById('health-healthstone').textContent = core_round({
      'number': health * (25 / 100),
    });
    document.getElementById('health-victory-rush').textContent = core_round({
      'number': health * (20 / 100),
    });
}

function repo_init(){
    core_repo_init({
      'root': '../../index.htm',
      'title': 'Guides.htm',
    });

    document.getElementById('health-max').oninput = calculate_health;
};
