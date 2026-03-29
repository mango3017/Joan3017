document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recycle-form');

    // List of recyclable e-plastic wastes (keywords)
    const recyclableWastes = [
        'pet', 'bottle', 'hdpe', 'container', 'milk jug', 'pp', 'cap', 'straw', 'abs', 'phone case',
        'keyboard', 'polycarbonate', 'cd case', 'laptop screen', 'electronics', 'casing', 'computer monitor',
        'printer', 'router', 'charger case', 'cable', 'insulation', 'wire', 'coating', 'laptop',
        'mouse', 'hard drive', 'circuit board', 'plastic', 'usb drive'
    ];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const wasteName = document.getElementById('waste-select').value;
        if (!wasteName) return; // Should not happen due to required
        let recyclable = false;
        for (let waste of recyclableWastes) {
            if (wasteName.toLowerCase().includes(waste)) {
                recyclable = true;
                break;
            }
        }
        // Redirect to result page
        window.location.href = `/result?waste=${encodeURIComponent(wasteName)}&recyclable=${recyclable}`;
    });
});