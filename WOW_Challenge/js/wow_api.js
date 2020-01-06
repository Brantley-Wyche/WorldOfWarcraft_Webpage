/*
*    Checks if the object exists in the 'Items' API and if it doesn't,
*    three hyphens will take it's place in the container.
*   Also gets the ID of the item and uses it to get the bonus stats
*/
function itemChecker(value) {
    
    if(typeof value === 'undefined' || null){

        //If it doesn't exist, return this
        return '---'; 
    }else{
        if(value.hasOwnProperty('name') != 'undefined' || null){

            //Use the ID to get the bonus item stats
            bonusItemInfo(value.id);

            //return the completed item name
            return value.name;
        }
        else{
            //If it doesn't exist, return this
            return '---';
        }
    } 
};

//Gets the ID of the item and proceeds to get the buy/sell prices and the required level
//  and proceeds to append them to the modal to display them
function bonusItemInfo(id){

    let bonus_string ='';

    return $.ajax({

        type: 'get',
        async: true,
        url: `https://us.api.blizzard.com/wow/item/${id}?locale=en_US&access_token=USpI8UKrH2xMKEVtYHZBYaRjeVVH3xALMv`,
        success: function(json){

            //Puts the data into a string that gets appended to the modal body
            bonus_string = `
            <div class='BONUS'>
                <h5 class='modal_header'>${json.name}</h5>
                <p class='left-aligned-titles'>Buy Price: ${json.buyPrice}</p>
                <p class='left-aligned-titles'>Sell Price: ${json.sellPrice}</p>
                <p class='last-left'>Required Level: ${json.requiredLevel}</p>
            </div>`;

            //Data is appended to the modal body
            $('#myModal').find('.modal-body').append(bonus_string);
        }
    }).fail(function(){

        alert("Can't display Bonus Stats!");
    });
}

//Function to make ajax calls to the APIs
function api_call(field){

    //Gets the values from the search fields
    let name = $('#form1').val();
    let realm = $('#form2').val();

    //Pass in the realm name, character name, and the API ('stats' or 'items') and the appropriate API will be called
    return $.ajax({

        type: 'get',
        async: true,
        url: `https://us.api.blizzard.com/wow/character/${realm}/${name}?fields=${field}&locale=en_US&access_token=USpI8UKrH2xMKEVtYHZBYaRjeVVH3xALMv`,
        success: function(json){

            console.log('loaded');
        }
    }).fail(function(){
        
        alert("Please fill in both fields with a CORRECT character name and a corresponding realm!");
    });
}

