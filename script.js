angular.module("quoteModule", [])

angular.module("quoteModule").controller("quoteController",["$scope", "$window", "$anchorScroll","$location", function($scope,$window,$anchorScroll,$location){

	var Quote = function (text,author,rating,username,permaIndex) {
		this.text       = text
		this.author     = author
		this.rating     = rating || ""
		this.username   = username || ""
		this.stars      = this.starify()
	}

	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// starify method on an object in quotes array
	// will return an array with the same number
	// of stars as the rating number
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	Quote.prototype.starify = function(quote){
		var starsArray = [""," ","  ","   ","    "];
		starsArray = starsArray.filter(function(element,index){
			if(index<this.rating){
				return true
			}
		},this)
		return starsArray
	}

	// -=-=-=-=-=-=-=-=-=
	// end starify method
	// -=-=-=-=-=-=-=-=-=



	var default1 = new Quote("Vanity and pride are different things, though the words are often used synonymously. A person may be proud without being vain. Pride relates more to our opinion of ourselves; vanity, to what we would have others think of us.","Jane Austen",5)
	var default2 = new Quote("There is nothing like staying at home for real comfort.","Jane Austen",3)
	var default3 = new Quote("If I loved you less, I might be able to talk about it more.","Jane Austen",4)
	var default4 = new Quote("I do not want people to be very agreeable, as it saves me the trouble of liking them a great deal.","Jane Austen",5)
	var default5 = new Quote("One does not love a place the less for having suffered in it, unless it has been all suffering, nothing but suffering.","Jane Austen",5)
	var default6 = new Quote("The smallest minority on earth is the individual. Those who deny individual rights cannot claim to be defenders of minorities.","Ayn Rand",4)
	var default7 = new Quote("The question isn't who is going to let me; it's who is going to stop me.","Ayn Rand",5)
	var default8 = new Quote("To say 'I love you' one must first be able to say the 'I'.","Ayn Rand",2)
	var default9 = new Quote("I guess when you turn off the main road, you have to be prepared to see some funny houses.","Stephen King",2)
	var default10 = new Quote("No, it's not a very good story - its author was too busy listening to other voices to listen as closely as he should have to the one coming from inside.","Stephen King",4)
	var default11 = new Quote("Why is the Internet such a mess?","Raphael",5)

	$scope.quotes = [default1,default2,default3,default4,default5,default6,default7,default8,default9,default10,default11]

	$scope.quotes = $scope.quotes.sort(function(a,b){
		if(a.rating > b.rating){
			return -1;
		}
		else{
			return 1;
		}
	})

	// -=-=-=-=-
	// ADD QUOTE
	// -=-=-=-=-

	$scope.addQuoteForm = function ( $event ) {
		$scope.formShown = true;
		$scope.randomShown = false;
		$scope.authorShow = false;
	}

	$scope.closeForm = function ( $event ) {
		$scope.formShown = false;
		$scope.hideHomepage = false;
	}

	// 	-=-=-=-=-=-=-=-=-
	// VIEW RANDOM QUOTE
	// -=-=-=-=-=-=-=-=-

	$scope.viewRandom = function ( $event ){

		$scope.randomShown = true;
		$scope.formShown = false;
		$scope.authorShow = false;
		$scope.randomIndex = $scope.quotes.length;
		$scope.randomIndex = Math.floor($scope.randomIndex*Math.random());
		$scope.random = [];
		$scope.random.push($scope.quotes[$scope.randomIndex]);
		$index = $scope.randomIndex
	}

	$scope.closeRandom = function ( $event ){
		$scope.randomShown = false;
	}


	// -=-=-=-=-=-=-=
	// SUBMIT QUOTE
	// -=-=-=-=-=-=-=

	$scope.submitQuote = function ( ) {
		$scope.formShown = false;
		var newQuote = new Quote($scope.text,$scope.author,$scope.rating,$scope.username)
		$scope.quotes.push(newQuote)
		$scope.text = "";
		$scope.author = "";
		$scope.username = "";
		$scope.rating = "";
		$scope.hideHomepage = false;
		$scope.authorShow = false;
		$scope.quotes = $scope.quotes.sort(function(a,b){
			if(a.rating > b.rating){
				return -1;
			}
			else{
				return 1;
			}
		})
	}


	// -=-=-=-=-=-=-=-=
	// DELETE QUOTE
	// -=-=-=-=-=-=-=-=

	var lengthCheck = function(){
		if($scope.quotes.length === 0 ){
			$scope.formShown = true;
		}
	}

	var deletedQuotes = [];

	$scope.deleteAuthorQuote = function($index){
		var author = $scope.authorList[$index].author
		var index = $scope.authorIndex[$index];
		$scope.deleteQuote(index);
		$scope.authorShow = false;
		if($scope.authorList.length>1){
			$scope.authorList = $scope.quotes.filter(function(element,index,array){
				if(element.author === author ){
					$scope.authorIndex.push(index);
					return true
				}
		$scope.authorShow = true
			})
		}
		lengthCheck()
	}

	$scope.deleteRandomQuote = function($index){
		$scope.randomShown = false;
		$index = $scope.randomIndex;
		$scope.deleteQuote($index);
		$scope.quotes = $scope.quotes.sort(function(a,b){
		if(a.rating > b.rating){
			return -1;
		}
		else{
			return 1;
		}
	})
		lengthCheck()
	}

	$scope.deleteQuote = function ($index) {
		deletedQuotes.push($scope.quotes[$index]);
		$scope.quotes.splice($index,1);
		lengthCheck()
	}

	$scope.undoDelete = function ( ) {
		if(deletedQuotes.length>0){
		$scope.quotes.push(deletedQuotes[deletedQuotes.length-1]);
		deletedQuotes.pop();
		$scope.quotes = $scope.quotes.sort(function(a,b){
		if(a.rating > b.rating){
			return -1;
		}
		else{
			return 1;
		}
	})
		}
	}

	// -=-=-=-=-=-=-=-=
	// VIEW BY AUTHOR
	// -=-=-=-=-=-=-=-=

	$scope.openAuthorRandom = function ($index){
		$index = $scope.randomIndex
		$scope.openAuthor($index)
	}

	$scope.openAuthor = function ($index,id) {
		$scope.authorIndex=[];
		$location.hash(id);
		$anchorScroll();
		$scope.authorShow = true;
		$scope.formShown = false;
		$scope.randomShown = false;
		$scope.author = $scope.quotes[$index].author;
		$scope.authorList = $scope.quotes.filter(function(element,index,array){
			if(element.author === array[$index].author ){
				$scope.authorIndex.push(index);
				return true
			}
		})
	}

	$scope.closeAuthor = function () {
		$scope.authorShow = false;
	}


// -=-=-=-=-=-=-=-=-=
// STAR RATING SYSTEM
// -=-=-=-=-=-=-=-=-=

	$scope.idleStars = [""," ","  ","   ","    "];

	$scope.showStars = function ($index){
		$scope.newRating = $index + 1
	}

$scope.rateQuote = function ($index){
	$scope.ratingBox = !$scope.ratingBox
	console.log($index)
}
	
$scope.submitRating = function($index){
	$scope.ratingBox = false;
}

// -=-=-=-=-=-=-=-=-=
// END RATE ME BUTTON
// -=-=-=-=-=-=-=-=-=

}])