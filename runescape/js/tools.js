'use strict';

function calculate_combat(){
    // Verify skills and store their values.
    let skills = {
      'attack': 1,
      'constitution': 10,
      'defense': 1,
      'magic': 1,
      'prayer': 1,
      'ranged': 1,
      'strength': 1,
      'summoning': 1,
    };
    for(let id in skills){
        let value = document.getElementById(id).value;

        if(!Number.isNaN(value)
          && value.length >= 1
          && value >= 1){
            skills[id] = Number.parseInt(
              value,
              10
            );
        }
    }

    // Calculate combat level using the 138 formula.
    document.getElementById('result-138').textContent =
      Math.floor((
        1.3 * Math.max(
          (skills['attack'] + skills['strength']),
          skills['magic'] * 2,
          skills['ranged'] * 2
        )
        + skills['defense']
        + skills['constitution']
        + (skills['prayer'] / 2)
        + (skills['summoning'] / 2)
      ) / 4);

    // Calculate combat level using the 200 formula.
    document.getElementById('result-200').textContent =
      Math.max(
        skills['attack'],
        skills['magic'],
        skills['ranged'],
        skills['strength'],
        skills['summoning']
      )
      + skills['defense'] + 2;
}

function calculate_xp(){
    let first = Number.parseInt(
      document.getElementById('first').value,
      10
    );
    let second = Number.parseInt(
      document.getElementById('second').value,
      10
    );

    if(first >= second){
        document.getElementById('result').textContent = 'First level must be lower than the second level.';
        return;
    }

    let xp = [
      0,
      83,
      174,
      276,
      388,
      512,
      650,
      801,
      969,
      1154,
      1358,
      1584,
      1833,
      2107,
      2411,
      2746,
      3115,
      3523,
      3973,
      4470,
      5018,
      5624,
      6291,
      7028,
      7842,
      8740,
      9730,
      10824,
      12031,
      13363,
      14833,
      16456,
      18247,
      20224,
      22406,
      24815,
      27473,
      30408,
      33648,
      37224,
      41171,
      45529,
      50339,
      55649,
      61512,
      67983,
      75127,
      83014,
      91721,
      101333,
      111945,
      123660,
      136594,
      150872,
      166363,
      184040,
      203254,
      224466,
      247886,
      273742,
      302288,
      333804,
      368599,
      407015,
      449428,
      496254,
      547953,
      605032,
      668051,
      737627,
      814445,
      899257,
      992895,
      1096278,
      1210421,
      1336443,
      1475581,
      1629200,
      1798808,
      1986068,
      2192818,
      2421087,
      2673114,
      2951373,
      3258594,
      3597792,
      3972294,
      4385776,
      4842295,
      5346332,
      5902831,
      6517253,
      7195629,
      7944614,
      8771558,
      9684577,
      10692629,
      11805606,
      13034431,
      14391160,
      15889108,
      17542976,
      19368991,
      21385072,
      23611005,
      26068631,
      28782068,
      31777942,
      35085653,
      38737660,
      42769799,
      47221639,
      52136868,
      57563717,
      63555442,
      70170839,
      77474827,
      85539081,
      94442736,
      104273166,
      200000000,
    ];

    document.getElementById('first-xp').textContent = xp[first - 1];
    document.getElementById('second-xp').textContent = xp[second - 1];

    document.getElementById('result').innerHTML =
      'Min ('
      + xp[first - 1]
      + ' xp): '
      + ((xp[first - 1] / xp[second - 1]) * 100)
      + '%<br>Max ('
      + (xp[first] - 1)
      + ' xp): '
      + (((xp[first] - 1) / xp[second - 1]) * 100)
      + '%';
}

function repo_init(){
    core_repo_init({
      'root': '../../index.htm',
      'title': 'Guides.htm',
    });

    let ids = [
      'attack',
      'constitution',
      'defense',
      'magic',
      'prayer',
      'ranged',
      'strength',
      'summoning',
    ];
    for(let id in ids){
        document.getElementById(ids[id]).oninput = calculate_combat;
    }

    document.getElementById('first').onchange = calculate_xp;
    document.getElementById('second').onchange = calculate_xp;

    let select_options = '';
    for(let i = 1; i <= 120; i++){
        select_options += '<option value=' + i + '>' + i + '</option>';
    }
    document.getElementById('first').innerHTML = select_options;

    select_options = '';
    for(let i = 2; i <= 120; i++){
        select_options += '<option value=' + i + '>' + i + '</option>';
    }
    select_options += '<option value=121>Max</option>';
    document.getElementById('second').innerHTML = select_options;

    calculate_combat();
    calculate_xp();

    core_interval_modify({
      'id': 'second',
      'interval': 1000,
      'sync': true,
      'todo': update_time,
    });
}

function update_time(){
    let now = timestamp_to_date();
    let seconds = 86400 - (
      now['hour'] * 3600
      + now['minute'] * 60
      + now['second']
    );

    let hours = Number.parseInt(seconds / 3600, 10) % 24;
    let minutes = Number.parseInt(seconds / 60, 10) % 60;
    seconds = seconds % 60;

    document.getElementById('time').innerHTML = core_digits_min({
      'number': hours,
    }) + ':'
    + core_digits_min({
      'number': minutes,
    }) + ':'
    + core_digits_min({
      'number': seconds,
    });
}
