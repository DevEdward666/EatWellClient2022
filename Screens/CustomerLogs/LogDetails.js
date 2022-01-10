import React, { useEffect, useState } from "react";
import styles from "./styledtls";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { MaskedText } from "react-native-mask-text";
import LogCardDtls from "../../Hooks/LogCard/LogCardDtls";
import { action_set_refresh } from "../../Services/Actions/MenuActions";
import { SafeAreaView } from "react-native-safe-area-context";
import { Actions } from "react-native-router-flux";
const LogDetails = () => {
  const logdetails = useSelector((state) => state.MenuReducers.logdetails);
  const selected_log = useSelector((state) => state.MenuReducers.selected_log);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  let qruri = "data:image/png;base64,";
  const [qrvalue, setqrvalue] = useState();
  useEffect(() => {
    let mounted = true;
    const getqr = () => {
      if (mounted) {
        setqrvalue(qruri + logdetails?.message);
      }
    };
    mounted && getqr();
    return () => {
      mounted = false;
    };
  }, [selected_log]);
  const payNow = () => {
    Actions.payment();
  };

  const getHeader = () => {
    return (
      <>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginBottom: 5,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Order No
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              {selected_log[0]?.orderno}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginBottom: 50,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Order Status
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
                textTransform: "uppercase",
                color:
                  selected_log[0]?.status === "Accepted"
                    ? "green"
                    : selected_log[0]?.status === "Pending"
                    ? "orange"
                    : "red",
              }}
            >
              {selected_log[0]?.status}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              Orders
            </Text>
          </View>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              Quantity
            </Text>
          </View>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              Price
            </Text>
          </View>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              Total
            </Text>
          </View>
        </View>
      </>
    );
  };

  const getFooter = () => {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              padding: 30,
            },
          ]}
        >
          <View style={{ flex: 12, alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              Total
            </Text>
          </View>
          <View style={{ flex: 3, alignItems: "flex-end" }}>
            <MaskedText
              style={{ fontSize: 12, fontWeight: "bold", textAlign: "right" }}
              type="currency"
              options={{
                prefix: "₱",
              }}
            >
              {selected_log[0]?.totalcost}
            </MaskedText>
          </View>
        </View>
        {logdetails?.message !== "" ? (
          <Image
            style={{
              alignSelf: "center",
              width: 300,
              height: 300,
              borderRadius: 120 / 2,
              overflow: "hidden",
              borderWidth: 3,
            }}
            source={{ uri: qruri + logdetails?.message, scale: 1 }}
          />
        ) : null}

        {selected_log[0]?.status === "Accepted" ? (
          <Button
            title="PAY NOW"
            icon={{
              name: "money",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconRight
            titleStyle={{ fontWeight: "bold" }}
            buttonStyle={{
              backgroundColor: "#f7862a",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: "100%",
              paddingStart: 50,
              paddingEnd: 50,
            }}
            onPress={() => payNow()}
          />
        ) : null}
      </SafeAreaView>
    );
  };
  return (
    <Card containerStyle={{ borderRadius: 15, elevation: 50 }}>
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
          },
        ]}
      >
        <View style={{ flex: 1, width: "100%" }}>
          <FlatList
            nestedScrollEnabled={true}
            data={logdetails?.data}
            keyExtractor={(item, index) => index.toString()}
            //   onEndReached={loadmore}
            //   onEndReachedThreshold={0.1}
            renderItem={({ item, index }) => (
              <LogCardDtls
                description={`${item?.menudesc}`}
                qty={item?.qty}
                price={item?.price}
                total={item?.qty * item?.price}
              />
            )}
            ListHeaderComponent={getHeader}
            ListFooterComponent={getFooter}
          />
        </View>
      </View>
    </Card>
  );
};
export default LogDetails;
