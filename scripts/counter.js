// Counter application functionality
document.addEventListener('DOMContentLoaded', function() {
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    const historyList = document.getElementById('history-list');
    
    let count = 0;
    let history = [];
    
    // Initialize counter
    updateCounter();
    
    // Event listeners
    incrementBtn.addEventListener('click', increment);
    decrementBtn.addEventListener('click', decrement);
    resetBtn.addEventListener('click', reset);
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === '+') {
            increment();
        } else if (e.key === 'ArrowDown' || e.key === '-') {
            decrement();
        } else if (e.key === 'r' || e.key === 'R') {
            reset();
        }
    });
    
    // Counter functions
    function increment() {
        count++;
        updateCounter();
        addToHistory('increment');
        updateButtonStates();
    }
    
    function decrement() {
        if (count > 0) {
            count--;
            updateCounter();
            addToHistory('decrement');
            updateButtonStates();
        }
    }
    
    function reset() {
        if (count !== 0) {
            count = 0;
            updateCounter();
            addToHistory('reset');
            updateButtonStates();
        }
    }
    
    function updateCounter() {
        counterValue.textContent = count;
        
        // Add animation effect
        counterValue.style.transform = 'scale(1.1)';
        setTimeout(() => {
            counterValue.style.transform = 'scale(1)';
        }, 150);
    }
    
    function updateButtonStates() {
        // Disable decrement button if count is 0
        if (count === 0) {
            decrementBtn.disabled = true;
        } else {
            decrementBtn.disabled = false;
        }
        
        // Disable reset button if count is already 0
        if (count === 0) {
            resetBtn.disabled = true;
        } else {
            resetBtn.disabled = false;
        }
    }
    
    function addToHistory(action) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        
        let actionText = '';
        switch(action) {
            case 'increment':
                actionText = 'Increased by 1';
                break;
            case 'decrement':
                actionText = 'Decreased by 1';
                break;
            case 'reset':
                actionText = 'Reset to 0';
                break;
        }
        
        // Add to history array
        history.unshift({
            action: actionText,
            value: count,
            time: timeString
        });
        
        // Keep only last 10 items
        if (history.length > 10) {
            history.pop();
        }
        
        updateHistoryDisplay();
    }
    
    function updateHistoryDisplay() {
        // Clear current history
        historyList.innerHTML = '';
        
        // Add history items
        history.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="history-action">${item.action}</span>
                <span class="history-value">${item.value}</span>
                <span class="history-time">${item.time}</span>
            `;
            historyList.appendChild(li);
        });
    }
    
    // Initialize button states
    updateButtonStates();
});