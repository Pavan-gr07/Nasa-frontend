import { useMemo } from "react";
import { Appear, Table, Paragraph } from "arwes";

const History = (props) => {
  const tableBody = useMemo(() => {
    return props.launches
      ?.filter((launch) => !launch.up_coming)
      .map((launch, index) => {
        return (
          <tr key={String(launch._id)}>
            <td>
              <span style={{ color: launch.success ? "greenyellow" : "red" }}>
                █
              </span>
            </td>
            <td>{index + 1}</td>
            <td>{new Date(launch.launchDate).toDateString()}</td>
            <td>{launch.mission}</td>
            <td>{launch.rocket}</td>
            <td>{launch.customers?.join(", ")}</td>
          </tr>
        );
      });
  }, [props.launches]);

  const tableStyles = {
    tableLayout: "fixed",
    width: "100%",
    maxWidth: "100%",
    overflowX: "auto",
    display: "block",
  };

  const thStyles = {
    padding: "0.5rem",
    textAlign: "left",
    whiteSpace: "nowrap",
  };

  const responsiveTableStyles = {
    ...tableStyles,
    "@media (max-width: 768px)": {
      display: "block",
      overflowX: "auto",
      whiteSpace: "nowrap",
    },
  };

  return (
    <article id="history">
      <Appear animate show={props.entered}>
        <Paragraph>
          History of mission launches including SpaceX launches starting from
          the year 2006.
        </Paragraph>
        <Table animate>
          <table style={responsiveTableStyles}>
            <thead>
              <tr>
                <th style={{ ...thStyles, width: "2rem" }}></th>
                <th style={{ ...thStyles, width: "3rem" }}>No.</th>
                <th style={{ ...thStyles, width: "9rem" }}>Date</th>
                <th style={thStyles}>Mission</th>
                <th style={{ ...thStyles, width: "7rem" }}>Rocket</th>
                <th style={thStyles}>Customers</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </Table>
      </Appear>
    </article>
  );
};

export default History;
