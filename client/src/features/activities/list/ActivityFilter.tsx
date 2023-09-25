import { DateTime } from "luxon";
import { useState } from "react";
import Calendar from "react-calendar";
import { useSearchParams } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilters = () => {
  const [filters, setFilters] = useState({ activityFilter: "all" });
  const [_, setSearchParams] = useSearchParams();

  const onFilter = ({
    type = "activityFilter",
    value,
  }: {
    type: "startDate" | "activityFilter";
    value: any;
  }) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setSearchParams({ ...filters, [type]: value });
  };

  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          content="All Activites"
          active={filters.activityFilter === "all"}
          onClick={() => onFilter({ type: "activityFilter", value: "all" })}
        />
        <Menu.Item
          content="I'm going"
          active={filters.activityFilter === "isGoing"}
          onClick={() => onFilter({ type: "activityFilter", value: "isGoing" })}
        />
        <Menu.Item
          content="I'm hosting"
          active={filters.activityFilter === "isHost"}
          onClick={() => onFilter({ type: "activityFilter", value: "isHost" })}
        />
      </Menu>
      <Header />
      <Calendar
        locale="en"
        onChange={(date) => {
          if (!date) return;
          onFilter({
            type: "startDate",
            value: DateTime.fromJSDate(date as Date).toString(),
          });
        }}
      />
    </>
  );
};

export default ActivityFilters;
