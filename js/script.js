let totalVotes = sessionStorage.getItem("total-votes") || 0;

$(document).ready(function(){
	$('.total-votes').text(`${totalVotes}${totalVotes < 2 ? ' vote' : ' votes'}`);	
});