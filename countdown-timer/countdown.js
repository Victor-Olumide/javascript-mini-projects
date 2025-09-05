document.addEventListener('DOMContentLoaded', function () {
	const input = document.querySelector('input[type="datetime-local"]')
	const button = document.getElementById('startStop')
	const spans = document.querySelectorAll('section div span:last-child')
    const alertH2 = document.querySelector('article h2')

	let intervalId = null
	let running = false
	let targetDate = null

	function updateDisplay(days, hours, minutes, seconds) {
		spans[0].textContent = String(days).padStart(2, '0')
		spans[1].textContent = String(hours).padStart(2, '0')
		spans[2].textContent = String(minutes).padStart(2, '0')
		spans[3].textContent = String(seconds).padStart(2, '0')
	}

	function startCountdown() {
		if (intervalId) clearInterval(intervalId)
		alertH2.textContent = 'Countdown running...'
		intervalId = setInterval(() => {
			const difference = targetDate - new Date()

			if (difference <= 0) {
				clearInterval(intervalId)
				running = false
				button.textContent = 'Start'
				updateDisplay(0, 0, 0, 0)
				alert('Countdown complete!')
				alertH2.textContent = 'Waiting for input...'
				return
			}

			const days = Math.floor(difference / (1000 * 60 * 60 * 24))
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
			const minutes = Math.floor((difference / (1000 * 60)) % 60)
			const seconds = Math.floor((difference / 1000) % 60)
			updateDisplay(days, hours, minutes, seconds)
		}, 1000)
	}

	button.addEventListener('click', function () {
		if (!running) {
			const value = input.value
			if (!value) {
				alert('Please select a date and time.')
				return
			}

			targetDate = new Date(value)

			if (isNaN(targetDate.getTime()) || targetDate <= new Date()) {
				alert('Please select a valid future date and time.')
				return
			}

			running = true
			button.textContent = 'Stop'
			startCountdown()
		} else {
			clearInterval(intervalId)
			running = false
			button.textContent = 'Start'
            alertH2.textContent = 'Countdown stopped'
		}
	})
})
