let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () => {
	navbar.classList.toggle('active');
	loginForm.classList.remove('active');
}


window.onscroll = () => {
	navbar.classList.remove('active');
	loginForm.classList.remove('active');
}

var swiper = new Swiper('.review-slider', {
	spaceBetween: 20,
	centeredSliders: true,
	grabCursor: true,
	autoplay: {
		delay: 7500,
		disableOnInteraction: false,
	},
	loop: true,
	breakpoints: {
		0: {
			slidesPerView: 1,
		},

		768: {
			slidesPerView: 2,
		},
		
		991: {
			slidesPerView: 3
		}
	}
})

document.getElementById('floating-message-icon').addEventListener('click', function(event) {
    event.preventDefault(); 
    window.location.href = "supp.html";
});

