import { useState } from "react";
import {
  Plus,
  UserRound,
  CircleDollarSign,
  AtSign,
  Circle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import "./HelpPage.css";

const sections = [
  {
    title: "Account Opening",
    icon: <Plus />,
    items: [
      "Resident individual",
      "Minor",
      "Non Resident Indian (NRI)",
      "Company, Partnership, HUF and LLP",
      "Glossary",
    ],
  },
  {
    title: "Your Zerodha Account",
    icon: <UserRound />,
    items: [
      "Your Profile",
      "Account modification",
      "Client Master Report (CMR) and Depository Participant (DP)",
      "Nominations",
      "Transfer and conversion of securities"
    ],
  },
  {
    title: "Kite",
    icon: <Circle />,
    items: [
      "IPO",
      "Trading FAQs",
      "Margin Trading Facility (MTF) and Margins",
      "Charts and Orders",
      "Alerts and Nudges",
      "General"
    ],
  },
  {
    title: "Funds",
    icon: <CircleDollarSign />,
    items: [
      "Add Money",
      "Withdraw Money",
      "Add Bank Accounts",
      "eMandates"
    ],
  },
  {
    title: "Console",
    icon: <AtSign />,
    items: [
      "Portfolio",
      "Corporate Actions",
      "Funds Statement",
      "Reports",
      "Profile",
      "Segments"
    ],
  },
  {
    title: "Coin",
    icon: <Circle />,
    items: [
      "Mutual funds",
      "National Pension Scheme (NPS)",
      "Fixed Deposit (FD)",
      "Features on Coin",
      "Payments and Orders",
      "General"
    ],
  },
];

const quickLinks = [
  "Track account opening",
  "Track segment activation",
  "Intraday margins",
  "Kite user manual",
  "Learn how to create a ticket",
];

function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <div className="help-page container" style={{paddingBottom: "0px"}}>

      <div className="help-layout">

        {/* ================= LEFT ================= */}

        <main className="help-main">

          {sections.map((section, index) => {
            const isOpen = openIndex === index;

            return (
              <div className="accordion" key={section.title}>

                {/* Header */}

                <div
                  className="accordion-header"
                  onClick={() => toggleSection(index)}
                >

                  <div className="accordion-icon">
                    {section.icon}
                  </div>

                  <div className="accordion-title">
                    {section.title}
                  </div>

                  <div className="accordion-chevron">
                    {isOpen ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>

                </div>

                {/* Content */}

                {isOpen && (
                  <div className="accordion-content">
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>
                          <a href="#">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            );
          })}

        </main>


        {/* ================= RIGHT SIDEBAR ================= */}

        <aside className="help-sidebar">

          {/* Announcements */}

          <div className="announcement">

            <ul>
              <li>
                <a href="#">
                  Surveillance measure on scrips –
                  September 2026
                </a>
              </li>

              <li>
                <a href="#">
                  Offer for sale (OFS) – August 2026
                </a>
              </li>
            </ul>

          </div>


          {/* Quick links */}

          <div className="quick-links">

            <div className="quick-links-heading">
              Quick links
            </div>

            <div className="quick-links-list">

              {quickLinks.map((link, index) => (
                <a href="#" key={link}>
                  {index + 1}. {link}
                </a>
              ))}

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default HelpPage;