import React from "react";

import { Chart } from "react-google-charts";
import "../../styles/css/gantt.css";
export default function MyWidget(props) {
  const [data, setData] = React.useState(props.data);

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div>
      <h3 style={{ padding: "30px" }}>프로젝트 달력</h3>
      {data !== null ? (
        <div style={{ margin: "20px" }}>
          <Chart
            chartType="Gantt"
            data={data}
            width="100%"
            height="400px"
            chartLanguage="ko"
          />
        </div>
      ) : (
        <>hi!!!!!!!!!!!!!</>
      )}
    </div>
  );
}
