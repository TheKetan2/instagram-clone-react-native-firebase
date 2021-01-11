import { combineReducers } from "redux";

import { user } from "./user";

const Reducers = combineReducers({ useState: user });

export default Reducers;

const Area = () => {
  const [data, setData] = useState([]);
  const [tooltipX, setTooltipX] = useState(null);
  const [tooltipY, setTooltipY] = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);

  useEffect(() => reorderData(), []);

  const reorderData = () => {
    const reorderedData = DATA.sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.date) - new Date(b.date);
    });

    setData(reorderedData);
  };

  const contentInset = { left: 10, right: 10, top: 10, bottom: 7 };

  const ChartPoints = ({ x, y, color }) =>
    data.map((item, index) => (
      <Circle
        key={index}
        cx={x(moment(item.date))}
        cy={y(item.score)}
        r={6}
        stroke={color}
        fill="white"
        onPress={() => {
          // try this 👇
          setTooltipX(moment(item.date));
          setTooltipY(item.score);
          setTooltipIndex(index);
          // try this ☝
        }}
      />
    ));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {data.length !== 0 ? (
          <AreaChart
            style={{ height: "70%" }}
            data={data}
            yAccessor={({ item }) => item.score}
            xAccessor={({ item }) => moment(item.date)}
            contentInset={contentInset}
            svg={{ fill: "#003F5A" }}
            numberOfTicks={10}
            yMin={0}
            yMax={10}
          >
            <Grid
              svg={{ stroke: "rgba(151, 151, 151, 0.09)" }}
              belowChart={false}
            />
            <ChartPoints color="#003F5A" />
            <Tooltip
              tooltipX={tooltipX}
              tooltipY={tooltipY}
              color="#003F5A"
              index={tooltipIndex}
              dataLength={data.length}
            />
          </AreaChart>
        ) : (
          <View
            style={{
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#ccc",
              }}
            >
              There are no responses for this month.
            </Text>
          </View>
        )}
        <Text style={styles.heading}>Tooltip Area Chart</Text>
      </View>
    </SafeAreaView>
  );
};
