import { AppContainer } from "./AppContainer";
import { Icons } from "./Icons";
import { classed } from "@tw-classed/react";
import { NAVIGATION, SOCIALS_FOOTER } from "../app/settings";
import Link from "next/link";
import { LABELS } from "../content";

const NavLabel = classed.span("flex gap-2 items-center font-sans text-white-100 text-sm duration-300", {
  variants: {
    hover: {
      true: "hover:text-gold",
    },
  },
});

export const AppFooter = () => {
  return (
    <div className="bg-primary">
      <AppContainer className="py-8 flex gap-10 md:gap-0 flex-col md:flex-row justify-between">
        <div className="flex flex-col md:flex-row items-center gap-[34px] my-auto">
          <Link href="/">
            <Icons.Logo className="text-gray" />
          </Link>
          <NavLabel className="text-center md:text-left md:max-w-[250px]">{LABELS.COMMON.FOOTER.TITLE}</NavLabel>
        </div>
        <div className="flex flex-col md:flex-row gap-10 md:gap-[100px]">
          <div className="flex flex-col gap-6">
            {NAVIGATION.map(({ label, href, external }, index) => {
              if (external) return null;
              return (
                <Link
                  className="flex md:block uppercase"
                  key={index}
                  href={href}
                  target={external ? "_blank" : undefined}
                >
                  <NavLabel className="mx-auto" hover>
                    {label}
                  </NavLabel>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-6">
            {NAVIGATION.map(({ label, href, external }, index) => {
              if (!external) return null;
              return (
                <Link
                  className="flex md:block uppercase group"
                  key={index}
                  href={href}
                  target={external ? "_blank" : undefined}
                >
                  <NavLabel className="mx-auto" hover>
                    {label}
                  </NavLabel>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-6">
            {SOCIALS_FOOTER.map(({ label, href, external, icon }, index) => {
              return (
                <Link
                  className="flex md:block uppercase"
                  key={index}
                  href={href}
                  target={external ? "_blank" : undefined}
                >
                  <NavLabel className="mx-auto" hover>
                    {icon}
                    {label}
                  </NavLabel>
                </Link>
              );
            })}
          </div>
        </div>
      </AppContainer>
    </div>
  );
};
