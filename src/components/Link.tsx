import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

type LinkProps = React.PropsWithChildren<
  React.ComponentProps<typeof ChakraLink>
>;

export default function Link({ children, href, ...linkProps }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...linkProps}>{children}</ChakraLink>
    </NextLink>
  );
}
