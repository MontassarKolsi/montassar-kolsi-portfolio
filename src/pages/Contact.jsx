import { Contact as ContactSection } from "@/sections/Contact";
import { memo } from "react";

export const Contact = memo(() => {
  return <ContactSection />;
});

Contact.displayName = 'Contact';