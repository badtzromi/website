const calendarGrid = document.getElementById('calendarGrid');
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // 0-11, where 11 is December
const currentDay = today.getDate();

// Create calendar days for December 15-25
for (let day = 15; day <= 25; day++) {
  const dayElement = document.createElement('a');
  dayElement.className = 'calendar-day';
  dayElement.textContent = day;
  
  // Create date object for this calendar day (December of current year)
  const calendarDate = new Date(currentYear, 11, day); // 11 = December
  
  // Check if this day is today or in the past
  const isPastOrToday = calendarDate <= today;
  
  if (isPastOrToday) {
    dayElement.href = `../days/dec${day}/dec${day}.html`;
    
    // Highlight today
    if (currentMonth === 11 && currentDay === day) {
      dayElement.classList.add('active');
    }
  } else {
    dayElement.classList.add('disabled');
    dayElement.href = '#';
    dayElement.addEventListener('click', (e) => {
      e.preventDefault();
    });
  }
  
  calendarGrid.appendChild(dayElement);
}

