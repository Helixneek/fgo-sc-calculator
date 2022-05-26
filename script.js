$("form#coins").submit(function(e) {
    e.preventDefault();
});

var servRarity, servAva;

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
            servRarity = servantList[i].rarity;
            servAva = servantList[i].available;
        }
    }
  });

  $('form').on('submit', function(event) {
    var rarityAva, npCoin, bondCoin;
    var nplvl = parseFloat($('#np-level').val());
    var bondlvl = parseFloat($('#bond-level').val());

    if(servRarity == "angra") {
        rarityAva = 50;
    } else if (servRarity == "c") {
        rarityAva = 2;
    } else if (servRarity == "uc") {
        rarityAva = 6;
    } else if (servRarity == "r" && servAva == "limited") {
        rarityAva = 30;
    } else if (servRarity == "r" && servAva == "permanent") {
        rarityAva = 15;
    } else if (servRarity == "sr" && servAva == "limited") {
        rarityAva = 50;
    } else if (servRarity == "sr" && servAva == "permanent") {
        rarityAva = 30;
    } else if (servRarity == "ssr") {
        rarityAva = 90;
    }

    npCoin = nplvl * rarityAva;

    if(bondlvl < 7) {
        bondCoin = bondlvl * 5;
    } else if (bondlvl < 10) {
        bondCoin = (bondlvl - 6) * 10 + 30;
    } else if (bondlvl <= 15) {
        bondCoin = ((bondlvl - 9) * 20) + 60;
    }

    var total = npCoin + bondCoin;
    $('#coin-result').val(total);
    console.log(total);
  });