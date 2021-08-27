import { ResponsiveBar } from "@nivo/bar";
import Styled from "styled-components";

const Container = Styled.div`
   width: 400px;
   height: 320px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-radius: 30px;
   @media only screen and (max-width: 425px){
     width: 370px;
     height: 300px;
   }
   @media only screen and (max-width: 320px){
     width: 300px;
     height: 250px;
   }
`;
const AttendanceChart = ({ data }) => {
  console.log(data);
  return (
    <Container>
      <ResponsiveBar
        data={data}
        keys={[...data.map((sub) => sub.name)]}
        indexBy="code"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        valueFormat={{ format: "", enabled: false }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Subjects",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Attendance",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.0]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Container>
  );
};

export default AttendanceChart;
