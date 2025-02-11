$("form#coins").submit(function(e) {
    e.preventDefault();
});

var servantRarity, servantAvailable;

$("#servant-class").change(function () {
    $('#servant-name').empty().append($('<option></option>').val('Select Servant').html('Select Servant'));

    var matchVal = $("#servant-class option:selected").text();
    servantList.filter(function (serv) {
        if (serv.class.toLowerCase() == matchVal.toLowerCase().replace(/\s/g, '')) {
            $("#servant-name").append($('<option></option>').val(serv.id).html(`${serv.name}`));
        }
    });
  });

  $('#servant-name').on('change', function(){
    for (let i = 0; i < servantList.length; i++){
        if ( $('#servant-name').val() == servantList[i].id ){
            servantRarity = servantList[i].rarity;
            servantAvailable = servantList[i].available;
        }
    }
  });

  $('form').on('submit', function(event) {
    var rarityAvailable, npCoin, bondCoin;
    var nplvl = parseFloat($('#np-level').val());
    var bondlvl = parseFloat($('#bond-level').val());

    // Calculate coins based on servant rarity and servant availability
    rarityAvailable = CalculateRarityAvailableCoins(servantRarity, servantAvailable);

    npCoin = nplvl * rarityAvailable;

    // Calculate coins based on servant's bond level
    bondCoin = CalculateBondCoins(bondlvl);

    var total = npCoin + bondCoin;
    $('#coin-result').val(total);
    console.log(total);
  });

  // Calculate coins based on servant rarity and servant availability
function CalculateRarityAvailableCoins(rarity, available) {
    switch(rarity) {
        case "ssr":
            return 90;
        
        case "sr":
            if(available == "welfare") {
                return 0;
            }
            else if(available == "permanent" || available == "fpgacha") {
                return 30;
            } 
            else if(available == "limited" || available == "story") {
                return 50;
            }
        
        case "r":
            if(available == "permanent") {
                return 15;
            } 
            else if(available == "limited" || available == "story") {
                return 30;
            }

        case "uc":
            return 6;

        case "c":
            if(available == "permanent") {
                return 2;
            } 
            else if(available == "limited") {
                return 15;
            }

        case "angra":
            return 50;
    }
}

// Calculate coins based on servant's bond level
function CalculateBondCoins(bond) {
    let bondCoin;

    if(bond < 7) { // 5 coins per level for levels 1-6
        bondCoin = bond * 5;
    } else if (bond < 10) { // 20 coins per level for levels 7-9 + 30 coins for levels 1-6
        bondCoin = ((bond - 6) * 20) + 30;
    } else if (bond === 10) { // 40 coins for level 10 + 30 coins for levels 1-6 + 60 coins for levels 7-9
        bondCoin = 130;
    } else if (bond === 11) { // 50 coins for level 11 + 40 coins for level 10 + 30 coins for levels 1-6 + 60 coins for levels 7-9
        bondCoin = 180;
    } else if (bond > 11 && bond <= 15) { // 60 coins per level for levels 12-15 + 50 coins for level 11 + 40 coins for level 10 + 30 coins for levels 1-6 + 30 coins for levels 7-9
        bondCoin = ((bond - 8) * 60);
    }

    return bondCoin;

}