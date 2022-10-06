export const loadScript = () => {
    new Promise((resolve, reject) => {
        let ready = false;
        const script = document.createElement('script');
        script.src = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js';
        script.async = true;
        document.body.appendChild(script);

        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css';
        document.body.appendChild(style);

        script.onload = () => {
            if (!ready) {
                ready = true;
                resolve(script);
            }
        };

        script.onerror = (err) => {
            console.log(err);
            reject(new Error('Error loading Forge script!'));
        };

        script.onabort = (err) => {
            console.log(err);
            reject(new Error('Forge script loading aborted.'));
        };
    });
};
