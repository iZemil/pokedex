import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, onError } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import Root from 'components/Root';
import stores from 'stores';

import 'theme/base.less';

const isDevelopment = process.env.NODE_ENV !== 'production';

function App() {
    if (isDevelopment) {
        onError(error => {
            console.error(error);
        });
    }

    return (
        <Provider {...stores}>
            {/* {isDevelopment && <DevTools />} */}
            <Root />
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
