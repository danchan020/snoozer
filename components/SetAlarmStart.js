import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import hours from "../timePicker/hours";
import minutes from "../timePicker/minutes";
import { globalStyles } from "../styles/global";

export default function SetAlarmStart({ handleAlarmStart }) {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");

  useEffect(() => handleAlarmStart(`${hour}:${minute}`), [hour, minute]);

  return (
    <View>
      <Text style={globalStyles.text}>Starting Time</Text>
      <View style={styles.container}>
        <Picker
          selectedValue={hour}
          onValueChange={(itemValue, itemIndex) => setHour(itemValue)}
          itemStyle={{
            margin: 2,
            color: "black",
            width: 90,
            height: 180,
            fontFamily: "Sriracha_400Regular",
            borderRadius: 25,
          }}
        >
          {hours.map((hour) => (
            <Picker.Item key={hour} label={hour.label} value={hour.value} />
          ))}
        </Picker>
        <Picker
          selectedValue={minute}
          onValueChange={(itemValue, itemIndex) => setMinute(itemValue)}
          itemStyle={{
            margin: 2,
            color: "black",
            width: 90,
            height: 180,
            fontFamily: "Sriracha_400Regular",
            borderRadius: 25,
          }}
        >
          {minutes.map((minute) => (
            <Picker.Item
              key={minute}
              label={minute.label}
              value={minute.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
});
