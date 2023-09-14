let totalVotes = sessionStorage.getItem("total-votes") || 0;

let cats;

$.get("https://latelier.co/data/cats.json?callback=?", function(data){
	cats = data.images;
	$.each( cats, function( _, val ) {
		nbVotes = sessionStorage.getItem(val.url) || 0;
		$( ".list" ).append( 
			`<figure id=${val.id}>
				<div><img src="${val.url}" alt="cat"></div>
				<figcaption>${nbVotes}${nbVotes < 2 ? ' vote' : ' votes'}</figcaption>
			</figure>` 
		);
		$( `#${val.id}` ).css("order", -nbVotes);
	});
});

$(document).ready(function(){
	$('.total-votes').text(`${totalVotes}${totalVotes < 2 ? ' vote' : ' votes'}`);	
});