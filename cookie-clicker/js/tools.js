'use strict';

function calculate_magiccost(){
    const base = Number(document.getElementById('cost-base').value) || 0;
    const max = Number(document.getElementById('max-magic').value) || 0;
    const percent = Number(document.getElementById('cost-percent').value) || 100;

    document.getElementById('cost-total').textContent = Math.floor(base + max * (percent / 100));
}

function calculate_time(){
    let cps = Number(document.getElementById('time').value) || 1;

    if(cps <= 0){
        cps = 1;
    }

    const times = {
      'cookies-per-day': 86400,
      'cookies-per-hour': 3600,
      'cookies-per-minute': 60,
      'cookies-per-week': 604800,
    };
    for(const time in times){
        document.getElementById(time).value = core_number_format({
          'decimals-max': 3,
          'number': core_round({
            'number': cps * times[time],
          }),
        });
    }
}

function repo_init(){
    core_repo_init({
      'root': '../../index.htm',
      'title': 'Guides.htm',
    });

    document.getElementById('max-magic').oninput =
      document.getElementById('cost-base').oninput =
      document.getElementById('cost-percent').oninput = calculate_magiccost;
    document.getElementById('time').oninput = calculate_time;
};
