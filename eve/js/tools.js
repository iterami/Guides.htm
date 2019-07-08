'use strict';

function calculate_alignment(){
    let inertia = Number(document.getElementById('alignment-inertia').value);
    let mass = Number(document.getElementById('alignment-mass').value);

    document.getElementById('alignment-result').innerHTML = core_number_format({
      'number': (Math.log(2) * inertia * mass) / 500000,
    });
}

function calculate_efficiency(){
    let lost = Number(document.getElementById('efficiency-lost').value);
    let total = lost + Number(document.getElementById('efficiency-destroyed').value);

    document.getElementById('efficiency-result').innerHTML = (1 - (lost  / total)) * 100;
}

function calculate_material(){
    let base = Number(document.getElementById('material-input').value);

    for(let i = 1; i < 11; i++){
        let discounted = core_round({
          'number': base * ((100 - i) / 100),
        });
        let fraction = core_round({
          'number': discounted % 1,
        });
        let power = Math.pow(
          10,
          String(fraction).length - 2
        );

        fraction *= power;

        document.getElementById('material-' + i).innerHTML = core_number_format({
          'number': Math.ceil(discounted),
        });

        if(fraction !== 0){

            let done = false;

            while(!done){
                let result = core_round({
                  'number': greatest_common_divisor(
                    fraction,
                    power
                  ),
                });

                if(result > 1){
                    fraction /= result;
                    power /= result;

                }else{
                    done = true;
                }
            }

        }else{
            power = 1;
        }

        document.getElementById('runs-' + i).innerHTML = power;
    }
}

function calculate_skillpoints(){
    let level = Number(document.getElementById('skill-level').value);
    let rank = Number(document.getElementById('skill-rank').value);

    document.getElementById('skill-result').innerHTML = core_number_format({
      'number': Math.floor(Math.pow(2, 2.5 * (level - 1)) * rank * 250),
    });
}

function calculate_target(){
    let scan = Number(document.getElementById('target-scan').value);
    let sig = Number(document.getElementById('target-sig').value);

    document.getElementById('target-result').innerHTML = core_number_format({
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
    document.getElementById('eve-year').innerHTML = core_number_format({
      'number': year + 21338,
    });
    document.getElementById('yc-year').innerHTML = core_number_format({
      'number': year - 1898,
    });
}

function calculate_war(){
    let members = Number(document.getElementById('war-members').value);

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

    document.getElementById('war-result').innerHTML = core_number_format({
      'number': cost,
    });
}

function greatest_common_divisor(small, big){
    if(big === 0){
        return small;
    }
    if(small === 0){
        return big;
    }

    return greatest_common_divisor(
      big,
      small % big
    );
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
    calculate_war();

    document.getElementById('alignment-inertia').oninput =
      document.getElementById('alignment-mass').oninput = calculate_alignment;
    document.getElementById('efficiency-destroyed').oninput =
      document.getElementById('efficiency-lost').oninput = calculate_efficiency;
    document.getElementById('current-year').oninput = calculate_year;
    document.getElementById('material-input').oninput = calculate_material;
    document.getElementById('skill-level').oninput =
      document.getElementById('skill-rank').oninput = calculate_skillpoints;
    document.getElementById('target-scan').oninput =
      document.getElementById('target-sig').oninput = calculate_target;
    document.getElementById('war-members').oninput = calculate_war;
};
