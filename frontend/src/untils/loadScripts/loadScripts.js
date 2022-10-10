export const loadScript = () => {
    new Promise((resolve, reject) => {
        let ready = false;
        const script = document.createElement('script');
        script.src = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js';
        script.async = true;
        document.head.appendChild(script);

        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css';
        document.head.appendChild(style);

        const IconMarkupStyle = document.createElement('link');
        IconMarkupStyle.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css';
        IconMarkupStyle.type = 'css';
        IconMarkupStyle.rel = 'stylesheet';
        document.head.appendChild(IconMarkupStyle);

        const TransformationStyle = document.createElement('link');
        TransformationStyle.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css';
        TransformationStyle.type = 'css';
        TransformationStyle.rel = 'stylesheet';
        document.head.appendChild(TransformationStyle);

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
