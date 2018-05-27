var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping');
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log("connection to db open")
});*/



var products = [
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
		title: 'Gothic Video Game',
		description: 'Awesome Game!!!',
		price: 11
	}),
	new Product({
		imagePath: 'https://i.pinimg.com/736x/8d/69/7a/8d697a3c5dc9047d484c968512c1fdb6--game-poster-wii-games.jpg',
		title: 'Post Wii Game',
		description: 'Good Game!!!',
		price: 10
	}),
	new Product({
		imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhoKrAA9S-DbW8KCx7en0yIRYj9Oo1_vWS_Ja61WaOSazm1bTebQ',
		title: 'Interesting Video Game',
		description: 'Excellent Game!!!',
		price: 16
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Burnout_%28video_game%29.jpg/220px-Burnout_%28video_game%29.jpg',
		title: 'Test New Game',
		description: 'Puzzle Game!!!',
		price: 23
	})
];

var done = 0;
for (var i = 0; i < products.length; i++) {
	products[i].save(function(err, result){
		console.log(i);
		done++;
		if(done === products.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}