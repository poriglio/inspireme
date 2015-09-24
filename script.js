angular.module("quoteModule", [])

angular.module("quoteModule").controller("quoteController",["$scope", "$window", function($scope,$window){

	var Quote = function (text,author,rating,username) {
		this.text = text;
		this.author = author;
		this.rating = rating || "";
		this.username = username || "";
	}

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

		
	// $scope.quotes = [default1,default2,default3,default4,default5,default6,default7,default8,default9,default10,default11]

	$scope.quotesUnsorted = [default1,default2,default3,default4,default5,default6,default7,default8,default9,default10,default11]

	$scope.quotes = [default1,default2,default3,default4,default5,default6,default7,default8,default9,default10,default11]

	$scope.quotesSorted = $scope.quotes.sort(function(a,b){
		if(a.rating > b.rating){
			return -1;
		}
		else{
			return 1;
		}
	})

	$scope.addQuoteForm = function ( $event ) {
		$scope.formShown = true;
		$scope.randomShown = false;
	}

	$scope.closeForm = function ( $event ) {
		$scope.formShown = false;
		$scope.hideHomepage = false;
	}

	$scope.viewRandom = function ( $event ){

		$scope.randomShown = true;
		var randomIndex = $scope.quotes.length;
		randomIndex = Math.floor(randomIndex*Math.random());
		$scope.random = []
		$scope.random.push($scope.quotes[randomIndex])
		$scope.formShown = false;
		$scope.authorShow = false;
	}

	$scope.closeRandom = function ( $event ){
		$scope.randomShown = false;
	}


	$scope.submitQuote = function ( ) {
		$scope.formShown = false;
		var newQuote = new Quote($scope.text,$scope.author,"0",$scope.username)
		$scope.quotes.push(newQuote)
		$scope.text = "";
		$scope.author = "";
		$scope.username = "";
		$scope.hideHomepage = false;
		$scope.authorShow = false;
	}

	var deletedQuotes = [];

	$scope.deleteQuote = function ($index) {
		deletedQuotes.push($scope.quotes[$index]);
		$scope.quotes.splice($index,1);
	}

	$scope.undoDelete = function ( ) {
		if(deletedQuotes.length>0){
		$scope.quotes.push(deletedQuotes[deletedQuotes.length-1]);
		deletedQuotes.pop();
		}
	}

	$scope.openAuthor = function ($index) {
		$scope.author = $scope.quotes[$index].author;
		$scope.authorList = $scope.quotes.filter(function(element,index,array){
			if(element.author === array[$index].author ){
				return true
			}
		}) 
		console.log($scope.authorList)
		$scope.authorShow = true;
		$scope.formShown = false;
		$scope.randomShown = false;
	}

	$scope.closeAuthor = function () {
		$scope.authorShow = false;
	}

	$scope.idleStars = [""," ","  ","   ","    "];

	$scope.showStars = function ($index){
			$scope.activeStars = [""," ","  ","   ","    "];
			$scope.activeStars = $scope.activeStars.filter(function(element,index){
				if($index >= index){
					return true
				}
			})
			$scope.starsShown = true;		
	}

	// console.log($window.innerHeight)
	// console.log($window.innerWidth)

	// 	$scope.$watch(function(){return $window.innerWidth / $window.innerHeight},function(){
	// 	$scope.ratio = $window.innerWidth / $window.innerHeight
	// 	console.log($scope.ratio)
	// 	if($scope.ratio > 1.6175){
	// 		$scope.backgroundSize = "set-to-width";
	// 	}
	// 	else if($scope.ratio < 1.6175){
	// 		$scope.backgroundSize = "set-to-height";
	// 	}
	// })




}])