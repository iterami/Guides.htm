'use strict';

function calculate_magiccost(){
    const base = Number(document.getElementById('cost-base').value) || 0;
    const max = Number(document.getElementById('max-magic').value) || 0;
    const percent = Number(document.getElementById('cost-percent').value) || 100;

    document.getElementById('cost-total').textContent = Math.floor(base + max * (percent / 100));
}

function repo_init(){
    core_repo_init({
      'root': '../../index.htm',
      'title': 'Guides.htm',
    });

    document.getElementById('max-magic').oninput =
      document.getElementById('cost-base').oninput =
      document.getElementById('cost-percent').oninput = calculate_magiccost;
};
