let totalVotes = localStorage.getItem("total-votes") || 0;

let cats;

$.get("https://latelier.co/data/cats.json?callback=?", function(data){
	cats = data.images;
	$.each( cats, function( _, val ) {
		nbVotes = localStorage.getItem(val.url) || 0;
		$( ".list" ).append( 
			`<figure id=${val.id}>
				<div><img src="${val.url}" alt="cat"></div>
				<figcaption>${nbVotes}${nbVotes < 2 ? ' vote' : ' votes'}</figcaption>
			</figure>` 
		);
		$( `#${val.id}` ).css("order", -nbVotes);
	});
});


function handleVote(src){
	totalVotes++;
	localStorage.setItem("total-votes", totalVotes);
	$('.total-votes').text(`${totalVotes}${totalVotes < 2 ? ' vote' : ' votes'}`);

	let votes = localStorage.getItem(src) || 0;
	localStorage.setItem(src, ++votes);
	
	const randomNumberLeft = Math.floor(Math.random() * 100);
	const newSrcLeft = cats[randomNumberLeft].url;
	$('.frame#left').empty().append(`<img src="${newSrcLeft}" alt="cat" onclick="handleVote(this.src)"></img>`);

	let randomNumberRight = Math.floor(Math.random() * 100);
	while (randomNumberRight === randomNumberLeft){
		randomNumberRight = Math.floor(Math.random() * 100);
	}
	const newSrcRight = cats[randomNumberRight].url;
	$('.frame#right').empty().append(`<img src="${newSrcRight}" alt="cat" onclick="handleVote(this.src)"></img>`);
}

$(document).ready(function(){
	$('.total-votes').text(`${totalVotes}${totalVotes < 2 ? ' vote' : ' votes'}`);	
});