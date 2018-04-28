import React from 'react';
import { connect } from 'dva';
import styles from './Index.less';
import logbg from '../assets/login/logbg.png'


function IndexPage() {
  return(
      <div className={styles.normal}>
          
        </div>

    );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
