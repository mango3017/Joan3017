document.addEventListener('DOMContentLoaded', function() {
    const setLocationBtn = document.getElementById('set-location-btn');
    const getCurrentLocationBtn = document.getElementById('get-current-location-btn');
    const locationInput = document.getElementById('user-location');
    const resultContainer = document.getElementById('result-container');
    const locationError = document.getElementById('location-error');

    let userLocation = '';

    // Get params
    const urlParams = new URLSearchParams(window.location.search);
    const waste = urlParams.get('waste');
    const recyclable = urlParams.get('recyclable') === 'true';

    // Define recycling centers with addresses (using real locations in Bangalore)
    const recyclingCenters = [
        { name: 'E-Parisaraa E-Waste Recycling', address: 'No. 2, 1st Main Road, Peenya Industrial Area, Bangalore, Karnataka 560058', coords: '13.0827,77.4673' },
        { name: 'GreenSill E-Waste Solutions', address: 'No. 45, 2nd Floor, 1st Main Road, Rajajinagar, Bangalore, Karnataka 560010', coords: '13.0827,77.4673' },
        { name: 'E-Waste Recyclers India', address: 'Plot No. 12, KIADB Industrial Area, Whitefield, Bangalore, Karnataka 560066', coords: '12.9716,77.5946' }
    ];

    const hazardousFacilities = [
        { name: 'Bangalore City Corporation Waste Management', address: 'Corporation Circle, Bangalore, Karnataka 560002', coords: '12.9762,77.6033' },
        { name: 'Karnataka State Pollution Control Board', address: 'Parisara Bhavan, Church Street, Bangalore, Karnataka 560001', coords: '12.9758,77.6033' }
    ];

    if (waste) {
        let instructions = '';
        let centers = '';

        if (recyclable) {
            instructions = `
                <h3>Recycling Instructions:</h3>
                <ul>
                    <li>Clean the item thoroughly to remove any contaminants.</li>
                    <li>Separate from non-recyclable materials.</li>
                    <li>Take to a certified e-waste recycling center.</li>
                    <li>Avoid mixing with regular household waste.</li>
                </ul>
            `;
            centers = generateCentersList(recyclingCenters, 'Recycling Centers');
        } else {
            instructions = `
                <h3>Disposal Instructions:</h3>
                <ul>
                    <li>This item is not easily recyclable due to complex materials.</li>
                    <li>Consider donating if still functional.</li>
                    <li>For disposal, take to hazardous waste facility.</li>
                    <li>Avoid incineration or landfilling if possible.</li>
                </ul>
            `;
            centers = generateCentersList(hazardousFacilities, 'Hazardous Waste Facilities');
        }

        resultContainer.innerHTML = `
            <h2 class="result-title">Recyclability Result for "${waste}"</h2>
            <p>The waste is <span class="${recyclable ? 'recyclable' : 'not-recyclable'}">${recyclable ? 'Recyclable' : 'Not Recyclable'}</span>.</p>
            <div class="instructions">
                ${instructions}
            </div>
            <div class="examples">
                ${centers}
            </div>
            <a href="/recycle" class="back-btn">Check Another Item</a>
        `;
    }

    function generateCentersList(centers, title) {
        let html = `<h3>${title}:</h3>`;
        centers.forEach(center => {
            const destination = center.coords || center.address;
            const directionsUrl = userLocation ? 
                `https://www.google.com/maps/dir/${encodeURIComponent(userLocation)}/${encodeURIComponent(destination)}` :
                `https://www.google.com/maps/search/${encodeURIComponent(center.address)}`;
            html += `<p><strong>${center.name}:</strong> ${center.address}<br>
                <a href="${directionsUrl}" target="_blank" style="color:#2e86c1;">Get Directions</a></p>`;
        });
        html += `<p><em>${userLocation ? 'Directions are from your location.' : 'Set your location above to get directions.'}</em></p>`;
        return html;
    }

    setLocationBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        if (location) {
            locationError.style.display = 'none';
            userLocation = location;
            updateCenters();
        } else {
            locationError.textContent = 'Please enter a location';
            locationError.style.display = 'block';
        }
    });

    getCurrentLocationBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                userLocation = `${lat},${lng}`;
                locationInput.value = 'Current Location';
                locationError.style.display = 'none';
                updateCenters();
            }, function(error) {
                locationError.textContent = 'Unable to get current location. Please enter manually.';
                locationError.style.display = 'block';
            });
        } else {
            locationError.textContent = 'Geolocation is not supported by this browser.';
            locationError.style.display = 'block';
        }
    });

    function updateCenters() {
        if (waste) {
            const centers = recyclable ? generateCentersList(recyclingCenters, 'Recycling Centers') : generateCentersList(hazardousFacilities, 'Hazardous Waste Facilities');
            const examplesDiv = resultContainer.querySelector('.examples');
            if (examplesDiv) {
                examplesDiv.innerHTML = centers;
            }
        }
    }
});