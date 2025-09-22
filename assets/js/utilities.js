const footerYear = new Date().getFullYear()
document.getElementById('footer-year').innerHTML = footerYear

Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

function dateFormatter(input) {
	const newDate = new Date(input);
	const listOfMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const listOfDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	return `${listOfDay[newDate.getDay()]}, ${newDate.getDate()} ${listOfMonth[newDate.getMonth()]} ${newDate.getFullYear()}`;
}

function dateFormatterYMD(input) {
	const newDate = new Date(input);

	return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
}


function setValueToElement(id, val) {
	document.getElementById(id).innerHTML = val
}

function display(id, val) {
	document.getElementById(id).style.display = val;
}

function removeClassElement(id, className) {
	document.getElementById(id).classList.remove(className);
}

function currencyFormatter(input) {
	const formatter = new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR'
		})
		.format(input).replace(/\D00$/, '')

	return formatter
}

function handleErrors(error) {
	console.error(error);
}

function notification(status, header, msg){
	Swal.fire(
		header,
		msg,
		status
	  )
  }