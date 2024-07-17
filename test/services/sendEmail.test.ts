import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import sendEmail from "@/services/sendEmail";
import { JSXElementConstructor, ReactElement } from "react";

jest.mock("nodemailer");
jest.mock("@react-email/components");
jest.mock("@/lib/config", () => ({
  email: {
    provider: "gmail",
    sender: "test@example.com",
    password: "password",
  },
  metadata: {
    name: "TestApp",
  },
}));

describe("sendEmail", () => {
  const email = "recipient@example.com";
  const emailTemplate: ReactElement<any, string | JSXElementConstructor<any>> =
    {
      type: "div",
      props: { children: "Email Content" },
      key: null,
    };
  const subject = "Test Subject";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an email with the correct options", async () => {
    const sendMailMock = jest.fn((options, callback) => callback(null));
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });
    (render as jest.Mock).mockReturnValue("<div>Email Content</div>");

    await expect(sendEmail({ email, emailTemplate, subject })).resolves.toBe(
      ""
    );

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: "gmail",
      auth: {
        user: "test@example.com",
        pass: "password",
      },
    });

    expect(render).toHaveBeenCalledWith(emailTemplate);

    expect(sendMailMock).toHaveBeenCalledWith(
      {
        from: "test@example.com",
        to: email,
        subject: "Test Subject - TestApp",
        html: "<div>Email Content</div>",
      },
      expect.any(Function)
    );
  });

  it("should reject with an error message if sending fails", async () => {
    const sendMailMock = jest.fn((options, callback) =>
      callback(new Error("Failed to send email"))
    );
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });
    (render as jest.Mock).mockReturnValue("<div>Email Content</div>");

    await expect(sendEmail({ email, emailTemplate, subject })).rejects.toBe(
      "Failed to send email"
    );

    expect(sendMailMock).toHaveBeenCalledWith(
      {
        from: "test@example.com",
        to: email,
        subject: "Test Subject - TestApp",
        html: "<div>Email Content</div>",
      },
      expect.any(Function)
    );
  });
});
