window.addEventListener('load', () => {
    const firebaseConfig = {
        apiKey: 'AIzaSyAWWJuFcZUa3T--t48yIejsD2uDE6DIsJ8',
        authDomain: 'design-dictionary.firebaseapp.com',
        databaseURL: 'https://design-dictionary.firebaseio.com',
        projectId: 'design-dictionary',
        storageBucket: '',
        messagingSenderId: '553905655626',
        appId: '1:553905655626:web:e3e30ffe55bae628'
    };

    activateLoading();
        
    firebase.initializeApp(firebaseConfig);

    firebase.database().ref('stats/visits').once('value').then((snapshot) => {
        firebase.database().ref('stats/visits').set({
            counter: snapshot.val().counter + 1
        });
    });

    firebase.database().ref('colors').once('value').then((snapshot) => {
        const colors = snapshot.val();

        for (let i = 0; i < colors.length; i++) {
            const contentwrapper = document.getElementById('colorsWrapper');
            const newColor = document.createElement('div');
            const input = document.createElement('input');

            newColor.setAttribute('class', 'color');
            newColor.setAttribute('id', `text${i}`);
            newColor.style.background = colors[i].code;

            input.value = colors[i].code;
            input.readOnly = true;

            newColor.addEventListener('click', () => {
                input.select();
                document.execCommand('copy');
                newColor.classList.add('animate');

                setTimeout(() => {
                    newColor.classList.remove('animate');
                }, 750);

                firebase.database().ref('stats/copies').once('value').then((snapshot) => {
                    firebase.database().ref('stats/copies').set({
                        counter: snapshot.val().counter + 1
                    });
                });
            });

            newColor.appendChild(input);
            contentwrapper.appendChild(newColor);
        }

        deActivateLoading();
    });

    function activateLoading() {
        document.getElementById('loader').classList.remove('hide');
    }
    
    function deActivateLoading() {
        document.getElementById('loader').classList.add('hide');
    }
});