import * as React from "react";
import {
  Column,
  Container,
  Head,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";
import config from "@/lib/config";

export default function ConfirmEmailTemplate({
  otp,
  name,
}: {
  otp: string;
  name: string;
}) {
  return (
    <Container>
      <Head>
        <title>Email confirmation.</title>
      </Head>
      <Heading as="h1">{config.metadata.title}</Heading>
      <Text>
        Hello <b>{name}</b>,
      </Text>
      <br />
      <Text>
        Thanks for joining {config.metadata.title}. To finish registration,
        please click the button below to verify your account.
      </Text>
      <br />
      <Text>Your Confirmation Code: </Text>
      <Section>
        <Row
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Column
            style={{
              border: "1px solid black",
              width: "15px",
              height: "15px",
              textAlign: "center",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          >
            {otp[0]}
          </Column>
          <Column
            style={{
              border: "1px solid black",
              width: "15px",
              height: "15px",
              textAlign: "center",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          >
            {otp[1]}
          </Column>
          <Column
            style={{
              border: "1px solid black",
              width: "15px",
              height: "15px",
              textAlign: "center",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          >
            {otp[2]}
          </Column>
          <Column
            style={{
              border: "1px solid black",
              width: "15px",
              height: "15px",
              textAlign: "center",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          >
            {otp[3]}
          </Column>
        </Row>
      </Section>
      <br />
      <br />
      <Text>
        If you have any questions or concerns, please contact us at
        {config.email.sender}.
        <br /> Thank you!
        <br />
        The {config.metadata.title} Team.
      </Text>
      <br />
      <Text>
        You have received this mandatory notification to update you about
        changes to your {config.metadata.title} account.
        <br /> That wanot you you can ignore this email.
      </Text>
    </Container>
  );
}
