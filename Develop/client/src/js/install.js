const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;


// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    
    // Stash the event so it can be triggered later
     deferredPrompt = event;

     // Show the install button
    butInstall.style.display = 'block';

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show  installation prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        // Reset the deferred prompt variable
        deferredPrompt = null;
        // Hide the install button
        butInstall.style.display = 'none';
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed');
});
