import React from 'react';
import axios from "axios";
import App from '../components/app';

const AppContainer = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios.get('/api')
            .then((response) => setData(response.data.message));
    }, []);
    console.log(data);
    return (
        <App/>
    );
}

export default AppContainer;