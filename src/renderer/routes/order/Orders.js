import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import OrdersList from '../../components/orders/List';
import OrdersModel from '../../components/orders/Modal';
import OrdersSearch from '../../components/orders/Search'
import styles from './Orders.css';

function Orders({app, location, dispatch, orders }) {
  const { loading, list, pagination, currentItem, modalVisible, modalType } = orders;
  const { field, keyword } = location.query;
  const {loginUser}=app;
  console.info(loginUser);

  const orderModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      debugger;
        dispatch({
            type: `orders/${modalType}`,
            payload: data
        });
    },
    onCancel () {
        dispatch({
            type: 'orders/hideModal'
        });
    }
  };

  const orderListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    onPageChange (pagination, filters, sorter) {
        var skipCount = (pagination.current - 1)*pagination.pageSize;
        dispatch({
          type: 'orders/query',
          payload: {
            shippingOrderQuery: {
              pageSize: pagination.pageSize, 
              skipCount: skipCount, 
              order: sorter.order,
              orderBy: sorter.field,
              ...filters,
            }
          }  
        });
    },
    onDeleteItem (id) {
        dispatch({
            type: 'orders/delete',
            payload: id
        });
    },
    onEditItem (item) {
        dispatch({
            type: 'orders/showModal',
            payload: {
                modalType: 'update',
                currentItem: item
            }
        });
    }
  };

  const orderSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      dispatch({
        type: 'orders/query',
        payload: fieldsValue
      });
    },
    onAdd () {
      dispatch({
        type: 'orders/showModal',
        payload: {
          modalType: 'create'
        }
      });
    }
  };

  return (
    <div className={styles.normal}>
      <OrdersSearch {...orderSearchProps} />
      <OrdersList {...orderListProps} />
      <OrdersModel {...orderModalProps} />
    </div>
  );
}

Orders.propTypes = {
  orders: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ orders,app }) {
  return { orders,app };
}

export default connect(mapStateToProps)(Orders);
