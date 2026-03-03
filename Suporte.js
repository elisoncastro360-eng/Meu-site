function initSupport() {
    const select = document.getElementById('region-select');
    const regionDisplay = document.getElementById('region-display');
    
    const timeZones = Intl.supportedValuesOf('timeZone');
    const userDefaultZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    timeZones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone;
        option.text = zone.replace(/\//g, ' - ').replace(/_/g, ' ');
        if (zone === userDefaultZone) option.selected = true;
        select.appendChild(option);
    });

    function updateClock() {
        const selectedZone = select.value;
        regionDisplay.innerText = `Horário em: ${selectedZone.split('/').pop().replace('_', ' ')}`;

        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: selectedZone,
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
        });
        
        const parts = formatter.formatToParts(now);
        const hours = parseInt(parts.find(p => p.type === 'hour').value);
        const minutes = parseInt(parts.find(p => p.type === 'minute').value);
        const seconds = parseInt(parts.find(p => p.type === 'second').value);

        const currentMinutes = (hours * 60) + minutes;
        const openTime = (7 * 60) + 30; // 07:30
        const closeTime = (22 * 60);    // 22:00

        const statusText = document.getElementById('status-text');
        const statusDot = document.getElementById('status-dot');
        const countdownTxt = document.getElementById('countdown');

        let targetMinutes;
        let isOpen = currentMinutes >= openTime && currentMinutes < closeTime;

        if (isOpen) {
            statusText.innerText = "SUPORTE ABERTO";
            statusDot.className = "open";
            targetMinutes = closeTime;
        } else {
            statusText.innerText = "SUPORTE FECHADO";
            statusDot.className = "closed";
            
            if (currentMinutes >= closeTime) {
                targetMinutes = openTime + (24 * 60);
            } else {
                targetMinutes = openTime;
            }
        }

        let totalSecondsNow = (currentMinutes * 60) + seconds;
        let totalSecondsTarget = targetMinutes * 60;
        let diff = totalSecondsTarget - totalSecondsNow;

        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;

        countdownTxt.innerText = 
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    select.addEventListener('change', updateClock);
    setInterval(updateClock, 1000);
    updateClock();
}

document.addEventListener('DOMContentLoaded', initSupport);
          
