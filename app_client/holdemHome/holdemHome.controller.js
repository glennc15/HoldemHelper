(function () {

  angular
    .module('holdemApp')
    .controller('holdemHomeCtrl', holdemHomeCtrl);

  // reviewModalCtrl.$inject = ['$modalInstance', 'loc8rData', 'locationData'];
  // function holdemHomeCtrl ($modalInstance, loc8rData, locationData) {
  
  holdemHomeCtrl.$inject = ['$scope', 'holeOdds'];
  function holdemHomeCtrl ($scope, holeOdds) {

    var vm = this;

    // initialize number of players:
    vm.numberOfPlayers = 2;
    $scope.playersNumberRadio = vm.numberOfPlayers;



    // initialize cards:
    vm.cards = {
        holeCard1: {
            valid: false,
            value: null,
            suit: null
        },
        holeCard2: {
            valid: false,
            value: null,
            suit: null
        },
        flopCard1: {
            valid: false,
            value: null,
            suit: null
        },
        flopCard2: {
            valid: false,
            value: null,
            suit: null
        },
        flopCard3: {
            valid: false,
            value: null,
            suit: null
        },
        TurnCard1: {
            valid: false,
            value: null,
            suit: null
        },
        RiverCard1: {
            valid: false,
            value: null,
            suit: null
        }
    }

    // initialize pre flop odds:
    vm.pre_flop_percent = 0;
    vm.pre_flop_probability = 0;
    vm.pre_flop_odds = 0;

    // initialize bank roll, bet, pot:
    vm.bankBankRoll = 0;
    vm.current_bet = 0;
    vm.current_pot = 0;

    // initialize pot odds/probability:
    vm.pot_probability = 0;
    vm.pot_percent = 0;
    vm.pot_odds = 0;

    // initialize pot oods:
    vm.potOdds = {
    	"current_bet": 0,
    	"current_ante": 0,
    	"current_pot": 0,
    	"current_potOdds": 0,
    	"current_potOdds_percent": 0,
    	"total_potOdds": 0,
    	"total_potOdds_percent": 0
    };

    vm.holeOdds = 0;
    vm.flopOdds = 0;
    vm.turnOdds = 0;
    vm.riverOdds = 0;

    $scope.potBet = vm.potOdds["current_bet"];
    $scope.potAnte = vm.potOdds["current_ante"];
    $scope.potPot = vm.potOdds["current_pot"];


    vm.setPlayers = function(numberOfPlayers) {
    	vm.numberOfPlayers = numberOfPlayers;
    };

    vm.updatePot = function() {
    	// vm.pot_bet = $scope.potBet;
    	vm.potOdds["current_bet"] = parseFloat($scope.potBet);
    	vm.potOdds["current_ante"] = parseFloat($scope.potAnte);
    	vm.potOdds["current_pot"] = parseFloat($scope.potPot);

    	// calculate pot odds if the pot is not zero:
    	// Two pot odds are calculated:
    	// Total pot odds and current pot odds
    	// total pot odds account for all chips added to the pot
    	// current pot odds are for the current raise/call add to the pot

    	if (vm.potOdds["current_pot"] != 0) {
    		// current pot odds:
    		var current_raise = vm.potOdds["current_bet"] - vm.potOdds["current_ante"];
    		vm.potOdds["current_potOdds"] =  vm.potOdds["current_pot"] / current_raise;
			vm.potOdds["current_potOdds_percent"] = (1 / (1+vm.potOdds["current_potOdds"])) * 100;

    		// total pot odds:
    		vm.potOdds["total_potOdds"] =  vm.potOdds["current_pot"] / vm.potOdds["current_bet"];
    		vm.potOdds["total_potOdds_percent"] = (1 / (1+vm.potOdds["total_potOdds"])) * 100;
    	}


    	console.log("potBet:" + vm.potOdds["current_bet"]);
    	console.log("potAnte:" + vm.potOdds["current_ante"]);
    	console.log("potPot:" + vm.potOdds["current_pot"]);
    	console.log(vm);

    };

    // Get starting odds for hole cards:

    // Generic controller is called every time a change is detected in a hole card.
    // Keep tracks of the state of each hole card.
    // Validates each hole card.
    // If both hole card text inputs have valid cards get the odds for winning the hand.

    vm.bankRollCtrl = function(bank_roll_model) {
        /*

        */

        console.log("vm.bankRollCtrl(" + bank_roll_model + ")");

        var bank_roll_input = readTextInput(bank_roll_model);
        bank_roll_input = removeCommas(bank_roll_input);
        
        if (validateNumber(bank_roll_input)) {

            vm.bankBankRoll = Number(bank_roll_input);
            var formated_number = formatNumber(vm.bankBankRoll);
            writeTextInput(bank_roll_model, formated_number);

            setMaxHandBet();
        }
    };

    vm.betCtrl = function(bet_model) {
        /*

        */

        console.log("vm.betCtrl(" + bet_model + ")");

        var bet_input = readTextInput(bet_model);
        bet_input = removeCommas(bet_input);
        
        if (validateNumber(bet_input)) {

            vm.current_bet = Number(bet_input);
            var formated_number = formatNumber(vm.current_bet);
            writeTextInput(bet_model, formated_number);

            setPotOdds();

        }
    };

    vm.potCtrl = function(pot_model) {
        /*

        */

        console.log("vm.potCtrl(" + pot_model + ")");

        var pot_input = readTextInput(pot_model);
        pot_input = removeCommas(pot_input);
        
        if (validateNumber(pot_input)) {

            vm.current_pot = Number(pot_input);
            var formated_number = formatNumber(vm.current_pot);
            writeTextInput(pot_model, formated_number);

            setPotOdds();

        }
    };          

    vm.holdCardCtrl = function(hole_card_model) {

        /* 

        initial hole card functionality: Initial entry of hole cards in either
        input box. Entry is either a 1 character entry signaling a pair (i.e.
        A or a for a pair of aces). Or a 3 character entry signaling a two card
        combination either suited or off suited (i.e. ato, AtO, ATo for ace, ten off
        suited or K5s, k5S, k5s for king, five suited).

        This will give the odds of winning the hand given the number of
        players. And will also give the maximum recommened portion of the
        stack to bet in the entire hand.

        */

        console.log("vm.holdCardCtrl(" + hole_card_model + ")");

        var hole_card_input = readTextInput(hole_card_model); 
        
        if (validateCard(hole_card_input)) {
            var formated_hole_card = formatCard(hole_card_input);
            var pre_flop_percent = holeOdds.holeCardOdds(vm.numberOfPlayers , formated_hole_card);
            setPreFlopOdds(pre_flop_percent);
            writeTextInput(hole_card_model, formated_hole_card);

            setMaxHandBet();

            


        } else {
            // Invalid input:
            1 + 1; 
        }

    };

    var setPotOdds = function() {
        var risk = vm.current_bet;
        var reward = vm.current_pot + risk;

        vm.pot_probability = risk / (reward + risk);
        vm.pot_percent = vm.pot_probability * 100;
        vm.pot_odds = reward / risk;

    };

    var setMaxHandBet = function() {
        vm.maxHandBet = vm.pre_flop_percent / 100 * vm.bankBankRoll;
    };

    var setPreFlopOdds = function(pre_flop_percent) {
        console.log("setPreFlopOdds(" + pre_flop_percent + ")");

        vm.pre_flop_percent = pre_flop_percent;
        vm.pre_flop_probability = pre_flop_percent / 100;
        vm.pre_flop_odds = (1-vm.pre_flop_probability) / vm.pre_flop_probability;

    };


    var formatNumber = function(number_to_format) {
        var formated_number = number_to_format.toLocaleString();
        
        console.log("formatNumber(" + number_to_format + "): " + formated_number);

        return formated_number;
    };

    var removeCommas = function(number_string) {
        var clean_number_string = number_string.replace(/\,/g, '');

        console.log("removeCommas(" + number_string + "): " + clean_number_string);

        return clean_number_string;

    };

    var formatCard = function(card_input) {
        /*
        
        Formats the cards based on the following rules:

        string lenght 1 (represents a pair): make upper case

        string length 2 (represents a single card): 1st character to upper
        case, 2nd character to lower case.

        string length 3 (represents two card combination suited or unsuited):
        1st and 2nd characters to upper case, 3rd character to lower case.

        Does not do any validation. Assumes card_input is a valid string.

        */

        var formatted_card = null;

        if (card_input.length == 1) {
            // Example; input: t -> output T
            // Example; input: 5 -> output 5
            formatted_card = card_input.toUpperCase();

        } else if (card_input.length == 2) {
            // Example; input: 5s -> output 5s
            // Example; input: td -> output Td
            formatted_card = card_input.charAt(0).toUpperCase() + card_input.charAt(1).toLowerCase();

        } else if (card_input.length == 3) {
            card_input = checkCardOrder(card_input);

            // Example; input: aks -> output AKs
            // Example; input: t5o -> output T5o
            formatted_card = card_input.charAt(0).toUpperCase() + card_input.charAt(1).toUpperCase() + card_input.charAt(2).toLowerCase();

        }
        
        // console.log("formatted_card: " + formatted_card);

        return formatted_card;
    };

    var readTextInput = function(text_input_id) {
        /*
            text_input_id: id of a text box

            Reads the input of a text field, trims leading and trailing
            whitespace, and makes all lower case.

         */

        var input_str = $scope.$eval(text_input_id).toLowerCase().trim();
        
        // console.log("input_str:" + input_str);

        return input_str;
    };

    var writeTextInput = function(text_input_id, value) {

        console.log("writeTextInput(" + text_input_id + ", " + value + ")");

        $scope[text_input_id] = value;
    };

    var checkCardOrder = function(card_input) {
        /* 

            card_input: 3 character string representing a two and combination
            and if it's suited or unsuited. 

            sorts the first two card values in desending order.

            Examples: 
                aks -> aks
                kas -> aks
                5to -> t5o  

        */

        var new_cards = card_input;

        var card_value = {
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "t": 10,
            "j": 11,
            "q": 12,
            "k": 13,
            "a": 14
        };

        if (card_value[card_input.charAt(0)] < card_value[card_input.charAt(1)]) {
            new_cards = card_input.charAt(1) + card_input.charAt(0) + card_input.charAt(2);
        }
        // console.log("checkCardOrder(" + card_input + "): " + new_cards);

        return new_cards;
    };

    var validateNumber = function(number_string) {
        /*
            
            number_string: string representing a number without any commas,
            periods, etc.

        */

        var numberRe = /[0-9]+/;
        var number_valid = numberRe.test(number_string);

        console.log("validateNumber(" + number_string + "): " + number_valid);

        return number_valid;
    };


    var validateCard = function(card_string) {
        // validate the card string. 

        // There are 3 different valid strings: one
        // of string length 1, of string lenght 2, and string lenght 3.

        // Examples:
        
        // length 1 (for a pair): 
        // a - pair of Aces
        // A - pair of Aces

        // length 2 (any single card):
        // js - Jack of Spades
        // Td = Ten of Diamonds

        // lenght 3 (non pairs - suited or non suited):
        // kas = ace, king suited
        // t5o = ten, five offsuited

        // hole cards: can uses all three parsers
        // non hole cards: can only uses the 2 length parser

        var card_valid = false;

        if (card_string.length == 1) {
            var oneCardRe = /[0-9akqjt]/;
            card_valid = oneCardRe.test(card_string);

        } else if (card_string.length == 2) {
            var twoCardRe = /[0-9akqjt][cdhs]/;
            card_valid = twoCardRe.test(card_string);


        } else if (card_string.length == 3) {
            var threeCardRe = /[0-9akqjt][0-9akqjt][so]/;
            card_valid = threeCardRe.test(card_string);

        }
        
        // console.log("card_valid: " + card_valid);

        return card_valid;
    };

        // if (card_str.length == 2) {
        //     // two card string parser:
        //     // console.log("I'm the two card parser!");
        //     twoCardRe = /[0-9akqjt][cdhs]/;
        //     parse_ok = twoCardRe.test(card_str);

        //     // if the card parsed ok then reformat the string for display
        //     if (parse_ok) {
        //         card_str_formated = card_str[0].toUpperCase() + card_str[1];
        //         $scope[input_model_tag] = card_str_formated;
        //     }

        // } else if (input_model_tag.includes("hole")) {

        //     if (card_str.length == 3) {
        //         // three card string parser:
        //         // console.log("I'm the three card parser!");
        //         threeCardRe = /[0-9akqjt][0-9akqjt][so]/;
        //         parse_ok = threeCardRe.test(card_str);

        //         // if the card parsed ok then reformat the string for display
        //         if (parse_ok) {
                    
        //             hole_card_1 = card_str[0].toUpperCase();
        //             hole_card_2 = card_str[1].toUpperCase();

        //             // sort the cards from lowest rank to hightest rank.
        //             var card_value = {
        //                 "2": 2,
        //                 "3": 3,
        //                 "4": 4,
        //                 "5": 5,
        //                 "6": 6,
        //                 "7": 7,
        //                 "8": 8,
        //                 "9": 9,
        //                 "T": 10,
        //                 "J": 11,
        //                 "Q": 12,
        //                 "K": 13,
        //                 "A": 14
        //             }

        //             if (card_value[hole_card_1] > card_value[hole_card_2]) {
        //                 var temp_hole_card_1 = hole_card_1
        //                 hole_card_1 = hole_card_2
        //                 hole_card_2 = temp_hole_card_1;
        //                 // hole_card_1, hole_card_2 = (hole_card_2, hole_card_1);
        //             } 
        //             card_str_formated =  hole_card_1 + hole_card_2 + card_str[2];
        //             $scope[input_model_tag] = card_str_formated;

        //         }

        //     } else if (card_str.length == 1) {
        //         // one card string parser:
        //         // console.log("I'm the one card parser!");
        //         oneCardRe = /[0-9akqjt]/;
        //         parse_ok = oneCardRe.test(card_str);

        //         // if the card parsed ok then reformat the string for display
        //         if (parse_ok) {
        //             card_str_formated = card_str.toUpperCase();
        //             $scope[input_model_tag] = card_str_formated;
        //         }

        //     } else {
        //         parse_ok = false;
            
        //     }

        //     // if hole cards pared OK then set the initial card odds:


        // } else {
        //     parse_ok = false;
        
        // }

        // console.log("parse_ok: " + parse_ok);




    // vm.parseCard = function(input_model_tag) {

    // 	// convert the card string to lower case and remove whitespace
    // 	card_str = $scope.$eval(input_model_tag).toLowerCase().trim();
    // 	console.log("card_str:" + card_str);

    // 	// validate the card string. 

    // 	// There are 3 different valid strings: one
    // 	// of string length 1, of string lenght 2, and string lenght 3.

    //     // Examples:
        
    //     // length 1 (for a pair): 
    //     // a - pair of Aces
    //     // A - pair of Aces

    //     // length 2 (any single card):
    //     // js - Jack of Spades
    //     // Td = Ten of Diamonds

    //     // lenght 3 (non pairs - suited or non suited):
    //     // kas = ace, king suited
    //     // t5o = ten, five offsuited

    // 	// hole cards: can uses all three parsers
    // 	// non hole cards: can only uses the 2 length parser

    // 	console.log("card_str.length: " + card_str.length);

    // 	if (card_str.length == 2) {
    // 		// two card string parser:
    // 		// console.log("I'm the two card parser!");
    // 		twoCardRe = /[0-9akqjt][cdhs]/;
    // 		parse_ok = twoCardRe.test(card_str);

    // 		// if the card parsed ok then reformat the string for display
    // 		if (parse_ok) {
    // 			card_str_formated = card_str[0].toUpperCase() + card_str[1];
    // 			$scope[input_model_tag] = card_str_formated;
    // 		}

    // 	} else if (input_model_tag.includes("hole")) {

    // 		if (card_str.length == 3) {
    // 			// three card string parser:
    // 			// console.log("I'm the three card parser!");
    // 			threeCardRe = /[0-9akqjt][0-9akqjt][so]/;
    // 			parse_ok = threeCardRe.test(card_str);

    // 			// if the card parsed ok then reformat the string for display
    // 			if (parse_ok) {
    				
    // 				hole_card_1 = card_str[0].toUpperCase();
    // 				hole_card_2 = card_str[1].toUpperCase();

    // 				// sort the cards from lowest rank to hightest rank.
    // 				var card_value = {
    // 					"2": 2,
    // 					"3": 3,
    // 					"4": 4,
    // 					"5": 5,
    // 					"6": 6,
    // 					"7": 7,
    // 					"8": 8,
    // 					"9": 9,
    // 					"T": 10,
    // 					"J": 11,
    // 					"Q": 12,
    // 					"K": 13,
    // 					"A": 14
    // 				}

    // 				if (card_value[hole_card_1] > card_value[hole_card_2]) {
    // 					var temp_hole_card_1 = hole_card_1
    // 					hole_card_1 = hole_card_2
    // 					hole_card_2 = temp_hole_card_1;
    // 					// hole_card_1, hole_card_2 = (hole_card_2, hole_card_1);
    // 				} 
    // 				card_str_formated =  hole_card_1 + hole_card_2 + card_str[2];
    // 				$scope[input_model_tag] = card_str_formated;

    // 			}

    // 		} else if (card_str.length == 1) {
    // 			// one card string parser:
    // 			// console.log("I'm the one card parser!");
    // 			oneCardRe = /[0-9akqjt]/;
    // 			parse_ok = oneCardRe.test(card_str);

    // 			// if the card parsed ok then reformat the string for display
    // 			if (parse_ok) {
    // 				card_str_formated = card_str.toUpperCase();
    // 				$scope[input_model_tag] = card_str_formated;
    // 			}

    // 		} else {
    // 			parse_ok = false;
    		
    // 		}

    // 		// if hole cards pared OK then set the initial card odds:


    // 	} else {
    // 		parse_ok = false;
    	
    // 	}

    // 	console.log("parse_ok: " + parse_ok);




    // };

    vm.setHoleOdds = function(input_model_tag) {
        console.log("input_model_tag: " + input_model_tag);
    	vm.holeOdds = holeOdds.holeCardOdds(vm.numberOfPlayers, $scope.$eval(input_model_tag));
        console.log(vm.holdOdds);
    };

    // vm.updateAnte = function() {
    	// vm.pot_ante = $scope.potAnte;
    	// console.log(vm.pot_ante);
    // }

    // vm.updatePot = function() {
    // 	vm.pot_total = $scope.potPot;
    // 	console.log(vm.pot_total);
    // }


    // $scope.playersNumberRadio = 3;

    // console.log(vm);
    // console.log($scope.playersNumberRadio);
    // Hey!
    // vm.locationData = locationData;

    // vm.onSubmit = function () {
    //   vm.formError = "";
    //   if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
    //     vm.formError = "All fields required, please try again";
    //     return false;
    //   } else {
    //     vm.doAddReview(vm.locationData.locationid, vm.formData);
    //   }
    // };

    // vm.doAddReview = function (locationid, formData) {
    //   loc8rData.addReviewById(locationid, {
    //     author : formData.name,
    //     rating : formData.rating,
    //     reviewText : formData.reviewText
    //   })
    //     .success(function (data) {
    //       vm.modal.close(data);
    //     })
    //     .error(function (data) {
    //       vm.formError = "Your review has not been saved, please try again";
    //     });
    //   return false;
    // };

    // vm.modal = {
    //   close : function (result) {
    //     $modalInstance.close(result);
    //   },
    //   cancel : function () {
    //     $modalInstance.dismiss('cancel');
    //   }
    // };

  }

})();



// 0992624040




