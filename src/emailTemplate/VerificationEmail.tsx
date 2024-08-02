import config from "@/lib/config";
import routes from "@/services/routes";
export const subject = "Verificationation Email";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailTemplateProps {
  userName: string;
  token: string;
}

const VerificationEmailTemplate = ({ userName, token }: VerificationEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{config.metadata.title as string} - verify your email</Preview>
      <Body style={main}>
        <Container style={container}>
          <div style={{  padding: "45px" }}>
          <Img
            src={`${config.site.url}/${config.metadata.logo}`}
            width="100"
            height=""
            alt={config.metadata.name}
          />

          <Section>
            <Text style={text}>Hello {userName},</Text>
            <Button
              style={button}
              href={`${config.site.url}${routes.auth.verify.token.path}/${token}`}
              >
              Verify your email
            </Button>
              <Text>
              Verification Link: {`${config.site.url}${routes.auth.verify.token.path}/${token}`}
              </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
            <Text style={text}>Happy Discuzzing!</Text>
          </Section>
          </div>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6fefc",
  padding: "16px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  width: "50%",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

export default VerificationEmailTemplate;
