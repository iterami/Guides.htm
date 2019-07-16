'use strict';

function repo_init(){
    core_repo_init({
      'title': 'Guides.htm',
    });

    core_interval_modify({
      'id': 'second',
      'interval': 1000,
      'todo': update_time,
    });
}

function update_time(){
    let regions = {
      'a-end': 313200,
      'a-start': 316800,
      'ac-end': 327600,
      'ac-start': 331200,
      'e-end': 327600,
      'e-start': 331200,
    };
    let date = timestamp_to_date();
    let week_seconds = date['day'] * 86400 + date['hour'] * 3600 + date['minute'] * 60 + date['second'];

    for(let region in regions){
        if(week_seconds > regions[region]){
            regions[region] += 604800;
        }

        let seconds = regions[region] - week_seconds;
        document.getElementById(region).innerHTML =
          Number.parseInt(seconds / 86400, 10) % 7 + 'd '
          + core_digits_min({
            'number': Number.parseInt(seconds / 3600, 10) % 24,
          }) + 'h '
          + core_digits_min({
            'number': Number.parseInt(seconds / 60, 10) % 60,
          }) + 'm '
          + core_digits_min({
            'number': seconds % 60,
          }) + 's';
    }
}
