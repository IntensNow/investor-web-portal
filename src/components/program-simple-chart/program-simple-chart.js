import "./program-simple-chart.scss";

import moment from "moment";
import React from "react";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const ProgramSimpleChart = ({ data }) => {
  if (data.length === 0) return null;
  const tooltipWrapperStyle = { opacity: 0.9 };
  const programChartData = data.map(x => ({
    date: x.date.getTime(),
    equity: x.value
  }));
  return (
    <div className="pi-chart">
      <ResponsiveContainer>
        <LineChart data={programChartData}>
          <ReferenceLine y={0} strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            type="number"
            hide
            tickFormatter={date => moment(date).format("MM/DD")}
          />
          <YAxis dataKey="equity" axisLine={false} hide />
          <Tooltip
            wrapperStyle={tooltipWrapperStyle}
            formatter={value => `${value}%`}
            labelFormatter={date => moment(date).format("MMMM Do HH:mm")}
          />
          <Line
            type="monotone"
            dataKey="equity"
            strokeWidth={3}
            dot={false}
            activeDot={{ stroke: "#184f61" }}
            isAnimationActive={false}
            stroke="#03bdaf"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgramSimpleChart;
