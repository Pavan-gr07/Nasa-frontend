import { useMemo } from "react";
import { withStyles, Appear, Link, Paragraph, Table, Words } from "arwes";
import Clickable from "../components/Clickable";

const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none",
  },
  tableContainer: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    tableLayout: "fixed",
    "@media (max-width: 768px)": {
      width: "100%",
      display: "block",
      overflowX: "auto",
      whiteSpace: "nowrap",
    },
  },
  th: {
    padding: "0.5rem",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
});

const Upcoming = (props) => {
  const { entered, launches, classes, abortLaunch } = props;

  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => launch.up_coming)
      .map((launch, index) => {
        return (
          <tr key={String(launch._id)}>
            <td>
              <Clickable style={{ color: "red" }}>
                <Link
                  className={classes.link}
                  onClick={() => abortLaunch(launch._id)}
                >
                  ✖
                </Link>
              </Clickable>
            </td>
            <td>{index + 1}</td>
            <td>{new Date(launch.launchDate).toDateString()}</td>
            <td>{launch.mission}</td>
            <td>{launch.rocket}</td>
            <td>{launch.target}</td>
          </tr>
        );
      });
  }, [launches, abortLaunch, classes.link]);

  return (
    <Appear id="upcoming" animate show={entered}>
      <Paragraph>
        Upcoming missions including both ISRO launches and newly scheduled Zero
        to Mastery rockets.
      </Paragraph>
      <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>
      <div className={classes.tableContainer}>
        <Table animate show={entered}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.th} style={{ width: "3rem" }}></th>
                <th className={classes.th} style={{ width: "3rem" }}>
                  No.
                </th>
                <th className={classes.th} style={{ width: "10rem" }}>
                  Date
                </th>
                <th className={classes.th} style={{ width: "11rem" }}>
                  Mission
                </th>
                <th className={classes.th} style={{ width: "11rem" }}>
                  Rocket
                </th>
                <th className={classes.th}>Destination</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </Table>
      </div>
    </Appear>
  );
};

export default withStyles(styles)(Upcoming);
