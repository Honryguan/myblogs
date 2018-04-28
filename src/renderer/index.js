import dva from 'dva';
import './index.css';
import './index.html';

import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';

// 1. Initialize
const app = dva();
//console.info(app);
app.model(require("./models/app"));


// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
