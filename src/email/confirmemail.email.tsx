import * as React from "react";
import {
  Container,
  Head,
  Heading,
  Text,
  Link,
  Hr,
  Section,
  Row,
  Column,
} from "@react-email/components";
import config from "@/lib/config";

export const subject = "Confirmation Email";
export default function ConfirmEmailTemplate({ otp }: { otp: string }) {
  return (
    <Container>
      <Head>
        <title>Email confirmation.</title>
      </Head>
      <Heading as="h1">{config.metadata.title}</Heading>
      <Text>
        Thanks for joining {config.metadata.title}. <br />
        To finish registration, please click the button below to verify your
        account.
      </Text>
      <Text>Your Confirmation Code </Text>
      <Section style={{ display: "flex", margin: "1.5rem 0rem" }}>
        <Row>
          {otp.split("").map((number, idx) => (
            <Column
              key={idx}
              style={{
                border: "1px black solid",
                padding: "0.5rem 0.5rem",
                borderRadius: "2px",
              }}
            >
              {number}
            </Column>
          ))}
        </Row>
      </Section>
      <Link
        style={{
          color: "white",
          borderRadius: "5px",
          padding: "0.5rem 1rem",
          background: "black",
        }}
        href={`${config.site.url}/verify`}
      >
        Confirm your email.
      </Link>
      <Hr />
    </Container>
  );
}
