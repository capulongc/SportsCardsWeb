$(document).ready(function () {
    var sportList = document.getElementById('sportList');

    sportList.options[0] = new Option('---Select Sport---', '');
    sportList.options[1] = new Option('Baseball', 'Baseball');
    sportList.options[2] = new Option('Football', 'Football');
    sportList.options[3] = new Option('Basketball', 'Basketball');
    sportList.options[4] = new Option('Hockey', 'Hockey');
});

function setOptions() {
    var sportList = document.getElementById('sportList');
    var teamList = document.getElementById('teamList');

    var sport = sportList.options[sportList.selectedIndex].value;

    if (sport == 'Baseball') {
        teamList.options.length = 0;
        teamList.options[0] = new Option('--Select Team--', '');
        teamList.options[1] = new Option('Arizona Diamondbacks', 'Arizona Diamondbacks');
        teamList.options[2] = new Option('Atlanta Braves', 'Atlanta Braves');
        teamList.options[3] = new Option('Baltimore Orioles', 'Baltimore Orioles');
        teamList.options[4] = new Option('Boston Red Sox', 'Boston Red Sox');
        teamList.options[5] = new Option('Chicago White Sox', 'Chicago White Sox');
        teamList.options[6] = new Option('Chicago Cubs', 'Chicago Cubs');
        teamList.options[7] = new Option('Cincinnati Reds', 'Cincinnati Reds');
        teamList.options[8] = new Option('Cleveland Indians', 'Cleveland Indians');
        teamList.options[9] = new Option('Colorado Rockies', 'Colorado Rockies');
        teamList.options[10] = new Option('Detroit Tigers', 'Detroit Tigers');
        teamList.options[11] = new Option('Houston Astros', 'Houston Astros');
        teamList.options[12] = new Option('Kansas City Royals', 'Kansas City Royals');
        teamList.options[13] = new Option('Los Angeles Angels', 'Los Angeles Angels');
        teamList.options[14] = new Option('Los Angeles Dodgers', 'Los Angeles Dodgers');
        teamList.options[15] = new Option('Miami Marlins', 'Miami Marlins');
        teamList.options[16] = new Option('Milwaukee Brewers', 'Milwaukee Brewers');
        teamList.options[17] = new Option('Minnesota Twins', 'Minnesota Twins');
        teamList.options[18] = new Option('New York Mets', 'New York Mets');
        teamList.options[19] = new Option('New York Yankees', 'New York Yankees');
        teamList.options[20] = new Option('Oakland Athletics', 'Oakland Athletics');
        teamList.options[21] = new Option('Philadelphia Phillies', 'Philadelphia Phillies');
        teamList.options[22] = new Option('Pittsburgh Pirates', 'Pittsburgh Pirates');
        teamList.options[23] = new Option('St. Louis Cardinals', 'St. Louis Cardinals');
        teamList.options[24] = new Option('San Diego Padres', 'San Diego Padres');
        teamList.options[25] = new Option('San Francisco Giants', 'San Francisco Giants');
        teamList.options[26] = new Option('Seattle Mariners', 'Seattle Mariners');
        teamList.options[27] = new Option('Tampa Bay Rays', 'Tampa Bay Rays');
        teamList.options[28] = new Option('Texas Rangers', 'Texas Rangers');
        teamList.options[29] = new Option('Toronto Blue Jays', 'Toronto Blue Jays');
        teamList.options[30] = new Option('Washington Nationals', 'Washington Nationals');
    }

    else if (sport == 'Football') {
        teamList.options.length = 0;
        teamList.options[0] = new Option('--Select Team--', '');
        teamList.options[1] = new Option('Arizona Cardinals', 'Arizona Cardinals');
        teamList.options[2] = new Option('Atlanta Falcons', 'Atlanta Falcons');
        teamList.options[3] = new Option('Baltimore Ravens', 'Baltimore Ravens');
        teamList.options[4] = new Option('Buffalo Bills', 'Buffalo Bills');
        teamList.options[5] = new Option('Carolina Panthers', 'Carolina Panthers');
        teamList.options[6] = new Option('Chicago Bears', 'Chicago Bears');
        teamList.options[7] = new Option('Cincinnati Bengals', 'Cincinnati Bengals');
        teamList.options[8] = new Option('Cleveland Browns', 'Cleveland Browns');
        teamList.options[9] = new Option('Dallas Cowboys', 'Dallas Cowboys');
        teamList.options[10] = new Option('Denver Broncos', 'Denver Broncos');
        teamList.options[11] = new Option('Detroit Lions', 'Detroit Lions');
        teamList.options[12] = new Option('Green Bay Packers', 'Green Bay Packers');
        teamList.options[13] = new Option('Houston Texans', 'Houston Texans');
        teamList.options[14] = new Option('Indianapolis Colts', 'Indianapolis Colts');
        teamList.options[15] = new Option('Jacksonville Jaguars', 'Jacksonville Jaguars');
        teamList.options[16] = new Option('Kansas City Chiefs', 'Kansas City Chiefs');
        teamList.options[17] = new Option('Miami Dolphins', 'Miami Dolphins');
        teamList.options[18] = new Option('Minnesota Vikings', 'Minnesota Vikings');
        teamList.options[19] = new Option('New England Patriots', 'New England Patriots');
        teamList.options[20] = new Option('New Orleans Saints', 'New Orleans Saints');
        teamList.options[21] = new Option('New York Giants', 'New York Giants');
        teamList.options[22] = new Option('New York Jets', 'New York Jets');
        teamList.options[23] = new Option('Oakland Raiders', 'Oakland Raiders');
        teamList.options[24] = new Option('Philadelphia Eagles', 'Philadelphia Eagles');
        teamList.options[25] = new Option('Pittsburgh Steelers', 'Pittsburgh Steelers');
        teamList.options[26] = new Option('St. Louis Rams', 'St. Louis Rams');
        teamList.options[27] = new Option('San Diego Chargers', 'San Diego Chargers');
        teamList.options[28] = new Option('San Francisco 49ers', 'San Francisco 49ers');
        teamList.options[29] = new Option('Seattle Seahawks', 'Seattle Seahawks');
        teamList.options[30] = new Option('Tampa Bay Buccaneers', 'Tampa Bay Buccaneers');
        teamList.options[31] = new Option('Tennessee Titans', 'Tennessee Titans');
        teamList.options[32] = new Option('Washington Redskins', 'Washington Redskins');
    }

    else if (sport == 'Basketball') {
        teamList.options.length = 0;
        teamList.options[0] = new Option('--Select Team--', '');
        teamList.options[1] = new Option('*INSERT TEAMS*', '');
    }

    else if (sport == 'Hockey') {
        teamList.options.length = 0;
        teamList.options[0] = new Option('--Select Team--', '');
        teamList.options[1] = new Option('*INSERT TEAMS*', '');
    }
}