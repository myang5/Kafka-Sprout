import React, { useState, useEffect } from "react";
import {
  GridSectionContainer,
  GridContainer,
  HeaderRow,
  ContentRow,
} from "../UIComponents/GridSection";
import { StyledGridTitle } from "../UIComponents/StyledGridTitle";
import { BrokerConfig } from "./BrokerConfig";

export const BrokerDisplay = (props) => {
  const headers = ["ID", "Host", "Port", "Controller", "# of Partitions"];

  const handleClick = () => {}

  return (
    <GridSectionContainer>
      <StyledGridTitle
        title="Brokers"
        buttonText="+ Add Broker"
        handleClick={handleClick}
        popup={<BrokerConfig />}
      />
      <GridContainer columns={headers.length}>
        <HeaderRow headers={headers} />
        {props.brokerData && Object.keys(props.brokerData.nodes).map((key) => (
          <BrokerRow
            id={key}
            data={props.brokerData.nodes[key]}
            controller={props.brokerData.controller}
          />
        ))}
      </GridContainer>
    </GridSectionContainer>
  );
};

const BrokerRow = (props) => {
  const content: string[] = [props.id];

  content.push(props.data.host);
  content.push(props.data.port);
  if (
    JSON.stringify(props.controller[props.id]) === JSON.stringify(props.data)
  ) {
    content.push("Yes");
  } else {
    content.push("No");
  }

  content.push("NEED TO GET PARTITIONS");

  return <ContentRow content={content} />;
};
