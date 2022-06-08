import globe from "../images/globe.svg";
import github from "../images/github.svg";
import discord from "../images/discord_round.svg";
import twitter from "../images/twitter_round.svg";
import telegram from "../images/telegram.svg";
import "./TeamMemberCard.css";
import ColorHash from "color-hash";

export interface TeamMemberCardProps {
  name: string;
  short_name?: string;
  description: string | string[];
  long_description?: string | string[];
  image?: string;
  links?: Links[];
  renderBanner?: boolean;
}

interface Links {
  github?: string;
  website?: string;
  discord?: string;
  twitter?: string;
  telegram?: string;
}

function renderLink(url: string, source: string, icon: string, button: boolean = false, text: boolean = true): any {
  let RgExp = new RegExp('^(?:[a-z]+:)?//', 'i');
  if (!RgExp.test(url)) {
    url = '//' + url;
  }
  if (!button) {
    return (
      <div className="link" key={url}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {text ? <div className="link-title">{source}</div> : null}
          <img className="icon" src={icon} alt={source} />
        </a>
      </div>
    );
  } else {
    return (
      <div className="link" key={url}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ backgroundColor: `var(--${source})` }}
        >
          <img className="icon" src={icon} alt={source} />
          {text ? <div className="link-title">{source}</div> : null}
        </a>
      </div>
    );
  }
}

function renderBanner(name: string): any {
  let hueRange = { min: 45, max: 360 };
  let colorHashText = new ColorHash({ hue: hueRange, lightness: [0.8, 0.9] }).hex(name);
  let colorHashBG = new ColorHash({
    hue: hueRange,
    lightness: [0.35, 0.4],
    saturation: [0.65, 0.85, 1],
  }).hex(name);
  return (
    <svg height="150px" width="350px" style={{ backgroundColor: colorHashBG }} className="card-img-top">
      <text
        textAnchor="middle"
        x="50%"
        y="58%"
        fill={colorHashText}
        style={{ fontSize: "2.5rem", fontStyle: "italic" }}
      >
        {name}
      </text>
    </svg>
  );
}

function renderDescription(description: string | string[]): any {
  if (typeof description === "string") {
    return <p className="card-text">{description}</p>;
  }
  return description.map((text: string, index: number) => {
    return (
      <p className="card-text" key={index}>
        {text}
      </p>
    );
  });
}

function TeamMemberCard(props: TeamMemberCardProps) {
  let links = props.links
    ? props.links.map((link) => {
      if (link.github) {
        return renderLink(link.github, "github", github);
      } else if (link.website) {
        return renderLink(link.website, "website", globe);
      } else if (link.discord) {
        return renderLink(link.discord, "discord", discord);
      } else if (link.twitter) {
        return renderLink(link.twitter, "twitter", twitter);
      } else if (link.telegram) {
        return renderLink(link.telegram, "telegram", telegram);
      } else {
        return null;
      }
    })
    : null;

  let img = (() => {
    try {
      if (props.image) {
        let imageSource;
        if (props.image.startsWith("http")) {
          imageSource = props.image;
        } else {
          imageSource = require(`../images/${props.image}`);
        }

        return <img className="card-img-top" src={imageSource} alt={props.name} />;
      } else if (props.renderBanner == true || props.renderBanner == undefined) {
        return renderBanner(props.short_name || props.name);
      } else {
        return null;
      }
    } catch (e) {
      if (props.renderBanner == true || props.renderBanner == undefined) {
        return renderBanner(props.short_name || props.name);
      } else {
        return null;
      }
    }
  })();

  return (
    <div className="members-card">
      <div className="members-card-body">
        <h5 className="members-card-title">{props.name}</h5>
        {renderDescription(props.description)}
      </div>
      <div className="members-card-footer">{links}</div>
    </div>
  );
}

export default TeamMemberCard;
