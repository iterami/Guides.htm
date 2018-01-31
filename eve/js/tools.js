'use strict';

function calculate_alignment(){
    var inertia = Number(document.getElementById('alignment-inertia').value);
    var mass = Number(document.getElementById('alignment-mass').value);

    document.getElementById('alignment-result').innerHTML = (Math.log(2) * inertia * mass) / 500000;
}

function calculate_efficiency(){
    var lost = Number(document.getElementById('efficiency-lost').value);
    var total = lost + Number(document.getElementById('efficiency-destroyed').value);

    document.getElementById('efficiency-result').innerHTML = (1 - (lost  / total)) * 100;
}

function calculate_skillpoints(){
    var level = Number(document.getElementById('skill-level').value);
    var rank = Number(document.getElementById('skill-rank').value);

    document.getElementById('skill-result').innerHTML = Math.floor(Math.pow(2, 2.5 * (level - 1)) * rank * 250);
}

function calculate_target(){
    var scan = Number(document.getElementById('target-scan').value);
    var sig = Number(document.getElementById('target-sig').value);

    document.getElementById('target-result').innerHTML = 40000 / (scan * Math.pow(Math.sin(sig), 2));
}

function calculate_year(){
    var year = parseInt(
      document.getElementById('current-year').value,
      10
    );
    if(isNaN(year)){
        year = new Date().getFullYear();
    }

    document.getElementById('current-year').value = year;
    document.getElementById('eve-year').innerHTML = year + 21338;
    document.getElementById('yc-year').innerHTML = year - 1898;
}

function repo_init(){
    core_repo_init({
      'title': 'Guides.htm',
    });

    calculate_alignment();
    calculate_efficiency();
    calculate_skillpoints();
    calculate_target();
    calculate_year();

    document.getElementById('alignment-inertia').oninput =
      document.getElementById('alignment-mass').oninput = calculate_alignment;
    document.getElementById('efficiency-destroyed').oninput =
      document.getElementById('efficiency-lost').oninput = calculate_efficiency;
    document.getElementById('current-year').oninput = calculate_year;
    document.getElementById('skill-level').oninput =
      document.getElementById('skill-rank').oninput = calculate_skillpoints;
    document.getElementById('target-scan').oninput =
      document.getElementById('target-sig').oninput = calculate_target;
};
