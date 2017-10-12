'use strict';

function repo_init(){
    core_repo_init({
      'title': 'Guides.htm',
    });

    window.setInterval(
      update_time,
      500
    );
}

function update_time(){
    var regions = {
      'a-end': 126000,
      'a-start': 316800,
      'ac-end': 79200,
      'ac-start': 331200,
      'e-end': 104400,
      'e-start': 331200,
    };
    var date = time_timestamp_to_date();
    var week_seconds = date['day'] * 86400 + date['hour'] * 3600 + date['minute'] * 60 + date['second'];

    for(var region in regions){
        if(week_seconds > regions[region]){
            regions[region] += 604800;
        }

        var seconds = regions[region] - week_seconds;
        document.getElementById(region).innerHTML =
          time_two_digits({
            'number': parseInt(seconds / 86400, 10) % 7,
          }) + ':'
          + time_two_digits({
            'number': parseInt(seconds / 3600, 10) % 24,
          }) + ':'
          + time_two_digits({
            'number': parseInt(seconds / 60, 10) % 60,
          }) + ':'
          + time_two_digits({
            'number': seconds % 60,
          });
    }
}