//Calls the 'Stats' API in WOW Community API
function getStatData(field){
    
    //These strings will be contain the data that is gotten from the API and 
    //  will be appended to their corresponding rows
    let stat_string_1 = '';
    let stat_string_2 = '';
    let stat_string_3 = '';

    //The following code will execute after the 'api_call' function has connected to the API
    api_call(field).done(function(json){

        //Removes any old data from the container so new data can be inserted
        $('#stats_1').remove();
        $('#stats_2').remove();
        $('#stats_3').remove();

        //Contains the Strength, Agility, Intellect, Stamina, Damage, Speed, and Mana Regen values
        stat_string_1 = `
            <div class="col" id='stats_1'>
                                    
                <h6 class="left-aligned-headers"><b>Attributes</b></h6>
                <div class="test">
                    <p class="left-aligned-titles">Strenth</p>
                    <p class="right-aligned-stats">${json.stats.str}</p>
                </div>

                <div class="test">
                    <p class="left-aligned-titles">Agility</p>
                    <p class="right-aligned-stats green-text">${json.stats.agi}</p>
                </div>
                
                <div class="test">
                    <p class="left-aligned-titles">Intellect</p>
                    <p class="right-aligned-stats">${json.stats.int}</p>
                </div>

                <div class="test">
                    <p class="last-left">Stamina</p>
                    <p class="right-aligned-stats green-text">${json.stats.sta}</p>
                </div>


                <h6 class="left-aligned-headers" ><b>Attack</b></h6>
                <div class="test">
                    <p class="left-aligned-titles">Damage</p>
                    <p class="right-aligned-stats">${json.stats.mainHandDmgMin}-${json.stats.mainHandDmgMax}</p>
                </div>

                <div class="test">
                    <p class="last-left">Speed</p>
                    <p class="right-aligned-stats">${json.stats.mainHandSpeed}/${json.stats.offHandSpeed}</p>
                </div>
                

                <h6 class="left-aligned-headers"><b>Spell</b></h6>
                <div class="test">
                    <p class="last-left">Mana Regen</p>
                    <p class="right-aligned-stats">${json.stats.mana5}</p>
                </div>
            </div>`;

        //Contains the Armor, Dodge, Parry, Block, Crit, Haste, Mastery, Leech (twice), and Versatility fields
        stat_string_2 =`
            <div class="col" id='stats_2'>
                <h6 class="left-aligned-headers"><b>Defense</b></h6>
                <div class="test">
                    <p class="left-aligned-titles">Armor</p>
                    <p class="right-aligned-stats">${json.stats.armor}</p>
                </div>

                <div class="test">
                    <p class="left-aligned-titles">Dodge</p>
                    <p class="right-aligned-stats">${json.stats.dodge}</p>
                </div>

                <div class="test">
                    <p class="left-aligned-titles">Parry</p>
                    <p class="right-aligned-stats">${json.stats.parry}</p>
                </div>

                <div class="test">
                    <p class="last-left">Block</p>
                    <p class="right-aligned-stats">${json.stats.block}</p>
                </div>

                <h6 class="left-aligned-headers"><b>Enhancements</b></h6>
                <div class="test">
                    <p class="left-aligned-titles">Crit</p>
                    <p class="right-aligned-stats">${json.stats.crit}</p>
                </div>

                <div class="test">
                    <p class="left-aligned-titles">Haste</p>
                    <p class="right-aligned-stats">${json.stats.haste}</p>
                </div>

                <div class="test">
                    <p class="left-aligned-titles">Mastery</p>
                    <p class="right-aligned-stats green-text">${json.stats.mastery}</p>
                </div>

                <div class="test">
                    <p class="left-aligned-titles">Leech</p>
                    <p class="right-aligned-stats">${json.stats.leech}</p>
                </div>
                
                <div class="test">
                    <p class="left-aligned-titles">Versatility</p>
                    <p class="right-aligned-stats">${json.stats.versatility}</p>
                </div>

                <div class="test">
                    <p class="last-left">Leech</p>
                    <p class="right-aligned-stats">${json.stats.leech}</p>
                </div>
            </div>`;

        /*
        *   This is my own personal touch to the site
        *   Contains the Character and Realm names, the Battlegroup, Health, Level, Power Type, 
        *   and a button that brings up a modal for the bonus item stats
        */
        stat_string_3 = `
            <div id="stats_3" class='d-flex flex-column'>
                <h2 class="text-center"><b>${json.name}</b></h2>
                <br>
                <p class='text-center'>Realm: ${json.realm}</p>
                <p class="text-center">Battlegroup: ${json.battlegroup}</p>
                <p class='text-center'>Health Points: ${json.stats.health}</p>
                <p class='text-center'>Level: ${json.level}</p>
                <p class='text-center text-capitalize'>Power Type: ${json.stats.powerType}</p>
                <button type="button" id="bonusButton" class="btn btn-default btn-sm text-center"><a data-toggle="modal" data-target="#myModal">Bonus Item Stats</a></button>
            </div>`;

            //Appends the three strings to their respective containers for display
            $('#ROW_1').append(stat_string_1);
            $('#ROW_2').append(stat_string_2);
            $('#ROW_3').append(stat_string_3);
    });

}

//Calls the 'Items' API in the WOW Community API
function getItemData(field){
    
    let item_string_1 = '';

    //The following code will execute after the 'api_call' function has connected to the API
    api_call(field).done(function(json){

        //Removes any old data from the container so new data can be inserted
        $('#items_1').remove();

        //Contains every equippable item that the Items API returns and replaces with '---' if something is undefined/null
        item_string_1 = `
            <div class="col" id='items_1'>
            
                <div class="test">
                    <h6 class="left-aligned-headers"><b>Item</b></h6>
                    <h6 class="left-aligned-headers"><b>Name</b></h6>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Head</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.head)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Neck</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.neck)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Shoulder</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.shoulder)}v</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Back</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.back)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Chest</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.chest)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Shirt</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.shirt)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Tabard</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.tabard)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Wrist</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.wrist)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Hands</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.hands)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Waist</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.waist)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Legs</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.legs)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Feet</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.feet)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Finger 1</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.finger1)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Finger 2</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.finger2)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Trinket 1</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.trinket1)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Trinket 2</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.trinket2)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Main Hand</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.mainHand)}</p>
                </div>
                <div class="test">
                    <p class="left-aligned-titles">Off Hand</p>
                    <p class="left-aligned-titles">${itemChecker(json.items.offHand)}</p>
                </div>
            </div>`;

            //Appends to it's corresponding container (I called it ROW_4 for the sake of consistency)
            $('#ROW_4').append(item_string_1);
    });
}


$(document).ready(function(){

    $('#data_container').hide();

    //Hides the main container if the button image is clicked
    $("#myButton").click(function() {

        $('#data_container').hide();
        
    });

    $("#searchButton").click(function() {

        //Display the main container if it's hidden
        $('#data_container').show();

        //Get the stats and items
        getStatData('stats');
        getItemData('items');

        //Removes any old data from the modal so new data can be inserted
        $('.BONUS').remove();
    });

    //Making a variable for the modal and displaying said modal when the button is clicked
    var infoModal = $('#myModal');
    $('#bonusButton').on('click', function(){

        infoModal.modal('show');
    });

});