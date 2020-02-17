'use strict';

function calculate_alignment(){
    const inertia = Number(document.getElementById('alignment-inertia').value);
    const mass = Number(document.getElementById('alignment-mass').value);

    document.getElementById('alignment-result').textContent = core_number_format({
      'number': (Math.log(2) * inertia * mass) / 500000,
    });
}

function calculate_efficiency(){
    const lost = Number(document.getElementById('efficiency-lost').value);
    const total = lost + Number(document.getElementById('efficiency-destroyed').value);

    document.getElementById('efficiency-result').textContent = (1 - (lost  / total)) * 100;
}

function calculate_ehp(){
    const hp = {
      'armor': Number(document.getElementById('armor-hp').value),
      'shield': Number(document.getElementById('shield-hp').value),
      'structure': Number(document.getElementById('structure-hp').value),
    };

    document.getElementById('total-hp').textContent = core_number_format({
      'number': hp['armor'] + hp['shield'] + hp['structure'],
    });

    const resists = [
      'em',
      'explosive',
      'kinetic',
      'thermal',
    ];
    for(const type in resists){
        let ehp = 0;

        const hp_types = [
          'armor',
          'shield',
          'structure',
        ];
        for(const hp_type in hp_types){
            const resistance = math_clamp({
              'max': 99,
              'min': 0,
              'value': Number(document.getElementById(hp_types[hp_type] + '-' + resists[type]).value),
            });

            ehp += hp[hp_types[hp_type]] / (1 - (resistance / 100));
        }

        document.getElementById('total-' + resists[type]).textContent = core_round({
          'number': ehp,
        });
    }
}

function calculate_material(){
    const base = Number(document.getElementById('material-input').value);

    for(let i = 1; i < 11; i++){
        const discounted = core_round({
          'number': base * ((100 - i) / 100),
        });
        const numerator = core_round({
          'number': discounted % 1,
        });
        const denominator = Math.pow(
          10,
          String(numerator).length - 2
        );

        numerator *= denominator;

        document.getElementById('material-' + i).textContent = core_number_format({
          'decimals-min': 0,
          'number': Math.ceil(discounted),
        });

        if(numerator !== 0){
            const reduction = math_fraction_reduce({
              'denominator': denominator,
              'numerator': numerator,
            });

            denominator = reduction['denominator'];

        }else{
            denominator = 1;
        }

        document.getElementById('runs-' + i).textContent = denominator;
    }
}

function calculate_skillpoints(){
    const level = Number(document.getElementById('skill-level').value);
    const rank = Number(document.getElementById('skill-rank').value);

    document.getElementById('skill-result').textContent = core_number_format({
      'decimals-min': 0,
      'number': Math.floor(Math.pow(2, 2.5 * (level - 1)) * rank * 250),
    });
}

function calculate_target(){
    const scan = Number(document.getElementById('target-scan').value);
    const sig = Number(document.getElementById('target-sig').value);

    document.getElementById('target-result').textContent = core_number_format({
      'number': (40000 / scan ) / Math.pow(Math.asinh(sig), 2),
    });
}

function calculate_year(){
    let year = Number.parseInt(
      document.getElementById('current-year').value,
      10
    );
    if(Number.isNaN(year)){
        year = new Date().getFullYear();
    }

    document.getElementById('current-year').value = year;
    document.getElementById('eve-year').textContent = core_number_format({
      'decimals-min': 0,
      'number': year + 21338,
    });
    document.getElementById('yc-year').textContent = core_number_format({
      'decimals-min': 0,
      'number': year - 1898,
    });
}

function calculate_war(){
    const members = Number(document.getElementById('war-members').value);

    let cost = Math.pow(
      (Math.log(members) / Math.log(1.675)),
      2
    ) * 300000 * Math.pow(
      members,
      0.26815
    );
    if(cost < 50000000){
        cost = 50000000;
    }

    document.getElementById('war-result').textContent = core_number_format({
      'decimals-min': 2,
      'number': cost,
    });
}

function repo_init(){
    core_repo_init({
      'root': '../../index.htm',
      'title': 'Guides.htm',
    });

    calculate_alignment();
    calculate_efficiency();
    calculate_skillpoints();
    calculate_target();
    calculate_year();
    calculate_war();

    document.getElementById('alignment-inertia').oninput =
      document.getElementById('alignment-mass').oninput = calculate_alignment;
    document.getElementById('efficiency-destroyed').oninput =
      document.getElementById('efficiency-lost').oninput = calculate_efficiency;
    document.getElementById('current-year').oninput = calculate_year;
    document.getElementById('armor-hp').oninput =
      document.getElementById('armor-em').oninput =
      document.getElementById('armor-explosive').oninput =
      document.getElementById('armor-kinetic').oninput =
      document.getElementById('armor-thermal').oninput =
      document.getElementById('shield-hp').oninput =
      document.getElementById('shield-em').oninput =
      document.getElementById('shield-explosive').oninput =
      document.getElementById('shield-kinetic').oninput =
      document.getElementById('shield-thermal').oninput =
      document.getElementById('structure-hp').oninput =
      document.getElementById('structure-em').oninput =
      document.getElementById('structure-explosive').oninput =
      document.getElementById('structure-kinetic').oninput =
      document.getElementById('structure-thermal').oninput = calculate_ehp;
    document.getElementById('material-input').oninput = calculate_material;
    document.getElementById('skill-level').oninput =
      document.getElementById('skill-rank').oninput = calculate_skillpoints;
    document.getElementById('target-scan').oninput =
      document.getElementById('target-sig').oninput = calculate_target;
    document.getElementById('war-members').oninput = calculate_war;
};
