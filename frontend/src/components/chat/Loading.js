import React from 'react';
import loadingIcons from '../../assets/icons/loading.gif';

function Loading() {
  return (
    <div style={{ backgroundColor:'#f7f7fa' }}>
        <img src={loadingIcons} alt="로딩중" width="5%" />
    </div>
  );
}

export default Loading;