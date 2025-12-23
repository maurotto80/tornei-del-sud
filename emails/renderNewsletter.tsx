import * as React from "react";
import BaseTemplate from "./templates/BaseTemplate";
import EventTemplate from "./templates/EventTemplate";
import PromoTemplate from "./templates/PromoTemplate";

type Props = {
  template: string;
  title: string;
  content: any;
  unsubscribeToken: string;
};

export function renderNewsletter({
  template,
  title,
  content,
  unsubscribeToken,
}: Props) {
  switch (template) {
    case "event":
      return (
        <EventTemplate
          title={title}
          content={content}
          unsubscribeToken={unsubscribeToken}
        />
      );
    case "promo":
      return (
        <PromoTemplate
          title={title}
          content={content}
          unsubscribeToken={unsubscribeToken}
        />
      );
    default:
      return (
        <BaseTemplate
          title={title}
          content={content}
          unsubscribeToken={unsubscribeToken}
        />
      );
  }
}