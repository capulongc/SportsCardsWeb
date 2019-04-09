window.onload = function(){

	var x = document.getElementById('login');
	x.addEventListener('click', function(){
		document.querySelector('.modalLogin').style.display = "flex";
	});

	document.querySelector('.close').addEventListener("click", function() {
		document.querySelector('.modalLogin').style.display = "none";
	});

	var y = document.getElementById('sign-up');
	y.addEventListener('click', function(){
		document.querySelector('.modalLogin').style.display = "none";
		document.querySelector('.modalSignUp').style.display = "flex";
	});

	document.querySelector('.close-signUp').addEventListener("click", function() {
		document.querySelector('.modalSignUp').style.display = "none";
	});

}
