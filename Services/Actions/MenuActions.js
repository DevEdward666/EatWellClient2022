import * as signalR from "@microsoft/signalr";
import {
  GET_MENU,
  SET_SEARCHMOREMENU,
  GET_CATEGORY,
  SET_CATEGORY,
  SET_QUANTITY,
  ADD_TO_CART,
  SET_MODIFIED_QUANTITY,
  REMOVE_MENU,
  SET_QR_USER,
  GET_LOG_DETAILS,
  GET_LOG_MAST,
  SELECTED_LOG,
  SET_REFRESH,
  SET_REFRESH_MENU,
  SET_SUBTOTAL,
  ONSCROLL,
} from "../Types/MenuTypes";
import { BASE_URL, REQUEST_CALLBACK } from "../Types/DefaultTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
var RNFS = require("react-native-fs");
export const action_get_allmenu =
  (offset, searchdesc, searchcateg) => async (dispatch) => {
    const value = await AsyncStorage.getItem("cashier_tokenizer");
    const bearer_token = value;
    const bearer = "Bearer " + bearer_token;
    var url = `${BASE_URL}/api/menu/getmenu`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offset: offset,
        category: searchcateg,
        description: searchdesc,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_MENU,
          payload: { data: res.data, success: true },
        });
      });
  };

export const action_get_getLogsDetails =
  (orderno, username, offset, status) => async (dispatch) => {
    const value = await AsyncStorage.getItem("cashier_tokenizer");
    const bearer_token = value;
    const bearer = "Bearer " + bearer_token;
    var url = `${BASE_URL}/api/menu/getLogsDetails`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        offset: offset,
        status: status,
        orderno: orderno,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_LOG_DETAILS,
          payload: { data: res.data, message: res.message, loaded: true },
        });
      });
  };
export const action_get_getLogsMast = (username) => async (dispatch) => {
  const value = await AsyncStorage.getItem("cashier_tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  var url = `${BASE_URL}/api/menu/getLogsMast`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_LOG_MAST,
        payload: { data: res.data, loaded: true },
      });
    });
};

export const action_get_getcategory = () => async (dispatch) => {
  const value = await AsyncStorage.getItem("cashier_tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  var url = `${BASE_URL}/api/menu/getcategory`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_CATEGORY,
        payload: { data: res.data, success: true },
      });
    });
};

export const action_place_order =
  (customer, totalcost, insertorderdtls) => async (dispatch) => {
    const value = await AsyncStorage.getItem("cashier_tokenizer");
    const bearer_token = value;
    const bearer = "Bearer " + bearer_token;
    var url = `${BASE_URL}/api/menu/InserNewOrder`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: customer,
        totalcost: totalcost,
        insertorderdtls: insertorderdtls,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        dispatch({
          type: SET_QR_USER,
          payload: {
            qrbase64: res.data,
            orderno: res.otherdata,
            loaded: true,
          },
        });
   
      });
  };
export const send_notif=(orderno)=>async(dispatch)=>{

  var url2 = `${BASE_URL}/api/default/gettokens`;
  await fetch(url2, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      let formdata = new FormData();
      formdata.append("title", `New Order ${orderno}`);
      formdata.append("body", `New Order with a order no. ${orderno}`);
      formdata.append("isAndroiodDevice", true);
      res?.data.map((f) => {
        formdata.append("deviceId", f?.token);
      });
      var url3 = `${BASE_URL}/api/notification/sendnotiftoeatwelladmin`;
      await fetch(url3, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((res) => {
  
          if (res?.success) {
            dispatch({
              type: REQUEST_CALLBACK,
              payload: { message: res?.message, success: res?.success },
            });
          } else {
            dispatch({
              type: REQUEST_CALLBACK,
              payload: { message: res?.message, success: res?.success },
            });
          }
        });
    });
}
export const action_reset_cart = () => async (dispatch) => {
  dispatch({
    type: SET_QR_USER,
    payload: {
      qrbase64: "",
      orderno: "",
      loaded: false,
    },
  });
  dispatch({
    type: ADD_TO_CART,
    payload: [],
  });
};
export const action_set_refresh_menu = (refresh) => async (dispatch) => {
  dispatch({
    type: SET_REFRESH_MENU,
    payload: refresh,
  });
};
export const action_set_refresh = (refresh) => async (dispatch) => {
  dispatch({
    type: SET_REFRESH,
    payload: refresh,
  });
};
export const action_set_scroll = (scroll) => async (dispatch) => {
  dispatch({
    type: ONSCROLL,
    payload: scroll,
  });
};
export const action_selected_log = (orderno) => async (dispatch) => {
  const value = await AsyncStorage.getItem("cashier_tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  console.log(orderno);
  var url = `${BASE_URL}/api/menu/loadLogMast`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderno: orderno,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SELECTED_LOG,
        payload: res?.data,
      });
    });
};
export const action_searchmenu = (search) => async (dispatch) => {
  dispatch({
    type: SET_SEARCHMOREMENU,
    payload: search,
  });
};
export const action_set_category = (category) => async (dispatch) => {
  dispatch({
    type: SET_CATEGORY,
    payload: category,
  });
};
export const action_set_quantity = (quantity) => async (dispatch) => {
  dispatch({
    type: SET_QUANTITY,
    payload: quantity,
  });
};
export const action_set_modifiedquantity = (quantity) => async (dispatch) => {
  dispatch({
    type: SET_MODIFIED_QUANTITY,
    payload: quantity,
  });
};
export const action_add_cart = (cart) => async (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: cart,
  });
};
export const action_remove_item = (remove, id) => async (dispatch) => {
  dispatch({
    type: REMOVE_MENU,
    payload: { remove: remove, id: id },
  });
};
export const action_set_subtotal = (total) => async (dispatch) => {
  dispatch({
    type: SET_SUBTOTAL,
    payload: { total: total },
  });
};

export const action_save_qr = (Base64, name) => async () => {
  // const paths = `${RNFetchBlob.fs.dirs.DCIMDir}/${new Date().getTime()}.jpg`; // where u need to put that

  var path = `${RNFS.DownloadDirectoryPath}/${name}.jpg`;

  try {
    const filepath = `${path}`;

    RNFS.exists(filepath)
      .then((result) => {
        if (result) {
          return (
            RNFS.unlink(filepath)
              .then(() => {
                RNFS.writeFile(path, Base64, "base64") //data.base64 is your photo with convert base64
                  .then((value) => {
                    // try {
                    //   RNFS.scanFile(paths) //after save to notify gallry for that
                    //     .then(() => {
                    //       console.log('scan file success');
                    //     })
                    //     .catch((err) => {
                    //       console.log('scan file error');
                    //     });
                    // } catch (error) {
                    //   console.log('fileerror', error.message);
                    // }
                  })
                  .catch((e) => console.log(e.message));
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch((err) => {
                console.log(err.message);
              })
          );
        } else {
          RNFS.writeFile(path, Base64, "base64") //data.base64 is your photo with convert base64
            .then((value) => {
              // try {
              //   RNFS.scanFile(paths) //after save to notify gallry for that
              //     .then(() => {
              //       console.log('scan file success');
              //     })
              //     .catch((err) => {
              //       console.log('scan file error');
              //     });
              // } catch (error) {
              //   console.log('fileerror', error.message);
              // }
            })
            .catch((e) => console.log(e.message));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log("fileerror", error.message);
  }
};
